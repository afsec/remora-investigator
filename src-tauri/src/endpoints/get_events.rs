use anyhow::anyhow;

use crate::{helpers::AppResult, REMORA_STORAGE};

#[tauri::command]
pub async fn get_events(filter: Option<String>) -> String {
    match handler(filter).await {
        Ok(data) => format!(r#"{{ "success": true, "data": {data} }}"#),
        Err(error) => format!(r#"{{ "success": false, "error":  {error} }}"#),
    }
}

async fn handler(filter: Option<String>) -> AppResult<String> {
    let filter_from_ui = filter;
    let outcome = "null".into();
    Ok(outcome)
}
