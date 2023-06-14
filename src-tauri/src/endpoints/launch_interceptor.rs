use anyhow::anyhow;

use crate::{
    helpers::AppResult, interceptor::RemoraInterceptor, storage::RemoraStorage, REMORA_STORAGE,
    SESSIONS_DIR,
};

#[tauri::command]
pub async fn launch_interceptor(session_name: String) -> String {
    match handler(session_name).await {
        Ok(data) => format!(r#"{{ "success": true, "error": null, "data": "{data}" }}"#),
        Err(error) => format!(r#"{{ "success": false, "error": "{error}", "data": null }}"#),
    }
}

async fn handler(session_name: String) -> AppResult<String> {
    use std::time::SystemTime;

    let now = SystemTime::now().duration_since(SystemTime::UNIX_EPOCH)?;

    let session_name_from_ui = session_name;

    let session_name_str = match session_name_from_ui.chars().nth(1) {
        Some(_) => session_name_from_ui,
        None => "remora-session".to_string(),
    };

    let session_filename = format!("{session_name_str}-{}", now.as_secs());

    let outcome = format!("Session name: {}!", session_name_str);

    check_session_dir()?;

    let remora_storage = start_storage(session_filename).await?;

    let _ = REMORA_STORAGE.set(remora_storage);

    tauri::async_runtime::spawn(async move {
      RemoraInterceptor::new()
            .session_name(session_name_str)
            .build()
            .launch()
            .await
    });

    Ok(outcome)
}

async fn start_storage<T: AsRef<str>>(session_filename: T) -> AppResult<RemoraStorage> {
    let storage = RemoraStorage::new(&session_filename)?.build().await?;
    storage.start_db().await?;
    Ok(storage)
}

fn check_session_dir() -> AppResult<()> {
    use std::ops::Not;
    let session_dir = SESSIONS_DIR
        .get()
        .map(|pathbuf| {
            if pathbuf.is_dir().not() {
                let _ = std::fs::create_dir(pathbuf);
            }
            pathbuf
        })
        .ok_or(anyhow!(
            "IMPOSSIBLE STATE: Session directory is not defined"
        ))?;

    Ok(())
}
