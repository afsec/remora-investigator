// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use interceptor::Interceptor;

mod interceptor;

#[tokio::main]
async fn main() {
    // perform some async task before initializing the app
    do_something().await;

    // share the current runtime with Tauri
    tauri::async_runtime::set(tokio::runtime::Handle::current());

    let res = tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![launch_interceptor])
        .run(tauri::generate_context!());
    dbg!(res);
}

async fn do_something() {}


#[tauri::command]
async fn launch_interceptor(name: String) -> String {
    tauri::async_runtime::spawn(async move {
        Interceptor::new().launch().await.unwrap();
    });
    format!("Session name: {}!", name)
}
