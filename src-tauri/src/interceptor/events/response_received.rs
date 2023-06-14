use std::sync::Arc;

use anyhow::anyhow;
use chromiumoxide::cdp::browser_protocol::network::EventResponseReceived;
use chrono::{DateTime, Local};

use crate::interceptor::RemoraInterceptor;
use crate::storage::RemoraStorage;
use crate::{AppResult, REMORA_STORAGE};

pub async fn handler(ctx: &RemoraInterceptor, event: Arc<EventResponseReceived>) -> AppResult<i32> {
    let storage = match REMORA_STORAGE.get() {
        Some(stg) => stg,
        None => return Err(anyhow!("REMORA_STORAGE not defined")),
    };
    let request_id = *(&event.request_id.inner());

    let protocol = match &event.response.protocol {
        Some(proto) => proto,
        None => return Err(anyhow!("Cant get HTTP protocol")),
    };

    let url = &event.response.url;

    let status_code = &event.response.status;

    let mime_type = &event.response.mime_type;

    let response_time: DateTime<Local> = Local::now();

    let response_info = ResponseInfo {
        request_id: RequestId(request_id),
        response_time: ResponseTime(response_time),
        status: ResponseStatusCode(*status_code),
        url: ResponseUrl(url),
        mime_type: ResponseMimeType(mime_type),
        protocol: HttpProtocol(protocol),
    };

    let last_inserted_id: i32 = response_info.save(storage).await?;

    Ok(last_inserted_id)
}

struct ResponseInfo<'a> {
    request_id: RequestId<'a>,
    protocol: HttpProtocol<'a>,
    response_time: ResponseTime,
    status: ResponseStatusCode,
    url: ResponseUrl<'a>,
    mime_type: ResponseMimeType<'a>,
}

struct RequestId<'a>(&'a String);

impl<'a> From<&'a String> for RequestId<'a> {
    fn from(value: &'a String) -> Self {
        Self(value)
    }
}

impl<'a> From<RequestId<'a>> for String {
    fn from(value: RequestId<'a>) -> String {
        value.0.clone()
    }
}

struct HttpProtocol<'a>(&'a String);
impl<'a> From<HttpProtocol<'a>> for String {
    fn from(value: HttpProtocol<'a>) -> String {
        value.0.clone()
    }
}

struct ResponseTime(DateTime<Local>);
impl TryFrom<ResponseTime> for String {
    type Error = anyhow::Error;

    fn try_from(response_time: ResponseTime) -> Result<Self, Self::Error> {
        use chrono::SecondsFormat;
        let timestamp_str = response_time.0.to_rfc3339_opts(SecondsFormat::Millis, true);
        Ok(timestamp_str)
    }
}

struct ResponseStatusCode(i64);
impl From<ResponseStatusCode> for i64 {
    fn from(value: ResponseStatusCode) -> i64 {
        value.0
    }
}

impl TryFrom<ResponseStatusCode> for i32 {
    type Error = anyhow::Error;

    fn try_from(value: ResponseStatusCode) -> Result<Self, Self::Error> {
        let content = value.0;
        if content > i32::MAX as i64 {
            Err(anyhow!("ResponseStatusCode is out of i32 bounds"))
        } else {
            Ok(content as i32)
        }
    }
}

struct ResponseUrl<'a>(&'a String);
impl<'a> From<ResponseUrl<'a>> for String {
    fn from(value: ResponseUrl<'a>) -> String {
        value.0.clone()
    }
}

struct ResponseMimeType<'a>(&'a String);
impl<'a> From<ResponseMimeType<'a>> for String {
    fn from(value: ResponseMimeType<'a>) -> String {
        value.0.clone()
    }
}
impl ResponseInfo<'_> {
    async fn save(self, remora_storage: &RemoraStorage) -> AppResult<i32> {
        use crate::entities::{prelude::*, *};
        use sea_orm::*;
        let Self {
            request_id,
            response_time,
            status,
            url,
            mime_type,
            protocol,
        } = self;

        let response = responses::ActiveModel {
            id: Default::default(),
            request_id: ActiveValue::Set(request_id.into()),
            response_time: ActiveValue::Set(response_time.try_into()?),
            status_code: ActiveValue::Set(status.try_into()?),
            response_url: ActiveValue::Set(url.into()),
            mime_type: ActiveValue::Set(mime_type.into()),
            http_protocol: ActiveValue::Set(protocol.into()),
        };

        let res = Responses::insert(response)
            .exec(remora_storage.connection())
            .await?;

        Ok(res.last_insert_id)
    }
}
