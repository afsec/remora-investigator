use super::{CreateNote, outcome::InternalMessage};
use crate::error::MvpError;
use databases::application_db::connection::AppDatabaseConnection;
use mvp_scaffold::endpoint::Model;

impl Model<AppDatabaseConnection, String, InternalMessage> for CreateNote {
    fn model(
        &self,
        db_connection: &AppDatabaseConnection,
        request_body: &String,
    ) -> Result<InternalMessage, Box<dyn std::error::Error>> {
        use super::outcome::NewNote;
        use mvp_scaffold::endpoint::Name;
        use std::convert::TryFrom;

        let new_note: NewNote = match serde_json::from_str(&request_body) {
            Ok(data) => data,
            Err(error) => {
                // * Security: Custom error to verify if system is under attack.
                log::warn!("VIOLATION: Endpoint /{} is under attack!", self.name());
                println!("{}",request_body);
                let error = MvpError::new(error.to_string());
                return Err(Box::new(error));
            }
        };

        let last_rowid = InternalMessage::db_save_note(db_connection, &new_note)?;
        log::info!("Note created with id: {:?}", &last_rowid);
        Ok(InternalMessage::try_from(last_rowid)?)
    }
}
