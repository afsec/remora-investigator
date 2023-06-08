// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod helpers;
mod interceptor;
mod storage;

use std::cell::RefCell;
use std::path::PathBuf;
use std::rc::Rc;
use std::{
    collections::HashMap,
    sync::{
        atomic::{AtomicUsize, Ordering},
        Arc, Mutex,
    },
};

const MY_APP_DIR: &'static str = "/home/user/.local/share/com.github.afsec.remora";
const MY_SESSION_FILES_DIR: &'static str = "/session_files/session_name.sqlite3";

use anyhow::anyhow;
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
    // tauri::Builder::default()
    //     .run(tauri::generate_context!())
    //     .expect("error while running tauri application");

    // Ok(())
    tauri::async_runtime::set(tokio::runtime::Handle::current());

    let app_data_path: Arc<Mutex<Option<PathBuf>>> = Arc::new(Mutex::new(Default::default()));

    let arc_rw_data_path = app_data_path.clone();
    // let mut inner_app_data_path = app_data_path.clone();
    let tauri = tauri::Builder::default().setup(move |app| {
        // mutex_rw_data_path
        //     .lock()
        //     .map(|mut v| {
        //         let maybe_data_path = app.path_resolver().app_data_dir();
        //         dbg!(&maybe_data_path);
        //         *v = maybe_data_path;
        //     })
        //     .unwrap();
        // dbg!(&mutex_rw_data_path);
        // drop(mutex_rw_data_path);
        let app_data_dir = app.path_resolver().app_data_dir();
        dbg!(&app_data_dir);

        let mutex_guard_rw = arc_rw_data_path.lock();
        match mutex_guard_rw {
            Ok(mut mtx_guard) => *mtx_guard = app_data_dir,
            Err(err) => {
                dbg!(err);
            }
        };

        Ok(())
    });
    std::thread::sleep(std::time::Duration::from_secs(2));
    let mutex_ro_data_path = app_data_path.clone();
    let maybe_data_path = mutex_ro_data_path.lock().map_err(|err| anyhow!("{err}"))?;

    dbg!(&maybe_data_path);

    let res = tauri
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

    // dbg!(&app_data_path);
    let remora_storage = RemoraStorage::new().start_db("some_session.sqlite3").await;

    "true".into()
}
