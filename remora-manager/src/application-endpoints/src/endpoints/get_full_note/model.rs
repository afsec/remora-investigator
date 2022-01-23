use super::{
    outcome::{InternalMessage, QueryNote},
    GetFullNote,
};
use crate::error::MvpError;
use application_models::note::NoteId;
use databases::application_db::connection::AppDatabaseConnection;
use mvp_scaffold::endpoint::Model;

impl Model<AppDatabaseConnection, String, InternalMessage> for GetFullNote {
    fn model(
        &self,
        db_connection: &AppDatabaseConnection,
        request_body: &String,
    ) -> Result<InternalMessage, Box<dyn std::error::Error>> {
        use mvp_scaffold::endpoint::Name;
        let note_id: QueryNote = match serde_json::from_str::<QueryNote>(&request_body) {
            Ok(data) => data,
            Err(error) => {
                // * Security: Custom error to verify if system is under attack.
                log::warn!("VIOLATION: Endpoint /{} is under attack!", self.name());
                let error = MvpError::new(error.to_string());
                return Err(Box::new(error));
            }
        };
        let note_id: &NoteId = note_id.get_id();
        let retrieved_note = InternalMessage::retrieve_note(db_connection, &note_id)?;
        log::info!("Found note id: {}", note_id.get());

        // Ok(InternalMessage::try_from(retrieve_events)?)
        Ok(InternalMessage::new(retrieved_note))
    }
}
