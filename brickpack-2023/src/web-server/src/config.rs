use crate::AppResult;

use anyhow::anyhow;
use clap::ArgMatches;
use design_scaffold::AppError;

use std::net::SocketAddr;
use std::path::PathBuf;
use std::str::FromStr;

#[derive(Debug)]
pub struct WebServerConfig {
    pub dev_mode: bool,
    pub tokio_console: bool,
    pub socket: WebServerSocket,
    pub tls_config: Option<WebServerTlsConfig>,
    pub auto_generate_tls_cert_hostname: Option<WebServerTlsHostname>,
}

impl WebServerConfig {
    pub fn socket(&self) -> &SocketAddr {
        &self.socket.0
    }
}

#[derive(Debug)]
pub struct WebServerTlsConfig {
    pub tls_cert_path: PathBuf,
    pub tls_key_path: PathBuf,
}

impl WebServerTlsConfig {
    pub fn from_matches(matches: &ArgMatches) -> AppResult<Option<Self>> {
        let maybe_tls_key_path = matches.get_one::<PathBuf>("tls_key_path");
        let maybe_tls_cert_path = matches.get_one::<PathBuf>("tls_cert_path");

        let maybe_app_tls_config = match (maybe_tls_key_path, maybe_tls_cert_path) {
            (Some(inner_tls_key_path), Some(inner_tls_cert_path)) => Some(WebServerTlsConfig {
                tls_cert_path: inner_tls_cert_path.to_path_buf(),
                tls_key_path: inner_tls_key_path.to_path_buf(),
            }),
            (None, None) => None,
            _ => {
                return Err(anyhow!(
                    "Both tls_key_path and tls_cert_path need to be defined together"
                ))
            }
        };
        // TODO: Check if both files exist
        // let maybe_app_tls_config
        Ok(maybe_app_tls_config)
    }
}

#[derive(Debug)]
pub struct WebServerTlsHostname(String);
impl WebServerTlsHostname {
    pub fn from_matches(matches: &ArgMatches) -> AppResult<Option<Self>> {
        match matches.get_one::<String>("auto_generate_tls_cert") {
            Some(possible_hostname) => {
                if hostname_validator::is_valid(possible_hostname) {
                    Ok(Some(Self(possible_hostname.clone())))
                } else {
                    Err(anyhow!("Invalid hostname for auto_generate_tls_cert"))
                }
            }
            None => Ok(None),
        }
    }
}

#[derive(Debug)]
pub struct WebServerSocket(SocketAddr);
impl FromStr for WebServerSocket {
    type Err = AppError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        s.parse()
    }
}
impl Default for WebServerSocket {
    fn default() -> Self {
        use std::net::IpAddr;
        use std::net::Ipv4Addr;
        let socket = SocketAddr::new(IpAddr::V4(Ipv4Addr::new(127, 0, 0, 1)), 8080);
        Self(socket)
    }
}
impl WebServerSocket {
    pub fn from_matches(matches: &ArgMatches) -> AppResult<Self> {
        use std::net::IpAddr;
        use std::net::Ipv4Addr;
        let maybe_ipv4_address = matches.get_one::<Ipv4Addr>("ipv4_address");
        let maybe_ipv4_port = matches.get_one::<u16>("ipv4_port");

        let socket = match (maybe_ipv4_address, maybe_ipv4_port) {
            (Some(inner_ipv4_address), Some(inner_ipv4_port)) => {
                let socket_addr =
                    SocketAddr::new(IpAddr::V4(*inner_ipv4_address), *inner_ipv4_port);
                Ok(WebServerSocket(socket_addr))
            }
            (None, None) => Ok(WebServerSocket::default()),
            _ => Err(anyhow!("Both ipv4_address and ipv4_port need to be defined together")),
        }?;

        Ok(socket)
    }
}
