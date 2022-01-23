use super::{outcome::InternalMessage, UpdateNote};
use crate::error::MvpError;
use databases::application_db::connection::AppDatabaseConnection;
use mvp_scaffold::endpoint::Model;

impl Model<AppDatabaseConnection, String, InternalMessage> for UpdateNote {
    fn model(
        &self,
        db_connection: &AppDatabaseConnection,
        request_body: &String,
    ) -> Result<InternalMessage, Box<dyn std::error::Error>> {
        use super::outcome::ParsedNote;
        use mvp_scaffold::endpoint::Name;

        let parsed_note: ParsedNote = match serde_json::from_str(&request_body) {
            Ok(parsed_note) => parsed_note,
            Err(error) => {
                // * Security: Custom error to verify if system is under attack.
                log::warn!("VIOLATION: Endpoint /{} is under attack!", self.name());
                let error = MvpError::new(error.to_string());
                return Err(Box::new(error));
            }
        };

        let updated_fields = InternalMessage::db_updatenote(db_connection, &parsed_note)?;
        log::info!("User id: {:?} updated!", parsed_note.id());
        Ok(InternalMessage::from(updated_fields))
    }
}
