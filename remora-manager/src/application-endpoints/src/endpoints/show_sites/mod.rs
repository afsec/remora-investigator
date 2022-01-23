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
pub struct ShowSites;

impl Endpoint for ShowSites {}

impl Name for ShowSites {
    fn name(&self) -> &'static str {
        module_path!()
            .split("::")
            .collect::<Vec<&str>>()
            .last()
            .unwrap()
    }
}

impl Presenter<ShowSites, AppDatabaseConnection, String, InternalMessage> for ShowSites {}

pub async fn handler(mut request: Request<AppGlobalState>) -> tide::Result {
    let endpoint = String::from(request.param("endpoint")?);
    log::info!("Endpoint found: {}", endpoint);
    let request_body = request.body_string().await?;
    let db_connection_app = &request.state().db_connection_app;
    ShowSites::presenter(ShowSites, &db_connection_app, &request_body)
}
