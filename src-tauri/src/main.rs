// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod helpers;
mod interceptor;
mod storage;

use std::cell::RefCell;
use std::path::PathBuf;
use std::rc::Rc;
use std::sync::OnceLock;
use std::{
    collections::HashMap,
    sync::{
        atomic::{AtomicUsize, Ordering},
        Arc, Mutex,
    },
};

use anyhow::anyhow;
use tauri::State;

use crate::helpers::AppResult;
use crate::interceptor::RemoraInterceptor;
use crate::storage::RemoraStorage;

static SESSIONS_DIR: OnceLock<PathBuf> = OnceLock::new();

// struct Client;

// impl Client {
//     fn send(&self) {}
// }

// #[derive(Default)]
// struct Connection(Mutex<Option<Client>>);

#[tokio::main]
async fn main() -> AppResult<()> {
    use std::env;
    use tauri::api::path::desktop_dir;

    tauri::async_runtime::set(tokio::runtime::Handle::current());

    let res = tauri::Builder::default()
        .setup(move |app| {
            desktop_dir().map(|mut pathbuf| {
                pathbuf.push("remora_sessions/");
                let _ = SESSIONS_DIR.set(pathbuf);
            });

            Ok(())
        })
        // .manage(Connection(Default::default()))
        .invoke_handler(tauri::generate_handler![
            launch_interceptor,
            // connect,
            // disconnect,
            // connection_send
        ])
        .run(tauri::generate_context!());

    dbg!(&res);
    Ok(res?)
}

// #[tauri::command]
// fn connect(connection: State<'_, Connection>) {
//     *connection.0.lock().unwrap() = Some(Client {});
// }

// #[tauri::command]
// fn disconnect(connection: State<'_, Connection>) {
//     // drop the connection
//     *connection.0.lock().unwrap() = None;
// }

// #[tauri::command]
// fn connection_send(connection: State<'_, Connection>) {
//     connection
//         .0
//         .lock()
//         .unwrap()
//         .as_ref()
//         .expect("connection not initialize; use the `connect` command first")
//         .send();
// }

// #[tauri::command]
// async fn setup_interceptor session() -> String {
//     "true".into()
// }

#[tauri::command]
async fn launch_interceptor(session_name: String) -> String {
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
        ));

    if let Err(error) = session_dir {
        return format!(
            r#"{{ "success": false, "error": "{}" }}"#,
            error.to_string()
        );
    };
    // 1. Verificar se a pasta e existe

    dbg!(&session_dir);

    let output = format!("Session name: {}!", session_name);
    tauri::async_runtime::spawn(async move {
        RemoraInterceptor::new()
            .session_name(session_name)
            .launch()
            .await
            .unwrap();
    });

    // dbg!(&app_data_path);
    // let remora_storage = RemoraStorage::new().start_db("some_session.sqlite3").await;

    format!(r#"{{ "success": true }}"#)
}
