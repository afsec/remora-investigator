use databases::application_db::connection::AppDatabaseConnection;
use mvp_scaffold::endpoint::Outcome;
use rusqlite::params;
use serde::{Deserialize, Serialize};
use std::convert::{TryFrom, TryInto};
// use tide::Error as TideError;

use application_models::event::*;

#[derive(Debug, Serialize, Deserialize)]
pub struct NewEvent {
    // Event
    security_state: EventSecurityState,
    destination_port: EventDestinationPort,
    server_ip_address: EventServerIPAddress,
    started_datetime: EventStartedDateTime,
    rtt: EventRtt,
    // Request
    request_method: RequestMethod,
    request_url: RequestUrl,
    request_http_version: RequestHttpVersion,
    request_query_string: RequestQueryString,
    request_headers_size: RequestHeadersSize,
    request_headers: RequestHeaders,
    request_cookies: RequestCookies,
    request_body_size: RequestBodySize,
    request_postdata_mimetype: RequestPostDataMimeType,
    request_postdata_params: RequestPostDataParams,
    request_postdata_text: RequestPostDataText,
    // Response
    response_http_version: ResponseHttpVersion,
    response_status_code: ResponseStatusCode,
    response_headers_size: ResponseHeadersSize,
    response_headers: ResponseHeaders,
    response_redirect_url: ResponseRedirectUrl,
    response_cookies: ResponseCookies,
    response_content_mimetype: ResponseContentMimeType,
    response_content_size: ResponseContentSize,
    response_body_size: ResponseBodySize,
    response_body_encoding: ResponseBodyEncoding,
    response_body_content: ResponseBodyContent,
    // Message metadata
    // actor: Actor,
    // sender: Sender,
}
impl NewEvent {
    pub fn request_headers(&self) -> &RequestHeaders {
        &self.request_headers
    }
    pub fn response_headers(&self) -> &ResponseHeaders {
        &self.response_headers
    }
}
// Outcome definition
#[derive(Debug, Serialize)]
pub struct InternalMessage(u16);

impl InternalMessage {
    pub fn get(self) -> u16 {
        self.0
    }
}

impl Outcome for InternalMessage {}

impl TryFrom<i64> for InternalMessage {
    type Error = Box<dyn std::error::Error>;

    fn try_from(value: i64) -> Result<Self, Self::Error> {
        let new_id = value.try_into()?;
        Ok(InternalMessage(new_id))
    }
}

impl InternalMessage {
    pub fn db_save_event(
        db_connection: &AppDatabaseConnection,
        new_event: &NewEvent,
    ) -> Result<i64, Box<dyn std::error::Error>> {
        let conn = db_connection.get()?;
        // let tx = conn.transaction()?;
        let query: String = ["INSERT INTO `events` (",
        " security_state, destination_port, server_ip_address, started_datetime, rtt, request_method", // 6
        ", request_url, request_http_version, request_query_string, request_headers_size, request_headers", // 11
        ", request_cookies, request_body_size, request_postdata_mimetype, request_postdata_params", // 15
        ", request_postdata_text, response_http_version, response_status_code, response_headers_size", // 19
        ", response_headers, response_redirect_url, response_cookies, response_content_mimetype", // 23
        ", response_content_size, response_body_size, response_body_encoding, response_body_content", // 27
        ") VALUES (",
        "?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15",
        ", ?16 ,?17, ?18, ?19, ?20, ?21, ?22, ?23, ?24, ?25, ?26, ?27",
        ");"
        ].concat();
        let request_headers: String = new_event.request_headers().try_into()?;
        let response_headers: String = new_event.response_headers().try_into()?;
        let response_status_code = match new_event.response_status_code.get() {
            Some(code) => code,
            None => 0,
        };
        let response_content_size = if response_status_code > 299 && response_status_code < 400 {
            match new_event.response_body_content.get() {
                Some(body_content) => {
                    let response_body_content: i32 = body_content.len().try_into()?;
                    Some(response_body_content)
                }
                None => None,
            }
        } else {
            match new_event.response_content_size.get() {
                Some(content_size) => {
                    let response_body_content: i32 = content_size.try_into()?;
                    Some(response_body_content)
                }
                None => None,
            }
        };
        let response_body_size = if response_status_code > 299 && response_status_code < 400 {
            match new_event.response_body_content.get() {
                Some(body_content) => {
                    let response_body_size: i32 = body_content.len().try_into()?;
                    Some(response_body_size)
                }
                None => None,
            }
        } else {
            match new_event.response_body_size.get() {
                Some(content_size) => {
                    let response_body_size: i32 = content_size.try_into()?;
                    Some(response_body_size)
                }
                None => None,
            }
        };
        conn.execute(
            &query,
            params![
                new_event.security_state.get(),
                new_event.destination_port.get(),
                new_event.server_ip_address.get(),
                new_event.started_datetime.get(),
                new_event.rtt.get(),
                new_event.request_method.get(),
                new_event.request_url.get(),
                new_event.request_http_version.get(),
                new_event.request_query_string.get(),
                new_event.request_headers_size.get(),
                request_headers,
                new_event.request_cookies.get(),
                new_event.request_body_size.get(),
                new_event.request_postdata_mimetype.get(),
                new_event.request_postdata_params.get(),
                new_event.request_postdata_text.get(),
                new_event.response_http_version.get(),
                new_event.response_status_code.get(),
                new_event.response_headers_size.get(),
                response_headers,
                new_event.response_redirect_url.get(),
                new_event.response_cookies.get(),
                new_event.response_content_mimetype.get(),
                response_content_size,
                // new_event.response_content_size.get(),
                response_body_size,
                // new_event.response_body_size.get(),
                new_event.response_body_encoding.get(),
                new_event.response_body_content.get(),
                // new_event.actor.get(),
                // new_event.sender.get(),
            ],
        )?;

        let last_row_id = conn.last_insert_rowid();

        // tx.commit()?;

        Ok(last_row_id)
    }
}
