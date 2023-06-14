use anyhow::anyhow;
// use chromiumoxide::cdp::browser_protocol::network::Request;
// use migration::Query;
use serde::{Deserialize, Serialize};

use crate::{helpers::AppResult, REMORA_STORAGE};

#[tauri::command]
pub async fn list_events(filter: Option<String>) -> String {
    match handler(filter).await {
        Ok(data) => format!(r#"{{ "success": true,  "error": null, "data": "{data}" }}"#),
        Err(error) => format!(r#"{{ "success": false, "error": "{error}", "data": null }}"#),
    }
}

async fn handler(filter: Option<String>) -> AppResult<String> {
    use crate::entities::prelude::*;
    use crate::entities::*;
    use base64::{
        alphabet,
        engine::{self, general_purpose},
        Engine as _,
    };
    use sea_orm::*;
    use sea_orm_migration::prelude::*;
    let storage = REMORA_STORAGE
        .get()
        .ok_or(anyhow!("Can't get REMORA_STORAGE"))?;

    // TODO: Replace to sea-orm approach instead
    let outcome: Result<Vec<Event>, _> = Responses::find()
        .from_raw_sql(Statement::from_sql_and_values(
            DbBackend::Sqlite,
            r#"SELECT * FROM responses INNER JOIN requests ON responses.request_id = requests.request_id;"#,
            [],
        ))
        .into_json()
        .all(storage.connection())
        .await?
        .into_iter()
        .map(|value| serde_json::from_value::<Event>(value))
        .collect();

    let json_outcome = serde_json::to_string(&(outcome?))?;

    let b64_outcome = general_purpose::STANDARD.encode(json_outcome);

    Ok(b64_outcome)
}

// Event
#[derive(Debug, Serialize, Deserialize)]
pub struct Event {
    request_id: String,
    request_time: String,
    method: String,
    url: String,
    http_protocol: String,
    response_time: String,
    status_code: u16,
    response_url: String,
    mime_type: String,
}
