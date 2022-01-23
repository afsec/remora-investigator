use databases::application_db::connection::AppDatabaseConnection;
use mvp_scaffold::endpoint::Outcome;
use rusqlite::{named_params, params};
use serde::{Deserialize, Serialize};
// use std::convert::TryFrom;
// use tide::Error as TideError;

use application_models::event::*;
use url::Url;
// Serde struct - BEGIN
#[derive(Debug, Deserialize)]
pub struct Paging {
    #[serde(default)]
    filter_by_site: FilterBySite,
    #[serde(default)]
    limit: PagingLimit,
    #[serde(default)]
    offset: PagingOffset,
}
impl Paging {
    pub fn get_offset(&self) -> &PagingOffset {
        &self.offset
    }
}

#[derive(Default, Debug, Deserialize)]
pub struct FilterBySite(Option<String>);

impl FilterBySite {
    pub fn get<'a>(&'a self) -> &'a Option<String> {
        &self.0
    }
}

#[derive(Debug, Deserialize)]
pub struct PagingLimit(u16);
impl Default for PagingLimit {
    fn default() -> Self {
        PagingLimit(20)
    }
}
impl PagingLimit {
    fn get(&self) -> u16 {
        self.0
    }
}

#[derive(Debug, Deserialize, Serialize)]
pub struct PagingOffset(u16);
impl Default for PagingOffset {
    fn default() -> Self {
        PagingOffset(0)
    }
}
impl PagingOffset {
    pub fn new(data: u16) -> Self {
        Self(data)
    }
    pub fn get(&self) -> u16 {
        self.0
    }
}
// Serde struct - END

#[derive(Debug, Serialize, Deserialize)]
pub struct Event {
    id: EventId,
    // Event
    started_datetime: EventStartedDateTime,
    rtt: EventRtt,
    // Request
    request_method: RequestMethod,
    request_url: RequestUrl,
    request_http_version: RequestHttpVersion,
    // Response
    response_status_code: ResponseStatusCode,
    response_content_mimetype: ResponseContentMimeType,
    response_body_size: ResponseBodySize,
    // Events
    note_id: NoteId,
    row_position: u16, // * A helper to frontend
}

// Outcome definition
#[derive(Debug, Serialize)]
pub struct EventsResponse {
    pub events_found: EventsFound,
    pub offset: PagingOffset,
    pub events: Vec<Event>,
}

#[derive(Debug, Serialize)]
pub struct EventsFound(u32);

// Outcome definition
#[derive(Debug, Serialize)]
pub struct InternalMessage(EventsResponse);
impl Outcome for InternalMessage {}

impl InternalMessage {
    pub fn new(data: EventsResponse) -> Self {
        Self(data)
    }
    pub fn count_events(
        db_connection: &AppDatabaseConnection,
        paging: &Paging,
    ) -> Result<EventsFound, Box<dyn std::error::Error>> {
        let conn = db_connection.get()?;

        let mut query = "SELECT COUNT(*) FROM `events`".to_string();
        let filter_by_site = paging.filter_by_site.get();
        if let Some(site) = &filter_by_site {
            let parsed_site = parse_site_filter(site)?;
            let crafted = format!(" WHERE `request_url` LIKE '{}%'", parsed_site);
            query.push_str(crafted.as_str());
        }
        query.push_str(";");
        let count = conn.query_row::<u32, _, _>(query.as_str(), params![], |r| r.get(0))?;
        // log::debug!("{:?}", stmt);
        Ok(EventsFound(count))
    }
    pub fn retrieve_events(
        db_connection: &AppDatabaseConnection,
        paging: &Paging,
    ) -> Result<Vec<Event>, Box<dyn std::error::Error>> {
        let conn = db_connection.get()?;

        let mut query: String = [
            "SELECT",
            " id, started_datetime, rtt,",                         // 3
            " request_method, request_url, request_http_version,", // 6
            " response_status_code, response_content_mimetype, response_body_size,", // 9
            " note_id FROM `events`",                              // 10
        ]
        .concat();

        let filter_by_site = paging.filter_by_site.get();

        if let Some(site) = &filter_by_site {
            let parsed_site = parse_site_filter(site)?;
            let crafted = format!(" WHERE `request_url` LIKE '{}%'", parsed_site);
            query.push_str(crafted.as_str());
        }

        query.push_str(" ORDER BY id LIMIT :limit OFFSET :offset;");

        let mut stmt = conn.prepare(query.as_str())?;

        log::debug!("{:?}", stmt);

        let params_query_no_filter =
            named_params! { ":limit": paging.limit.get(), ":offset": paging.offset.get() };
        let mut row_position: u16 = 0;
        let retrieved_events = stmt.query_map(params_query_no_filter, |row| {
            row_position += 1;
            let event = Event {
                id: EventId::new(row.get(0)?),
                started_datetime: EventStartedDateTime::new(row.get(1)?),
                rtt: EventRtt::new(row.get(2)?),
                request_method: RequestMethod::new(row.get(3)?),
                request_url: RequestUrl::new(row.get(4)?),
                request_http_version: RequestHttpVersion::new(row.get(5)?),
                response_status_code: ResponseStatusCode::new(row.get(6)?),
                response_content_mimetype: ResponseContentMimeType::new(row.get(7)?),
                response_body_size: ResponseBodySize::new(row.get(8)?),
                note_id: NoteId::new(row.get(9)?),
                row_position,
            };
            log::debug!("{:?}", &event);
            Ok(event)
        })?;

        let events: Vec<Event> = retrieved_events
            .filter_map(|row| match row {
                Ok(data) => Some(data),
                Err(error) => {
                    log::error!("DB: {}", error.to_string());
                    None
                }
            })
            .collect();

        Ok(events)
    }
}

fn parse_site_filter(data: &String) -> Result<String, Box<dyn std::error::Error>> {
    let parsed_url = Url::parse(data.as_str())?;
    let scheme = parsed_url.scheme();
    let host_str = parsed_url.host_str();
    let host_port = parsed_url.port();
    let mut current_site = format!("{}://{}", scheme, host_str.unwrap_or_default());
    if let Some(port) = host_port {
        current_site.push_str(":");
        current_site.push_str(port.to_string().as_str());
    }
    Ok(current_site.to_string())
}
