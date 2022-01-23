use rusqlite::params;
use serde::{Deserialize, Serialize};
use std::convert::TryFrom;

use application_models::event::*;
use databases::application_db::connection::AppDatabaseConnection;
use mvp_scaffold::endpoint::Outcome;

// Serde struct - BEGIN
#[derive(Debug, Deserialize)]
pub struct QueryEvent {
    id: EventId,
}
impl QueryEvent {
    pub fn get_id(&self) -> &EventId {
        &self.id
    }
}

// Serde struct - END

#[derive(Debug, Serialize, Deserialize)]
pub struct Event {
    id: EventId,
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
    note_id: NoteId,
}

// Outcome definition
#[derive(Debug, Serialize)]
pub struct InternalMessage(Event);
impl Outcome for InternalMessage {}

// impl TryFrom<Vec<Event>> for InternalMessage {
//     type Error = Box<dyn std::error::Error>;

//     fn try_from(data: Vec<Event>) -> Result<Self, Self::Error> {
//         Ok(InternalMessage(data))
//     }
// }

impl InternalMessage {
    pub fn new(data: Event) -> Self {
        Self(data)
    }
    pub fn retrieve_event(
        db_connection: &AppDatabaseConnection,
        event_id: &EventId,
    ) -> Result<Event, Box<dyn std::error::Error>> {
        let conn = db_connection.get()?;
        let query: String = [
            "SELECT",
            " id, security_state, destination_port, server_ip_address", // 4
            ", started_datetime, rtt, request_method, request_url, request_http_version", // 9
            ", request_query_string, request_headers_size, request_headers", // 12
            ", request_cookies, request_body_size",                     // 14
            ", response_http_version, response_status_code, response_headers_size", // 17
            ", response_headers, response_redirect_url, response_cookies", // 20
            ", response_content_mimetype, response_content_size, response_body_size", // 23
            ", note_id FROM `events`",                                  // 24
            " WHERE `id` = ?1;",
        ]
        .concat();

        let mut stmt = conn.prepare(query.as_str())?;
        log::debug!("{:?}", stmt);

        let retrieved_event = stmt.query_row(params![event_id.get()], |row| {
            let request_headers_str: String = row.get(11)?;
            let response_headers_str: String = row.get(17)?;

            let event = Event {
                // TODO: Implement `validate()` through input process at `new()` method
                id: EventId::new(row.get(0)?),
                security_state: EventSecurityState::new(row.get(1)?),
                destination_port: EventDestinationPort::new(row.get(2)?),
                server_ip_address: EventServerIPAddress::new(row.get(3)?),
                started_datetime: EventStartedDateTime::new(row.get(4)?),
                rtt: EventRtt::new(row.get(5)?),
                request_method: RequestMethod::new(row.get(6)?),
                request_url: RequestUrl::new(row.get(7)?),
                request_http_version: RequestHttpVersion::new(row.get(8)?),
                request_query_string: RequestQueryString::new(row.get(9)?),
                request_headers_size: RequestHeadersSize::new(row.get(10)?),
                request_headers: convert_error_from_result_event(RequestHeaders::try_from(
                    request_headers_str,
                ))?,
                request_cookies: RequestCookies::new(row.get(12)?),
                request_body_size: RequestBodySize::new(row.get(13)?),
                response_http_version: ResponseHttpVersion::new(row.get(14)?),
                response_status_code: ResponseStatusCode::new(row.get(15)?),
                response_headers_size: ResponseHeadersSize::new(row.get(16)?),
                response_headers: convert_error_from_result_event(ResponseHeaders::try_from(
                    response_headers_str,
                ))?,
                response_redirect_url: ResponseRedirectUrl::new(row.get(18)?),
                response_cookies: ResponseCookies::new(row.get(19)?),
                response_content_mimetype: ResponseContentMimeType::new(row.get(20)?),
                response_content_size: ResponseContentSize::new(row.get(21)?),
                response_body_size: ResponseBodySize::new(row.get(22)?),
                note_id: NoteId::new(row.get(23)?),
            };
            log::debug!("DEBUG{:?}", &event);
            Ok(event)
        })?;

        Ok(retrieved_event)
    }
}
