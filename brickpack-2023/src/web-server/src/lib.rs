use design_scaffold::AppResult;

use self::config::WebServerConfig;

pub mod config;
mod server;

#[derive(Debug)]
pub struct WebServer {
    config: WebServerConfig,
}

impl WebServer {
    pub fn new(config: WebServerConfig) -> Self {
        Self { config }
    }
    pub async fn run(self) -> AppResult<()> {
        crate::server::run(self.config).await
    }
}
