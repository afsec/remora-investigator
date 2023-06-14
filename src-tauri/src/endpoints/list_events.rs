use anyhow::anyhow;
use chromiumoxide::cdp::browser_protocol::network::Request;
use migration::Query;

use crate::{helpers::AppResult, REMORA_STORAGE};

#[tauri::command]
pub async fn list_events(filter: Option<String>) -> String {
    match handler(filter).await {
        Ok(data) => format!(r#"{{ "success": true, "data": {data} }}"#),
        Err(error) => format!(r#"{{ "success": false, "error":  {error} }}"#),
    }
}

async fn handler(filter: Option<String>) -> AppResult<String> {
    use crate::entities::prelude::*;
    use crate::entities::*;
    use sea_orm::*;
    use sea_orm_migration::prelude::*;
    let storage = REMORA_STORAGE
        .get()
        .ok_or(anyhow!("Can't get REMORA_STORAGE"))?;

    // TODO: Replace to sea-orm approach instead
    let outcome = Responses::find()
        .from_raw_sql(Statement::from_sql_and_values(
            DbBackend::Sqlite,
            r#"SELECT * FROM responses INNER JOIN requests ON responses.request_id = requests.request_id;"#,
            [1.into()],
        ))
        .into_json()
        .all(storage.connection())
        
        .await?;

    dbg!(&outcome);

    // Ok(res.last_insert_id)
    Ok("null".into())
}
