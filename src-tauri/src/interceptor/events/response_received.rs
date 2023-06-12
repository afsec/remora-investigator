use std::sync::Arc;

use chromiumoxide::cdp::browser_protocol::network::EventResponseReceived;

use crate::interceptor::RemoraInterceptor;
use crate::AppResult;

pub async fn handler(
    ctx: &RemoraInterceptor,
    event: Arc<EventResponseReceived>,
) -> AppResult<usize> {
    let db = ctx.storage().connection();

    let request_id = *(&event.request_id.inner());

    let protocol = &event.response.protocol;

    let url = &event.response.url;
    let status_code = &event.response.status;
    let response_time = &event.response.response_time.as_ref().map(|v| v.inner());
    let mime_type = &event.response.mime_type;
    let request_time = &event.response.timing.as_ref().map(|v| v.request_time);

    Ok(0)
}
