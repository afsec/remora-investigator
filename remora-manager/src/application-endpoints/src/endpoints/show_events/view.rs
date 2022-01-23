use super::{outcome::InternalMessage, ShowEvents};
use mvp_scaffold::endpoint::{Name, View};
use serde_json::to_string as serde_json_to_string;
use tide::{http::mime, log, prelude::Serialize, Error as TideError, Response, StatusCode};

#[derive(Serialize)]
struct ResponseBodyError {
    status: String,
    description: String,
}

impl View<InternalMessage> for ShowEvents {
    fn view(&self, result: Result<InternalMessage, Box<dyn std::error::Error>>) -> tide::Result {
        match result {
            Ok(outcome) => {
                let json_body = serde_json_to_string(&outcome).unwrap_or("".to_owned());
                Ok(Response::builder(StatusCode::Ok)
                    .content_type(mime::JSON)
                    .body(json_body)
                    .build())
            }
            Err(mvp_error) => {
                let error = TideError::from_str(StatusCode::Conflict, mvp_error.to_string());
                log::error!(r#"Endpoint [{}]: {:?}"#, self.name(), &error);
                Err(error)
            }
        }
    }
}
