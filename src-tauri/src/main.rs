// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod helpers;
mod interceptor;
mod storage;

use std::cell::RefCell;
use std::path::PathBuf;
use std::{
    collections::HashMap,
    sync::{
        atomic::{AtomicUsize, Ordering},
        Arc, Mutex,
    },
};

use tauri::State;

use crate::helpers::AppResult;
use crate::interceptor::RemoraInterceptor;
use crate::storage::RemoraStorage;

struct Client;

impl Client {
    fn send(&self) {}
}

#[derive(Default)]
struct Connection(Mutex<Option<Client>>);

#[tokio::main]
async fn main() -> AppResult<()> {
    tauri::async_runtime::set(tokio::runtime::Handle::current());

    // let app_data_path: RefCell<Option<PathBuf>> = RefCell::new(Default::default());

    // let mut inner_app_data_path = app_data_path.clone();
    let res = tauri::Builder::default()
        .manage(Connection(Default::default()))
        .invoke_handler(tauri::generate_handler![
            launch_interceptor,
            connect,
            disconnect,
            connection_send
        ])
        .run(tauri::generate_context!());
    dbg!(&res);
    Ok(res?)
}

#[tauri::command]
fn connect(connection: State<'_, Connection>) {
    *connection.0.lock().unwrap() = Some(Client {});
}

#[tauri::command]
fn disconnect(connection: State<'_, Connection>) {
    // drop the connection
    *connection.0.lock().unwrap() = None;
}

#[tauri::command]
fn connection_send(connection: State<'_, Connection>) {
    connection
        .0
        .lock()
        .unwrap()
        .as_ref()
        .expect("connection not initialize; use the `connect` command first")
        .send();
}

// #[tauri::command]
// async fn setup_interceptor session() -> String {
//     "true".into()
// }

#[tauri::command]
async fn launch_interceptor(session_name: String) -> String {
    let output = format!("Session name: {}!", session_name);
    tauri::async_runtime::spawn(async move {
        RemoraInterceptor::new()
            .session_name(session_name)
            .launch()
            .await
            .unwrap();
    });
    // .setup(move |app| {
    //     dbg!(&inner_app_data_path);
    //     let inner = inner_app_data_path.get_mut();
    //     *inner = app.path_resolver().app_data_dir();
    //     dbg!(&inner);
    //     Ok(())
    //   });

    // dbg!(&app_data_path);
    let remora_storage = RemoraStorage::new().start_db("some_session.sqlite3").await;

    "true".into()
}
