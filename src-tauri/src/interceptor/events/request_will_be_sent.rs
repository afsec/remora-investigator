use anyhow::anyhow;
use chromiumoxide::cdp::browser_protocol::network::EventRequestWillBeSent;
use chrono::{DateTime, Local};

use std::sync::Arc;

use crate::{
    helpers::AppResult, interceptor::RemoraInterceptor, storage::RemoraStorage, REMORA_STORAGE,
};

pub async fn handler(
    ctx: &RemoraInterceptor,
    event: Arc<EventRequestWillBeSent>,
) -> AppResult<i32> {
    let storage = match REMORA_STORAGE.get() {
        Some(stg) => stg,
        None => return Err(anyhow!("REMORA_STORAGE not defined")),
    };

    let request_id = &event.request_id.inner();

    let method = &event.request.method;

    let url = &event.request.url;

    let request_time: DateTime<Local> = Local::now();

    let request_info = RequestInfo {
        request_id: RequestId(*request_id),
        method: RequestMethod(method),
        url: RequestUrl(url),
        request_time: RequestTime(request_time),
    };
    let last_inserted_id = request_info.save(storage).await?;

    Ok(last_inserted_id)
}

struct RequestInfo<'a> {
    request_id: RequestId<'a>,
    request_time: RequestTime,
    method: RequestMethod<'a>,
    url: RequestUrl<'a>,
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

struct RequestTime(DateTime<Local>);
impl TryFrom<RequestTime> for String {
    type Error = anyhow::Error;

    fn try_from(resquest_time: RequestTime) -> Result<Self, Self::Error> {
        use chrono::SecondsFormat;
        let timestamp_str = resquest_time.0.to_rfc3339_opts(SecondsFormat::Millis, true);
        Ok(timestamp_str)
    }
}

struct RequestMethod<'a>(&'a String);
impl<'a> From<RequestMethod<'a>> for String {
    fn from(value: RequestMethod<'a>) -> String {
        value.0.clone()
    }
}

struct RequestUrl<'a>(&'a String);
impl<'a> From<RequestUrl<'a>> for String {
    fn from(value: RequestUrl<'a>) -> String {
        value.0.clone()
    }
}

impl RequestInfo<'_> {
    async fn save(self, remora_storage: &RemoraStorage) -> AppResult<i32> {
        use crate::entities::{prelude::*, *};
        use sea_orm::*;
        let Self {
            request_id,
            method,
            url,
            request_time,
        } = self;

        let request = requests::ActiveModel {
            id: Default::default(),
            request_id: ActiveValue::Set(request_id.into()),

            method: ActiveValue::Set(method.into()),
            url: ActiveValue::Set(url.into()),
            request_time: ActiveValue::Set(request_time.try_into()?),
        };
        let res = Requests::insert(request)
            .exec(remora_storage.connection())
            .await?;

        Ok(res.last_insert_id)
    }
}
