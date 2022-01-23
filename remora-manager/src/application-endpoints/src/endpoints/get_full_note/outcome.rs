use rusqlite::params;
use serde::{Deserialize, Serialize};

use application_models::{event::EventId, note::*};
use databases::application_db::connection::AppDatabaseConnection;
use mvp_scaffold::endpoint::Outcome;

// Serde struct - BEGIN
#[derive(Debug, Deserialize)]
pub struct QueryNote {
    id: NoteId,
}

impl QueryNote {
    pub fn get_id(&self) -> &NoteId {
        &self.id
    }
}

// Serde struct - END

#[derive(Debug, Serialize, Deserialize)]
pub struct Note {
    pub id: NoteId,
    pub note_content: NoteContent,
    pub event_id: EventId,
    pub created_at: NoteCreatedAt,
    pub updated_at: NoteUpdatedAt,
}

// Outcome definition
#[derive(Debug, Serialize)]
pub struct InternalMessage(Note);
impl Outcome for InternalMessage {}

impl InternalMessage {
    pub fn new(data: Note) -> Self {
        Self(data)
    }
    pub fn retrieve_note(
        db_connection: &AppDatabaseConnection,
        note_id: &NoteId,
    ) -> Result<Note, Box<dyn std::error::Error>> {
        let conn = db_connection.get()?;
        let query = [
            "SELECT",
            " id, note_content, event_id, created_at",
            ", updated_at FROM `notes`",
            " WHERE `id` = ?1;",
        ]
        .concat();

        let mut stmt = conn.prepare(query.as_str())?;
        log::debug!("{:?}", stmt);

        let retrieved_note = stmt.query_row(params![note_id.get()], |row| {
            Ok(Note {
                id: convert_error_from_result_note(NoteId::new(row.get(0)?))?,
                note_content: convert_error_from_result_note(NoteContent::new(row.get(1)?))?,
                event_id: EventId::new(row.get(2)?),
                created_at: convert_error_from_result_note(NoteCreatedAt::new(row.get(3)?))?,
                updated_at: convert_error_from_result_note(NoteUpdatedAt::new(row.get(4)?))?,
            })
        })?;

        Ok(retrieved_note)
    }
}
