use application_models::note::*;
use databases::application_db::connection::AppDatabaseConnection;
use mvp_scaffold::endpoint::Outcome;
use rusqlite::params;
use serde::{Deserialize, Serialize};
use std::convert::{TryFrom, TryInto};
// use tide::Error as TideError;

#[derive(Debug, Serialize, Deserialize)]
pub struct NewNote {
    // Event
    note_content: NoteContent,
    event_id: NoteEventId,
}

// Outcome definition
#[derive(Debug, Serialize)]
pub struct InternalMessage(NoteId);

impl InternalMessage {
    pub fn internal_message(self) -> NoteId {
        self.0
    }
}

impl Outcome for InternalMessage {}

// Inserted rowId from `conn.last_insert_rowid()`
impl TryFrom<i64> for InternalMessage {
    type Error = Box<dyn std::error::Error>;

    fn try_from(value: i64) -> Result<Self, Self::Error> {
        let new_id = value.try_into()?;
        Ok(InternalMessage(new_id))
    }
}

impl InternalMessage {
    pub fn db_save_note(
        db_connection: &AppDatabaseConnection,
        new_note: &NewNote,
    ) -> Result<i64, Box<dyn std::error::Error>> {
        use std::time::{SystemTime, UNIX_EPOCH};
        let conn = db_connection.get()?;
        // let tx = conn.transaction()?;
        // let dt: DateTime<Local> = Local::now();
        let now_epoch: i32 = SystemTime::now()
            .duration_since(UNIX_EPOCH)?
            .as_secs()
            .try_into()?;
        let note_content_b64 = new_note.note_content.get();
        let note_content_vec = base64::decode(note_content_b64)?;
        let note_content: String = String::from_utf8(note_content_vec)?;
        conn.execute(
            "INSERT INTO notes (note_content, event_id, created_at, updated_at) VALUES (?1, ?2, ?3, ?4)",
            params![
                note_content,
                new_note.event_id.get(),
                now_epoch,
                now_epoch
            ],
        )?;

        let last_row_id = conn.last_insert_rowid();

        conn.execute(
            "UPDATE `events` SET note_id = ?1 WHERE id = ?2;",
            params![&last_row_id, new_note.event_id.get(),],
        )?;
        // tx.commit()?;

        Ok(last_row_id)
    }
}
