mod events;

use std::sync::Arc;

use anyhow::anyhow;
use chromiumoxide::browser::{Browser, BrowserConfig};
use chromiumoxide::cdp::browser_protocol::network::{
    EventRequestWillBeSent, EventResponseReceived,
};
use chromiumoxide::Page;
use futures::{select, StreamExt};
use tokio::sync::Mutex;

use crate::helpers::AppResult;
use crate::model::session::{SessionInfo, SessionName};
use crate::storage::RemoraStorage;

pub struct RemoraInterceptor {
    session_name: SessionName,
    storage: RemoraStorage,
}

pub struct RemoraInterceptorBuilder;
impl RemoraInterceptorBuilder {
    pub fn session_name<T: AsRef<str>>(self, session_name: T) -> RemoraInterceptorBuilderWithS {
        RemoraInterceptorBuilderWithS {
            session_name: session_name.as_ref().to_string().into(),
        }
    }
}
pub struct RemoraInterceptorBuilderWithS {
    session_name: SessionName,
}

impl RemoraInterceptorBuilderWithS {
    pub fn storage(self, storage: RemoraStorage) -> RemoraInterceptorBuilderWithSD {
        let Self { session_name } = self;

        RemoraInterceptorBuilderWithSD {
            session_name,
            storage,
        }
    }
}

pub struct RemoraInterceptorBuilderWithSD {
    session_name: SessionName,
    storage: RemoraStorage,
}

impl RemoraInterceptorBuilderWithSD {
    pub fn build(self) -> RemoraInterceptor {
        let Self {
            session_name,
            storage,
        } = self;
        RemoraInterceptor {
            session_name,
            storage,
        }
    }
}
impl RemoraInterceptor {
    pub fn new() -> RemoraInterceptorBuilder {
        RemoraInterceptorBuilder
    }

    pub async fn launch<'a>(self) -> anyhow::Result<()> {
        use url::Url;
        let session_info = SessionInfo {
            name: self.session_name(),
            path: Url::parse(self.storage().uri())?.path().to_string().into(),
        };

        Self::save_session_info(self.storage(), session_info).await?;

        launch_inteceptor(self).await
    }

    async fn save_session_info<'session_name>(
        remora_storage: &RemoraStorage,
        session_info: SessionInfo<'session_name>,
    ) -> anyhow::Result<()> {
        use crate::entities::{prelude::*, *};
        use sea_orm::*;
        let SessionInfo { name, path } = session_info;

        let session = session::ActiveModel {
            name: ActiveValue::Set(name.as_ref().into()),
            path: ActiveValue::Set(path.into()),
            ..Default::default()
        };
        let res = Session::insert(session)
            .exec(remora_storage.connection())
            .await?;

        dbg!(&res);

        Ok(())
    }

    pub fn session_name(&self) -> &SessionName {
        &self.session_name
    }

    pub fn storage(&self) -> &RemoraStorage {
        &self.storage
    }
}

async fn launch_inteceptor(ctx: RemoraInterceptor) -> anyhow::Result<()> {
    tracing_subscriber::fmt::init();

    let (browser, mut handler) = Browser::launch(
        BrowserConfig::builder()
            .with_head()
            .viewport(None)
            .build()
            .map_err(|err| anyhow!(err))?,
    )
    .await?;

    let handle = tokio::task::spawn(async move {
        while let Some(h) = handler.next().await {
            if h.is_err() {
                break;
            }
        }
    });

    {
        let page: Arc<Page> = Arc::new(browser.new_page("about:blank").await?);

        let mut request_will_be_sent = page
            .event_listener::<EventRequestWillBeSent>()
            .await
            .unwrap()
            .fuse();

        let mut response_received = page
            .event_listener::<EventResponseReceived>()
            .await
            .unwrap()
            .fuse();

        let _ = tokio::task::spawn(async move {
            loop {
                select! {
                    event = request_will_be_sent.next() => {
                        if let Some(event) = event {
                          let _ = self::events::request_will_be_sent::handler(&ctx,event).await;
                        }
                    },
                    event = response_received.next() => {
                        if let Some(event) = event {
                            let _ = self::events::response_received::handler(&ctx,event).await;
                        }
                    },
                  complete => break,
                }
            }

            println!("done");
        });
    }

    handle.await?;
    Ok(())
}
