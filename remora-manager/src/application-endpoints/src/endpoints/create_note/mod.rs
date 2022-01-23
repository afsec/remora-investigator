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
pub struct CreateNote;

impl Endpoint for CreateNote {}

impl Name for CreateNote {
    fn name(&self) -> &'static str {
        module_path!()
            .split("::")
            .collect::<Vec<&str>>()
            .last()
            .unwrap()
    }
}

impl Presenter<CreateNote, AppDatabaseConnection, String, InternalMessage> for CreateNote {}

pub async fn handler(mut request: Request<AppGlobalState>) -> tide::Result {
    let endpoint = String::from(request.param("endpoint")?);
    if endpoint.as_str() == CreateNote.name() {
        log::info!("Endpoint found: {}", &endpoint);
        let request_body = request.body_string().await?;
        let db_connection_app = &request.state().db_connection_app;
        CreateNote::presenter(CreateNote, &db_connection_app, &request_body)
    } else {
        let error = format!("Endpoint mismatch: [{}]", endpoint);
        Err(tide::Error::from_str(
            tide::StatusCode::Conflict,
            error.to_owned(),
        ))
    }
}
