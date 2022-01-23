use application_models::note::*;
use databases::application_db::connection::AppDatabaseConnection;
use mvp_scaffold::endpoint::Outcome;
use rusqlite::params;
use serde::{Deserialize, Serialize};
use std::convert::TryFrom;

// Serde struct - BEGIN
#[derive(Debug, Deserialize)]
pub struct Paging {
    #[serde(default)]
    limit: PagingLimit,
    #[serde(default)]
    offset: PagingOffset,
}

#[derive(Debug, Deserialize)]
pub struct PagingLimit(u16);
impl Default for PagingLimit {
    fn default() -> Self {
        PagingLimit(20)
    }
}
impl PagingLimit {
    fn get(&self) -> u16 {
        self.0
    }
}

#[derive(Debug, Deserialize)]
pub struct PagingOffset(u16);
impl Default for PagingOffset {
    fn default() -> Self {
        PagingOffset(0)
    }
}
impl PagingOffset {
    fn get(&self) -> u16 {
        self.0
    }
}
// Serde struct - END

#[derive(Debug, Serialize, Deserialize)]
pub struct Note {
    pub id: NoteId,
    pub note_content: NoteContent,
    pub event_id: NoteEventId,
    pub created_at: NoteCreatedAt,
    pub updated_at: NoteUpdatedAt,
}

// Outcome definition
#[derive(Debug, Serialize)]
pub struct InternalMessage(Vec<Note>);
impl Outcome for InternalMessage {}

impl TryFrom<Vec<Note>> for InternalMessage {
    type Error = Box<dyn std::error::Error>;

    fn try_from(data: Vec<Note>) -> Result<Self, Self::Error> {
        Ok(InternalMessage(data))
    }
}

impl InternalMessage {
    pub fn retrieve_notes(
        db_connection: &AppDatabaseConnection,
        paging: Paging,
    ) -> Result<Vec<Note>, Box<dyn std::error::Error>> {
        let conn = db_connection.get()?;
        let mut stmt = conn.prepare(
            "SELECT id, note_content, event_id, created_at, updated_at FROM `notes` LIMIT ?1 OFFSET ?2;",
        )?;
        let retrieved_notes =
            stmt.query_map(params![paging.limit.get(), paging.offset.get()], |row| {
                Ok(Note {
                    id: convert_error_from_result_note(NoteId::new(row.get(0)?))?,
                    note_content: convert_error_from_result_note(NoteContent::new(row.get(1)?))?,
                    event_id: NoteEventId::new(row.get(2)?),
                    created_at: convert_error_from_result_note(NoteCreatedAt::new(row.get(3)?))?,
                    updated_at: convert_error_from_result_note(NoteUpdatedAt::new(row.get(4)?))?,
                })
            })?;

        let notes: Vec<Note> = retrieved_notes
            .filter_map(|row| match row {
                Ok(data) => Some(data),
                Err(error) => {
                    log::error!("DB: {}", error.to_string());
                    None
                }
            })
            .collect();

        Ok(notes)
    }
}
