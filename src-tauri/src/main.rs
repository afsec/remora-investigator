// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod entities;
mod helpers;
mod interceptor;

mod storage;

use std::path::PathBuf;
use std::sync::OnceLock;

use anyhow::anyhow;
use futures::TryFutureExt;

use crate::helpers::AppResult;
use crate::interceptor::RemoraInterceptor;
use crate::storage::RemoraStorage;

static SESSIONS_DIR: OnceLock<PathBuf> = OnceLock::new();

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
        .invoke_handler(tauri::generate_handler![launch_interceptor])
        .run(tauri::generate_context!());

    dbg!(&res);
    Ok(res?)
}

#[tauri::command]
async fn launch_interceptor(session_name: String) -> String {
    use std::time::SystemTime;
    // TODO: Implement dispatcher
    let now = SystemTime::now()
        .duration_since(SystemTime::UNIX_EPOCH)
        .unwrap();

    let session_name_from_ui = session_name;

    dbg!(&session_name_from_ui);

    let session_name_str = match session_name_from_ui.chars().nth(1) {
        Some(_) => session_name_from_ui,
        None => "remora-session".to_string(),
    };

    let session_filename = format!("{session_name_str}-{}", now.as_secs());

    let outcome = format!("Session name: {}!", session_name_str);

    if let Err(error) = check_session_dir() {
        return format!(
            r#"{{ "success": false, "error": "{}" }}"#,
            error.to_string()
        );
    };

    dbg!(&outcome);

    let remora_storage = match start_storage(session_filename).await {
        Ok(v) => v,
        Err(error) => {
            let error_json = format!(
                r#"{{ "success": false, "error": "{}" }}"#,
                error.to_string()
            );
            dbg!(&error_json);
            return error_json;
        }
    };

    tauri::async_runtime::spawn(async move {
        if let Err(err) = RemoraInterceptor::new()
            .session_name(session_name_str)
            .storage(remora_storage)
            .build()
            .launch()
            .await
        {
            dbg!(&err);
        }
    });

    format!(r#"{{ "success": true, "data": {outcome} }}"#)
}

async fn start_storage<T: AsRef<str>>(session_filename: T) -> anyhow::Result<RemoraStorage> {
    let storage = RemoraStorage::new(&session_filename)?.build().await?;
    let _ = storage.start_db().await?;
    Ok(storage)
}

fn check_session_dir() -> AppResult<()> {
    use std::ops::Not;
    let session_dir = SESSIONS_DIR
        .get()
        .map(|pathbuf| {
            if pathbuf.is_dir().not() {
                if let Err(error) = std::fs::create_dir(pathbuf) {
                    dbg!(error);
                }
            }
            pathbuf
        })
        .ok_or(anyhow!(
            "IMPOSSIBLE STATE: Session directory is not defined"
        ))?;

    dbg!(&session_dir);
    Ok(())
}
