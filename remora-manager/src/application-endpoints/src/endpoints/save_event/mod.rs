mod model;
mod outcome;
mod view;

use databases::{
    application_db::connection::AppDatabaseConnection, application_db::global_state::AppGlobalState,
};
use mvp_scaffold::endpoint::{Endpoint, Name, Presenter};
use outcome::InternalMessage;
use tide::{log, Request};
// Endpoint definition
#[derive(Debug)]
pub struct SaveEvent;

impl Endpoint for SaveEvent {}

impl Name for SaveEvent {
    fn name(&self) -> &'static str {
        module_path!()
            .split("::")
            .collect::<Vec<&str>>()
            .last()
            .unwrap()
    }
}

impl Presenter<SaveEvent, AppDatabaseConnection, String, InternalMessage> for SaveEvent {}

pub async fn handler(mut request: Request<AppGlobalState>) -> tide::Result {
    let endpoint = String::from(request.param("endpoint")?);
    if endpoint.as_str() == SaveEvent.name() {
        log::info!("Endpoint found: {}", &endpoint);
        let request_body = request.body_string().await?;
        let db_connection_app = &request.state().db_connection_app;
        SaveEvent::presenter(SaveEvent, &db_connection_app, &request_body)
    } else {
        let error = format!("Endpoint mismatch: [{}]", endpoint);
        Err(tide::Error::from_str(
            tide::StatusCode::Conflict,
            error.to_owned(),
        ))
    }
}
