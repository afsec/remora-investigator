#![warn(clippy::all)]

use clap::{crate_authors, crate_description, App as ClapApp, Arg as ClapArg, ArgMatches};
use mvp_scaffold::app::App;

struct MyApp;
impl App for MyApp {
    fn name(&self) -> &'static str {
        "BrickPack"
    }
    fn version(&self) -> &'static str {
        env!("CARGO_PKG_VERSION")
    }
}

#[async_std::main]
async fn main() -> tide::Result<()> {
    let clap_matches = ClapApp::new(MyApp.name())
        .version(MyApp.version())
        .author(crate_authors!())
        .about(crate_description!())
        .arg(
            ClapArg::with_name("ENDPOINTS")
                .short("e")
                .long("endpoints")
                .value_name("ENDPOINTS")
                .help("Show endpoint names")
                .takes_value(false),
        )
        .arg(
            ClapArg::with_name("SESSION_FILE")
                .long("session-file")
                .value_name("SESSION_FILE")
                .require_equals(true)
                .help("Open past session file")
                .env("SESSION_FILE")
                .required(false),
        )
        .arg(
            ClapArg::with_name("PORT")
                .long("port")
                .value_name("PORT")
                .require_equals(true)
                .help("Port number")
                .env("PORT")
                .required(false),
        )
        .arg(
            ClapArg::with_name("LOG_LEVEL")
                .long("log-level")
                .value_name("LOG_LEVEL")
                .require_equals(true)
                .help("Log level: OFF, ERROR, WARN, INFO, DEBUG or TRACE")
                .env("LOG_LEVEL")
                .required(false),
        )
        .arg(
            ClapArg::with_name("TIDE_CERT_PATH")
                .long("tide-cert-path")
                .value_name("CERT_PATH")
                .require_equals(true)
                .help("TLS certificate file")
                .env("TIDE_CERT_PATH")
                .required(false),
        )
        .arg(
            ClapArg::with_name("TIDE_KEY_PATH")
                .long("tide-key-path")
                .value_name("KEY_PATH")
                .require_equals(true)
                .help("TLS key file")
                .env("TIDE_KEY_PATH")
                .required(false),
        )
        .get_matches();

    if clap_matches.args.contains_key("ENDPOINTS") {
        show_endpoints();
        Ok(())
    } else {
        start_log(&clap_matches);
        log::info!("Starting App [{} v{}]:", MyApp.name(), MyApp.version());
        web_server::start(clap_matches).await
    }
}

// * User Journey Map (https://uxplanet.org/a-beginners-guide-to-user-journey-mapping-bd914f4c517c)

fn show_endpoints() {
    let endpoints_header = r#"
  Internal Endpoints:
    /                - index_page
    /maintenance     - maintenance
    /auth            - check_auth
  
  Endpoints:"#;
    println!("{}", endpoints_header);
    println!(include_str!("../endpoints_found.txt"));
}

fn start_log(arg_matches: &ArgMatches<'_>) {
    use femme::LevelFilter;
    if arg_matches.args.contains_key("LOG_LEVEL") {
        let loglevel = match arg_matches.value_of("LOG_LEVEL").unwrap() {
            "OFF" => LevelFilter::Off,
            "ERROR" => LevelFilter::Error,
            "WARN" => LevelFilter::Warn,
            "INFO" => LevelFilter::Info,
            "DEBUG" => LevelFilter::Debug,
            "TRACE" => LevelFilter::Trace,
            _ => LevelFilter::Info,
        };
        femme::with_level(loglevel);
        log::log!(target: "app_events",log::Level::Warn, "Logger started: {}",loglevel);

        // "msg":"Logger started","level":Info
    } else {
        femme::start();
        log::info!("Logging started: INFO");
    }
}
