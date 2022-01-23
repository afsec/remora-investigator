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
pub struct GetNotes;

impl Endpoint for GetNotes {}

impl Name for GetNotes {
    fn name(&self) -> &'static str {
        module_path!()
            .split("::")
            .collect::<Vec<&str>>()
            .last()
            .unwrap()
    }
}

impl Presenter<GetNotes, AppDatabaseConnection, String, InternalMessage> for GetNotes {}

pub async fn handler(mut request: Request<AppGlobalState>) -> tide::Result {
    let endpoint = String::from(request.param("endpoint")?);
    log::info!("Endpoint found: {}", endpoint);
    let request_body = request.body_string().await?;
    let db_connection_app = &request.state().db_connection_app;

    let result = GetNotes::presenter(GetNotes, &db_connection_app, &request_body);

    result
}
