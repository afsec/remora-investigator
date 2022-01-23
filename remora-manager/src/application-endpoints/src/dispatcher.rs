use databases::application_db::global_state::AppGlobalState;
use tide::{log, Request, Response, StatusCode};

pub async fn handler(request: Request<AppGlobalState>) -> tide::Result {
    // TODO: Verify authentication
    let endpoint = String::from(request.param("endpoint")?);
    match endpoint.as_str() {
        "save_event" => super::endpoints::save_event::handler(request).await,
        "show_events" => super::endpoints::show_events::handler(request).await,
        "show_sites" => super::endpoints::show_sites::handler(request).await,
        "show_full_event" => super::endpoints::show_full_event::handler(request).await,
        "create_note" => super::endpoints::create_note::handler(request).await,
        "get_notes" => super::endpoints::get_notes::handler(request).await,
        "get_full_note" => super::endpoints::get_full_note::handler(request).await,
        "update_note" => super::endpoints::update_note::handler(request).await,
        "get_event_req_body" => super::endpoints::get_event_req_body::handler(request).await,
        "get_event_res_body" => super::endpoints::get_event_res_body::handler(request).await,
        _ => {
            log::warn!("Not found: {}", endpoint);
            Ok(Response::new(StatusCode::NotFound))
        }
    }
}

// pub struct Dispatcher;
