// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod helpers;

use remora_interceptor::Interceptor;

use helpers::AppResult;

#[tokio::main]
async fn main() -> AppResult<()> {
    // perform some async task before initializing the app
    start_db_pooling().await?;

    // share the current runtime with Tauri
    tauri::async_runtime::set(tokio::runtime::Handle::current());

    let res = tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![launch_interceptor])
        .run(tauri::generate_context!());
    dbg!(&res);
    Ok(res?)
}

async fn start_db_pooling() -> AppResult<()> {
    Ok(())
}


#[tauri::command]
async fn launch_interceptor(session_name: String) -> String {
    let output = format!("Session name: {}!", session_name);
    tauri::async_runtime::spawn(async move {
        Interceptor::new()
        .session_name(session_name)
        .launch().await.unwrap();
    });
    output
}
