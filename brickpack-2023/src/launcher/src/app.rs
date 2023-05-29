use std::{net::Ipv4Addr, path::PathBuf};

use clap::{value_parser, Arg, ArgMatches, Command, ValueHint};

use design_scaffold::AppResult;
use web_server::{
    config::{WebServerConfig, WebServerSocket, WebServerTlsConfig, WebServerTlsHostname},
    WebServer,
};

#[derive(Debug, Default)]
pub(crate) struct App {
    config: AppConfig,
}

impl App {
    pub(crate) fn new() -> PreApp {
        let cli = Command::new(clap::crate_name!())
            .version(clap::crate_version!())
            .author(clap::crate_authors!())
            .about(clap::crate_description!())
            // .arg(
            //     Arg::new("dataset-name")
            //         .value_name("DATASET_NAME")
            //         .value_hint(ValueHint::FilePath)
            //         .env("DATASET_NAME")
            //         .value_parser(clap::builder::ValueParser::new(dataset_file_parse_wrap))
            //         .help("Dataset file .json file to load")
            //         .required(true)
            //         .num_args(1),
            // )
            .arg(
                Arg::new("show_endpoints")
                    .short('e')
                    .long("endpoints")
                    .help("Show endpoint names")
                    .num_args(0)
                    .exclusive(true),
            )
            .arg(
                Arg::new("ipv4_address")
                    .long("ipv4-address")
                    .value_name("IPV4_ADDRESS")
                    .value_parser(value_parser!(Ipv4Addr))
                    .require_equals(true)
                    .help("IPv4 address to listen")
                    .env("IPV4_ADDRESS")
                    .num_args(1)
                    .required(false),
            )
            .arg(
                Arg::new("ipv4_port")
                    .long("ipv4-port")
                    .value_name("IPV4_PORT")
                    .value_parser(value_parser!(u16))
                    .require_equals(true)
                    .help("Port number to listen")
                    .env("IPV4_PORT")
                    .num_args(1)
                    .required(false),
            )
            .arg(
                Arg::new("dev_mode")
                    .long("enable-dev-mode")
                    .env("ENABLE_DEV_MODE")
                    .num_args(0)
                    .help("Endpoint `/js/main.js` serve a local file `./main.js` instead of default frontend.")
                    .required(false),
            )
            .arg(
                Arg::new("tokio_console")
                    .long("enable-tokio-console")
                    .env("ENABLE_TOKIO_CONSOLE")
                    .num_args(0)
                    .help("Enable tokio-console")
                    .required(false),
            )
            .arg(
                Arg::new("tls_cert_path")
                    .long("tls-cert-path")
                    .value_name("CERT_PATH")
                    .value_hint(ValueHint::FilePath)
                    .value_parser(value_parser!(PathBuf))
                    .require_equals(true)
                    .num_args(1)
                    .help("TLS certificate file")
                    .env("TLS_CERT_PATH")
                    .required(false),
            )
            .arg(
                Arg::new("tls_key_path")
                    .long("tls-key-path")
                    .value_name("KEY_PATH")
                    .value_hint(ValueHint::FilePath)
                    .value_parser(value_parser!(PathBuf))
                    .require_equals(true)
                    .num_args(1)
                    .help("TLS private key file")
                    .env("TLS_KEY_PATH")
                    .required(false),
            )
            .arg(
                Arg::new("auto_generate_tls_cert")
                    .long("auto-tls-for-hostname")
                    .value_name("HOSTNAME")
                    .value_hint(ValueHint::Hostname)
                    .require_equals(true)
                    .num_args(1)
                    .help("Hostname for auto-generated TLS cert")
                    .env("AUTO_TLS_FOR_HOSTNAME")
                    .required(false),
            )
            ;
        PreApp { cli }
    }
    pub(crate) async fn run(self) -> AppResult<()> {
        let app_config = self.config;

        if app_config.show_endpoints {
            println!("RUN: Show endpoints");
            Ok(())
        } else {
            let wb_config = WebServerConfig::from(app_config);
            WebServer::new(wb_config).run().await
        }
    }
}
pub(crate) struct PreApp {
    cli: Command,
}
impl PreApp {
    pub(crate) fn load_cli(self) -> AppResult<App> {
        let matches = self.cli.get_matches();

        // * Tracing
        start_tracing(&matches);

        let tls_config = WebServerTlsConfig::from_matches(&matches)?;

        let auto_generate_tls_cert_hostname = WebServerTlsHostname::from_matches(&matches)?;

        let socket = WebServerSocket::from_matches(&matches)?;

        Ok(App {
            config: AppConfig {
                dev_mode: matches.get_flag("dev_mode"),
                show_endpoints: matches.get_flag("show_endpoints"),
                tokio_console: matches.get_flag("tokio_console"),
                socket,
                tls_config,
                auto_generate_tls_cert_hostname,
            },
        })
    }
}

#[derive(Debug, Default)]
struct AppConfig {
    show_endpoints: bool,
    dev_mode: bool,
    tokio_console: bool,
    socket: WebServerSocket,
    tls_config: Option<WebServerTlsConfig>,
    auto_generate_tls_cert_hostname: Option<WebServerTlsHostname>,
}

impl From<AppConfig> for WebServerConfig {
    fn from(app_config: AppConfig) -> Self {
        let AppConfig {
            dev_mode,
            tokio_console,
            socket,
            tls_config,
            auto_generate_tls_cert_hostname,
            ..
        } = app_config;
        Self { dev_mode, tokio_console, socket, tls_config, auto_generate_tls_cert_hostname }
    }
}

fn start_tracing(clap_matches: &ArgMatches) {
    use std::env;
    // let default_loglevel = "applications-endpoints=debug";
    let default_loglevel = "info";
    let mut was_loglevel_set_at_startup = true;
    if env::var_os("RUST_LOG").is_none() {
        env::set_var("RUST_LOG", default_loglevel);
        was_loglevel_set_at_startup = false;
    }

    let startup_message = format!("Starting App [Brickpack v{}]:", env!("CARGO_PKG_VERSION"));
    if clap_matches.get_flag("tokio_console") {
        // if clap_matches.is_present("tokio_console") {
        console_subscriber::init();
        tracing::info!("{}", startup_message);
        tracing::info!("Tokio-console started at http://127.0.0.1:6669");
    } else {
        tracing_subscriber::fmt::init();
        tracing::info!("{}", startup_message);
        tracing::info!("Tracing started successfully");
    }
    if !was_loglevel_set_at_startup {
        tracing::info!(
            "RUST_LOG was not set. Setting default value: RUST_LOG={}",
            &default_loglevel
        );
    }
}
