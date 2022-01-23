use std::convert::TryFrom;

use super::{outcome::InternalMessage, CreateNote};
use mvp_scaffold::endpoint::{Name, View};
use serde_json::to_string as serde_json_to_string;
use tide::{http::mime, log, prelude::Serialize, Error as TideError, Response, StatusCode};

#[derive(Serialize)]
struct ResponseBodyOk {
    id: u16,
}

impl TryFrom<InternalMessage> for ResponseBodyOk {
    type Error = Box<dyn std::error::Error>;

    fn try_from(data: InternalMessage) -> Result<Self, Self::Error> {
        let if_from_db = data.internal_message().get();
        Ok(ResponseBodyOk { id: if_from_db })
    }
}

#[derive(Serialize)]
struct ResponseBodyError {
    status: String,
    description: String,
}

impl View<InternalMessage> for CreateNote {
    fn view(&self, result: Result<InternalMessage, Box<dyn std::error::Error>>) -> tide::Result {
        match result {
            Ok(outcome) => {
                let response_body = match ResponseBodyOk::try_from(outcome) {
                    Ok(response_body) => response_body,
                    Err(tryfrom_error) => {
                        let error = TideError::from_str(StatusCode::Conflict, tryfrom_error.to_string());
                        log::error!(r#"Endpoint [{}]: {:?}"#, self.name(), &error);
                        return Err(error)
                    }
                };
                let json_body = serde_json_to_string(&response_body).unwrap_or("".to_owned());
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
