use rusqlite::params;
use serde::{Deserialize, Serialize};
use std::io;

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
    // Request
    request_postdata_mimetype: RequestPostDataMimeType,
    request_postdata_params: RequestPostDataParams,
    request_postdata_text: RequestPostDataText,
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
            " id, request_postdata_mimetype, request_postdata_params, request_postdata_text", // 4
            " FROM `events`",
            " WHERE `id` = ?1;",
        ]
        .concat();

        let mut stmt = conn.prepare(query.as_str())?;
        log::debug!("{:?}", stmt);

        let retrieved_event = stmt.query_row(params![event_id.get()], |row| {
            // * Pretty print - BEGIN
            let request_postdata_mimetype = RequestPostDataMimeType::new(row.get(1)?);
            let request_postdata_text: RequestPostDataText =
                if let Some(request_postdata_mimetype) = request_postdata_mimetype.get() {
                    // let content_type = request_postdata_mimetype.split(";").collect::<Vec<&str>>();
                    match request_postdata_mimetype.as_str() {
                        "text/html" => match InternalMessage::pretty_print(&row.get(3)?, "html") {
                            Ok(data) => RequestPostDataText::new_preview(&Some(data)),
                            Err(error) => {
                                log::error!("Pretty print: {}", error.to_string());
                                RequestPostDataText::new_preview(&None)
                            }
                        },
                        "text/css" => match InternalMessage::pretty_print(&row.get(3)?, "css") {
                            Ok(data) => RequestPostDataText::new_preview(&Some(data)),
                            Err(error) => {
                                log::error!("Pretty print: {}", error.to_string());
                                RequestPostDataText::new_preview(&None)
                            }
                        },
                        "application/javascript" | "text/javascript" => {
                            match InternalMessage::pretty_print(&row.get(3)?, "espree") {
                                Ok(data) => RequestPostDataText::new_preview(&Some(data)),
                                Err(error) => {
                                    log::error!("Pretty print: {}", error.to_string());
                                    RequestPostDataText::new_preview(&None)
                                }
                            }
                        }
                        "application/json" | "text/json" => {
                            let str_from_db: Option<String> = row.get(3)?;
                            match str_from_db {
                                Some(data_string) => {
                                    match jsonxf::pretty_print(data_string.as_str()) {
                                        Ok(data) => RequestPostDataText::new_preview(&Some(data)),
                                        Err(error) => {
                                            log::error!("Pretty print: {}", error.to_string());
                                            RequestPostDataText::new_preview(&None)
                                        }
                                    }
                                }
                                None => RequestPostDataText::new_preview(&None),
                            }
                        }
                        _ => RequestPostDataText::new_preview(&row.get(3)?),
                    }
                } else {
                    RequestPostDataText::new_preview(&None)
                };
            // * Pretty print - END
            let event = Event {
                // TODO: Implement `validate()` through input process at `new()` method
                id: EventId::new(row.get(0)?),
                // request_postdata_mimetype: RequestPostDataMimeType::new(row.get(1)?),
                request_postdata_mimetype,
                request_postdata_params: RequestPostDataParams::new(row.get(2)?),
                request_postdata_text, // request_postdata_text: RequestPostDataText::new(row.get(3)?),
            };
            log::debug!("DEBUG{:?}", &event);
            Ok(event)
        })?;

        Ok(retrieved_event)
    }
    fn pretty_print(input: &Option<String>, lang: &str) -> io::Result<String> {
        use std::io::Write;
        use std::process::{Command, Stdio};
        let beutified_code: String = match input {
            Some(data) => {
                let parser_arg = format!("--parser={}", lang);
                // * lang => html || js || css
                let a = vec![parser_arg.as_str()];
                // prettier --parser=html
                let mut child = Command::new("prettier")
                    .args(&a)
                    .stdin(Stdio::piped())
                    .stdout(Stdio::piped())
                    .stderr(Stdio::null())
                    .spawn()?;

                let child_stdin = child.stdin.as_mut().unwrap();

                child_stdin.write_all(data.as_bytes())?;
                // Close stdin to finish and avoid indefinite blocking
                drop(child_stdin);

                let output = child.wait_with_output()?;
                let x = output.stdout;
                let xs = String::from_utf8_lossy(&x);
                xs.to_string()
            }
            None => "".to_string(),
        };
        let inner_input = match input {
            Some(data) => data.as_str(),
            None => "",
        };
        if beutified_code.is_empty() && !inner_input.is_empty() {
            Ok(inner_input.to_string())
        } else {
            Ok(beutified_code)
        }
    }
}
