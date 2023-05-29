use design_scaffold::{
    oid::{ObjectIdReactor, OidPool},
    AppResult,
};

use crate::config::WebServerConfig;

use axum::{
    http::StatusCode,
    response::{Html, IntoResponse},
    routing::{get, post},
    Json, Router, Server,
};
use serde::{Deserialize, Serialize};

pub async fn run(config: WebServerConfig) -> AppResult<()> {
    dbg!(&config);
    println!("[{}:{}] Hello, world!", file!(), line!());

    // * OID Reactor
    let oid_pool: OidPool = ObjectIdReactor::new().await?;

    let mut oid_reactor = oid_pool.write().await;
    let new_oid = oid_reactor.generate().await?;

    println!("[{}:{}] new_oid: [{new_oid}]", file!(), line!());

    let router = Router::new()
        // `GET /` goes to `root`
        .route("/", get(root))
        // `POST /users` goes to `create_user`
        .route("/users", post(create_user));

    let socket = config.socket();
    tracing::info!("Listening on http://{}", socket);
    Server::bind(&socket).serve(router.into_make_service()).await?;

    Ok(())
}

// basic handler that responds with a static string
async fn root() -> Html<String> {
    Html("<h1>It works!</h1>".into())
}

async fn create_user(
    // this argument tells axum to parse the request body
    // as JSON into a `CreateUser` type
    Json(payload): Json<CreateUser>,
) -> (StatusCode, Json<User>) {
    // insert your application logic here
    let user = User { id: 1337, username: payload.username };

    // this will be converted into a JSON response
    // with a status code of `201 Created`
    (StatusCode::CREATED, Json(user))
}

// the input to our `create_user` handler
#[derive(Deserialize)]
struct CreateUser {
    username: String,
}

// the output to our `create_user` handler
#[derive(Serialize)]
struct User {
    id: u64,
    username: String,
}
