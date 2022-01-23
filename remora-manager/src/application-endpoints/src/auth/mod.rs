use databases::application_db::global_state::AppGlobalState;
use tide::{Request, Result as TideResult};

pub async fn check_auth(request: Request<AppGlobalState>) -> TideResult {
    drop(request);
    Ok(tide::Response::new(200))
}
