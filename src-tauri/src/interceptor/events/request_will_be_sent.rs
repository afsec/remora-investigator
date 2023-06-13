use chromiumoxide::cdp::browser_protocol::network::EventRequestWillBeSent;
use sea_orm::DatabaseConnection;
use std::sync::Arc;

use crate::{helpers::AppResult, interceptor::RemoraInterceptor, storage::RemoraStorage};

pub async fn handler(
    ctx: &RemoraInterceptor,
    event: Arc<EventRequestWillBeSent>,
) -> AppResult<i32> {
    use std::time::SystemTime;

    let db = ctx.storage().connection();

    let request_id = &event.request_id.inner();

    let method = &event.request.method;

    let url = &event.request.url;

    let request_time = &event.wall_time.inner();

    let now = SystemTime::now()
        .duration_since(SystemTime::UNIX_EPOCH)
        .unwrap()
        .as_secs_f64();

    let request_info = RequestInfo {
        request_id: RequestId(*request_id),
        method: RequestMethod(method),
        url: RequestUrl(url),
    };
    let last_inserted_id = request_info.save(ctx.storage()).await?;

    Ok(last_inserted_id)
}

struct RequestInfo<'a> {
    request_id: RequestId<'a>,
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
    async fn save(self, remora_storage: &RemoraStorage) -> anyhow::Result<i32> {
        use crate::entities::{prelude::*, *};
        use chrono::{offset::Local, DateTime, SecondsFormat};
        use sea_orm::*;
        let Self {
            request_id,
            method,
            url,
        } = self;

        let date_time: DateTime<Local> = Local::now();

        let request = requests::ActiveModel {
            id: Default::default(),
            request_id: ActiveValue::Set(request_id.into()),

            method: ActiveValue::Set(method.into()),
            url: ActiveValue::Set(url.into()),
            req_time: ActiveValue::Set(date_time.to_rfc3339_opts(SecondsFormat::Millis, true)),
        };
        let res = Requests::insert(request)
            .exec(remora_storage.connection())
            .await?;

        dbg!(&res);

        Ok(res.last_insert_id)
    }
}
