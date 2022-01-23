use r2d2::PooledConnection;
use r2d2_sqlite::SqliteConnectionManager;
use rusqlite::params;
use serde::{
    de::{self},
    Deserialize, Deserializer, Serialize,
};
use std::convert::TryInto;
use std::fmt;

use crate::error::MvpError;
use application_models::note::*;
use databases::application_db::connection::AppDatabaseConnection;
use mvp_scaffold::endpoint::Outcome;

type SqlitePool = PooledConnection<SqliteConnectionManager>;

#[derive(Debug, Deserialize)]
pub struct ParsedNote {
    id: NoteId,
    #[serde(deserialize_with = "deserialize_note_content")]
    note_content: NoteContent,
}
impl ParsedNote {
    pub fn id(&self) -> &NoteId {
        &self.id
    }
    pub fn note_content(&self) -> &NoteContent {
        &self.note_content
    }
}

// * Helper struct
struct DeserializeNoteContentVisitor;

impl<'de> de::Visitor<'de> for DeserializeNoteContentVisitor {
    type Value = NoteContent;

    fn expecting(&self, formatter: &mut fmt::Formatter) -> fmt::Result {
        formatter.write_str(Self::Value::expect_msg())
    }

    fn visit_str<E>(self, v: &str) -> Result<Self::Value, E>
    where
        E: de::Error,
    {
        // dbg!(&v);
        let note_content = match Self::Value::new(v.to_string()) {
            Ok(data) => data,
            Err(_) => return Err(E::invalid_length(v.len(), &self)),
        };
        Ok(note_content)
    }
}

pub fn deserialize_note_content<'de, D>(deserializer: D) -> Result<NoteContent, D::Error>
where
    D: Deserializer<'de>,
{
    deserializer.deserialize_any(DeserializeNoteContentVisitor)
}

// * Outcome definition
#[derive(Debug, Serialize, Default)]
pub struct InternalMessage {
    updated_fields: u8,
}

impl From<u8> for InternalMessage {
    fn from(data: u8) -> Self {
        InternalMessage {
            updated_fields: data,
        }
    }
}
impl Outcome for InternalMessage {}

impl InternalMessage {
    pub fn db_updatenote(
        db_connection: &AppDatabaseConnection,
        parsed_note: &ParsedNote,
    ) -> Result<u8, Box<dyn std::error::Error>> {
        use std::time::{SystemTime, UNIX_EPOCH};
        let conn = db_connection.get()?;
        let id = parsed_note.id().get();
        let mut affected_fields: u8 = 0;

        // let tx = conn.transaction()?;
        // * Check if user exists
        if db_check_note(&conn, id)? > 0 {
            let id = parsed_note.id().get();
            let note_content_b64 = parsed_note.note_content().get();
            let note_content_vec = base64::decode(note_content_b64)?;
            let note_content: String = String::from_utf8(note_content_vec)?;
            let now_epoch: i32 = SystemTime::now()
                .duration_since(UNIX_EPOCH)?
                .as_secs()
                .try_into()?;
            log::debug!(
                "Updating field: id = {} note_content = {} updated_at = {}",
                id,
                &note_content,
                now_epoch
            );

            let mut stmt = conn
                .prepare("UPDATE `notes` SET note_content = ?2, updated_at = ?3 WHERE id = ?1;")?;
            stmt.execute(params![id, note_content, now_epoch])?;
            match stmt.expanded_sql() {
                Some(query) => log::debug!("QUERY: {}", query),
                None => log::error!("QUERY: None"),
            };
            affected_fields += 1;

            // tx.commit()?;
            Ok(affected_fields)
        } else {
            // tx.commit()?;
            // * Security: Custom error to verify if system is under attack.
            let msg = format!("Note id [{}] not found!", parsed_note.id().get());
            let error = MvpError::new(msg);
            return Err(Box::new(error));
        }
    }
}

fn db_check_note(conn: &SqlitePool, id: u16) -> Result<u16, Box<dyn std::error::Error>> {
    let mut stmt = conn.prepare("SELECT COUNT(*) FROM `notes` WHERE id = ?1;")?;
    Ok(stmt.query_row(params![id], |r| r.get::<_, u16>(0))?)
}
