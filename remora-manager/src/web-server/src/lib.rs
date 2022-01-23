#![warn(clippy::all)]

use clap::ArgMatches;
use databases::application_db::global_state::AppGlobalState;
use tide_rustls::TlsListener;

mod routes;

pub async fn start(arg_matches: ArgMatches<'_>) -> tide::Result<()> {
    use databases::application_db::connection::AppDatabaseConnection;

    #[cfg(debug_assertions)]
    let addr = "127.0.0.2";
    #[cfg(not(debug_assertions))]
    let addr = "127.0.0.1";
    let mut port: String = "65432".into();
    if arg_matches.args.contains_key("PORT") {
        let port_number_str = arg_matches.value_of("PORT").unwrap();
        // * Check if a valid port number [0 - 65535]
        let port_number = match port_number_str.parse::<u16>() {
            Ok(port) => port,
            Err(error) => {
                let error_msg = format!("Cannot parse PORT value -> {}", error);
                return Err(tide::Error::from_str(
                    tide::StatusCode::BadRequest,
                    error_msg,
                ));
            }
        };
        port = port_number.to_string();
    }

    let listen = format!("{}:{}", addr, port);

    let db_connection_app: AppDatabaseConnection = if arg_matches.args.contains_key("SESSION_FILE")
    {
        let session_file = arg_matches.value_of("SESSION_FILE").unwrap();
        AppDatabaseConnection::open_file(session_file)?
            .bootstrap(session_file)?
            .build()
    } else {
        let database_filename = get_db_filename();
        AppDatabaseConnection::new_file(database_filename.as_str())?
            .bootstrap(database_filename.as_str())?
            .build()
    };
    // let db_connection_app = AppDatabaseConnection::new_file()?.bootstrap()?.build();

    let state = AppGlobalState { db_connection_app };

    // * Create Tide Middleware
    use tide::http::headers::HeaderValue;
    use tide::security::{CorsMiddleware, Origin};

    let cors = CorsMiddleware::new()
        .allow_methods("GET, POST, OPTIONS".parse::<HeaderValue>().unwrap())
        .allow_origin(Origin::from("*"))
        .allow_credentials(false);

    // * Create TIDE SERVER
    let mut app = tide::with_state(state);
    // * Implement CORS middleware
    app.with(cors);

    // * Routes
    app.at("/").nest(routes::frontend::get_routes());
    app.at("/api/auth")
        .get(application_endpoints::auth::check_auth); // TODO: JWT Logon
    app.at("/api/:endpoint")
        .post(application_endpoints::dispatcher::handler);

    // * Socket binding
    if arg_matches.args.contains_key("TIDE_CERT_PATH")
        && arg_matches.args.contains_key("TIDE_KEY_PATH")
    {
        app.listen(
            TlsListener::build()
                .addrs(listen)
                .cert(arg_matches.value_of("TIDE_CERT_PATH").unwrap())
                .key(arg_matches.value_of("TIDE_KEY_PATH").unwrap()),
        )
        .await?;
    } else {
        app.listen(listen).await?;
    }
    Ok(())
}

fn get_db_filename() -> String {
    // let module_path = module_path!();
    // let module_path_vec: Vec<&str> = module_path.split("::").collect();
    // let file_name = module_path_vec[1];
    use std::time::SystemTime;
    let now = SystemTime::now()
        .duration_since(SystemTime::UNIX_EPOCH)
        .unwrap();
    format!("remora-session-{}.dat", now.as_secs())
}
