use base64::prelude::BASE64_STANDARD;
use base64::Engine;
use chromiumoxide::{
    browser::{Browser, BrowserConfig},
    cdp::browser_protocol::fetch::{
        ContinueRequestParams, EventRequestPaused, FulfillRequestParams,
    },
    // cdp::browser_protocol::page::Viewport,
    handler::viewport::Viewport,
};
use futures::StreamExt;
use std::sync::Arc;

const CONTENT: &str = "<html><head></head><body><h1>TEST</h1></body></html>";
const TARGET: &str = "https://news.ycombinator.com/";

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    tracing_subscriber::fmt::init();

    let viewport: Option<Viewport> = None;

    let (browser, mut handler) = Browser::launch(
        BrowserConfig::builder()
            .with_head()
            .viewport(viewport)
            .build()
            .map_err(|err_string| anyhow::Error::msg(err_string))?,
    )
    .await?;

    let handle = tokio::task::spawn(async move {
        loop {
            let outcome = handler.next().await.unwrap();
            dbg!(&outcome);
        }
    });

    dbg!(&handle);

    let page1 = browser.new_page("https://en.wikipedia.org").await?;

    // page.find_element("input#searchInput")
    //     .await?
    //     .click()
    //     .await?
    //     .type_str("Rust programming language")
    //     .await?
    //     .press_key("Enter")
    //     .await?;

    let _html = page1.wait_for_navigation().await?.content().await?;

    let page2 = Arc::new(browser.new_page("about:blank").await?);

    let mut request_paused = page2.event_listener::<EventRequestPaused>().await.unwrap();
    let intercept_page = page2.clone();
    let intercept_handle = tokio::task::spawn(async move {
        while let Some(event) = request_paused.next().await {
            dbg!(&event);
            if event.request.url == TARGET {
                if let Err(e) = intercept_page
                    .execute(
                        FulfillRequestParams::builder()
                            .request_id(event.request_id.clone())
                            .body(BASE64_STANDARD.encode(CONTENT))
                            .response_code(200)
                            .build()
                            .unwrap(),
                    )
                    .await
                {
                    println!("Failed to fullfill request: {e}");
                }
            } else if let Err(e) = intercept_page
                .execute(ContinueRequestParams::new(event.request_id.clone()))
                .await
            {
                println!("Failed to continue request: {e}");
            }
        }
    });

    dbg!(intercept_handle);

    handle.await?;
    Ok(())
}
