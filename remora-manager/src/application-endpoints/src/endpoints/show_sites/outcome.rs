use databases::application_db::connection::AppDatabaseConnection;
use mvp_scaffold::endpoint::Outcome;
use rusqlite::params;
use serde::{Deserialize, Serialize};
use std::{collections::BTreeMap, convert::TryFrom};
// use tide::Error as TideError;

use application_models::event::*;
// Serde struct - BEGIN
#[derive(Debug, Deserialize)]
pub struct Paging {}
// pub struct Paging {
//     #[serde(default)]
//     limit: PagingLimit,
//     #[serde(default)]
//     offset: PagingOffset,
// }

// #[derive(Debug, Deserialize)]
// pub struct PagingLimit(u16);
// impl Default for PagingLimit {
//     fn default() -> Self {
//         PagingLimit(20)
//     }
// }
// impl PagingLimit {
//     fn get(&self) -> u16 {
//         self.0
//     }
// }

// #[derive(Debug, Deserialize)]
// pub struct PagingOffset(u16);
// impl Default for PagingOffset {
//     fn default() -> Self {
//         PagingOffset(0)
//     }
// }
// impl PagingOffset {
//     fn get(&self) -> u16 {
//         self.0
//     }
// }
// Serde struct - END

#[derive(Debug, Serialize, Deserialize)]
pub struct Event {
    id: EventId,
    // Request
    request_url: RequestUrl,
}

impl Event {
    pub fn get_url(&self) -> &RequestUrl {
        &self.request_url
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct EventsSummary {
    total_events: usize,
    total_sites: usize,
    sites: Vec<SiteEntry>,
}
impl EventsSummary {
    pub fn get_total_events(&self) -> usize {
        self.total_events
    }
}
#[derive(Debug, Serialize, Deserialize)]
pub struct SiteEntry {
    site: String,
    events: usize,
}

// Outcome definition
#[derive(Debug, Serialize)]
pub struct InternalMessage(EventsSummary);
impl Outcome for InternalMessage {}

impl TryFrom<EventsSummary> for InternalMessage {
    type Error = Box<dyn std::error::Error>;

    fn try_from(data: EventsSummary) -> Result<Self, Self::Error> {
        Ok(InternalMessage(data))
    }
}

impl InternalMessage {
    pub fn events_summary(
        db_connection: &AppDatabaseConnection,
        _: Paging,
    ) -> Result<EventsSummary, Box<dyn std::error::Error>> {
        use url::Url;
        let conn = db_connection.get()?;
        let mut stmt = conn.prepare("SELECT id, request_url FROM `events`;")?;
        log::debug!("{:?}", stmt);
        let retrieved_events = stmt.query_map(params![], |row| {
            let event = Event {
                id: EventId::new(row.get(0)?),
                request_url: RequestUrl::new(row.get(1)?),
            };
            log::debug!("{:?}", &event);
            Ok(event)
        })?;

        // for row in retrieved_events {
        //     if let Ok(event) = row {
        //         events.push(event);
        //     }
        // }
        let mut total_events = 0;
        let mut sites_btree: BTreeMap<String, usize> = BTreeMap::new();

        // * Extract sites from URLs
        for row in retrieved_events {
            total_events += 1;
            match row {
                Ok(event) => {
                    let parsed_url: Url;

                    let event_url = event.get_url().get();
                    if event_url.is_some() {
                        parsed_url = Url::parse(event_url.as_ref().unwrap().as_str())?;
                    } else {
                        parsed_url = Url::parse("")?;
                    }

                    let scheme = parsed_url.scheme();
                    let host_str = parsed_url.host_str();
                    let host_port = parsed_url.port();
                    let mut current_site = format!("{}://{}", scheme, host_str.unwrap_or_default());
                    if let Some(port) = host_port {
                        current_site.push_str(":");
                        current_site.push_str(port.to_string().as_str());
                    }

                    sites_btree
                        .entry(current_site)
                        .and_modify(|count| *count += 1)
                        .or_insert(1);
                }
                Err(error) => {
                    log::error!("{}", &error.to_string());
                    return Err(Box::new(error));
                }
            }
        }
        // let sites: Vec<SiteEntry> = sites_btree.map(|k, v| SiteEntry { site: k, events: v }).collect();
        let sites: Vec<SiteEntry> = sites_btree
            .iter()
            .map(|(k, v)| SiteEntry {
                site: k.to_string(),
                events: *v,
            })
            .collect();
        let events_summary = EventsSummary {
            total_events,
            total_sites: sites.len(),
            sites,
        };
        Ok(events_summary)
    }
}
