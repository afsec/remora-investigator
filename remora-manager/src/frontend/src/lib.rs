#![warn(clippy::all)]

use tide::{http::mime, log, Request, Response};

pub async fn favicon(request: Request<()>) -> tide::Result {
    log::debug!("Endpoint Found: {}", request.url().to_string());
    let body = include_str!("../artifacts/favicon.ico");
    let response = Response::builder(200)
        .body(body)
        .content_type(mime::ICO)
        .build();

    Ok(response)
}

pub async fn index_page(request: Request<()>) -> tide::Result {
    log::debug!("Endpoint Found: {}", request.url().to_string());
    // let body = include_str!("../artifacts/index.html");
    let body_base = r#"<!doctype html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="icon" href="data:,">
      <title>tide-crud-users</title>

      <!-- UIkit CSS -->
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.6.19/dist/css/uikit.min.css" />
      
      <!-- UIkit JS -->
      <script src="https://cdn.jsdelivr.net/npm/uikit@3.6.19/dist/js/uikit.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/uikit@3.6.19/dist/js/uikit-icons.min.js"></script>

      <!-- Custom styles -->
      <link rel="stylesheet" href="css/style.css">
      
      <!-- Powered by Cellular JS -->     
      <script src="js/main.js"></script>
    </head>
    
    <body>
      <div id="app"></div>
    "#;
    let body = format!(
        "{}  <footer style=\"text-align: center;\"><p>tide-crud-users v{}</p></footer>\n    </body>\n</html>",
        body_base,
        env!("CARGO_PKG_VERSION")
    );
    let response = Response::builder(200)
        .body(body)
        .content_type(mime::HTML)
        .build();

    Ok(response)
}

pub async fn main_js(request: Request<()>) -> tide::Result {
    log::debug!("Endpoint Found: {}", request.url().to_string());
    let body = include_str!("../artifacts/js/main.js");
    let response = Response::builder(200)
        .body(body)
        .content_type(mime::JAVASCRIPT)
        .build();

    Ok(response)
}

pub async fn style_css(request: Request<()>) -> tide::Result {
    log::debug!("Endpoint Found: {}", request.url().to_string());
    let body = include_str!("../artifacts/css/style.css");
    let response = Response::builder(200)
        .body(body)
        .content_type(mime::CSS)
        .build();

    Ok(response)
}

pub async fn uikit_css(request: Request<()>) -> tide::Result {
    log::debug!("Endpoint Found: {}", request.url().to_string());
    let body = include_str!("../artifacts/css/uikit.min.css");
    let response = Response::builder(200)
        .body(body)
        .content_type(mime::CSS)
        .build();

    Ok(response)
}

pub async fn uikit_icons_min_js(request: Request<()>) -> tide::Result {
    log::debug!("Endpoint Found: {}", request.url().to_string());
    let body = include_str!("../artifacts/js/uikit-icons.min.js");
    let response = Response::builder(200)
        .body(body)
        .content_type(mime::JAVASCRIPT)
        .build();

    Ok(response)
}

pub async fn uikit_js(request: Request<()>) -> tide::Result {
    log::debug!("Endpoint Found: {}", request.url().to_string());
    let body = include_str!("../artifacts/js/uikit.min.js");
    let response = Response::builder(200)
        .body(body)
        .content_type(mime::JAVASCRIPT)
        .build();

    Ok(response)
}
