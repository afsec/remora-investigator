// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod endpoints;
mod entities;
mod helpers;
mod interceptor;
mod model;
mod storage;

use std::path::PathBuf;
use std::sync::OnceLock;

use storage::RemoraStorage;

use crate::endpoints::launch_interceptor::launch_interceptor;
use crate::endpoints::list_events::list_events;
use crate::helpers::AppResult;

static SESSIONS_DIR: OnceLock<PathBuf> = OnceLock::new();
static REMORA_STORAGE: OnceLock<RemoraStorage> = OnceLock::new();

#[tokio::main]
async fn main() -> AppResult<()> {
    use std::env;
    use tauri::api::path::desktop_dir;

    tauri::async_runtime::set(tokio::runtime::Handle::current());

    let res = tauri::Builder::default()
        .setup(|_| {
            desktop_dir().map(|mut pathbuf| {
                pathbuf.push("remora_sessions/");
                let _ = SESSIONS_DIR.set(pathbuf);
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![launch_interceptor, list_events])
        .run(tauri::generate_context!());


    Ok(res?)
}
