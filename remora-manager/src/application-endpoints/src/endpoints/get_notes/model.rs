use super::{
    outcome::{InternalMessage, Paging},
    GetNotes,
};
use crate::error::MvpError;
use databases::application_db::connection::AppDatabaseConnection;
use mvp_scaffold::endpoint::Model;

impl Model<AppDatabaseConnection, String, InternalMessage> for GetNotes {
    fn model(
        &self,
        db_connection: &AppDatabaseConnection,
        request_body: &String,
    ) -> Result<InternalMessage, Box<dyn std::error::Error>> {
        use mvp_scaffold::endpoint::Name;
        use std::convert::TryFrom;

        let paging: Paging = match serde_json::from_str(&request_body) {
            Ok(paging_settings) => paging_settings,
            Err(error) => {
                // * Security: Custom error to verify if system is under attack.
                log::warn!("VIOLATION: Endpoint /{} is under attack!", self.name());
                let error = MvpError::new(error.to_string());
                return Err(Box::new(error));
            }
        };
        let retrieved_notes = InternalMessage::retrieve_notes(db_connection, paging)?;
        log::info!("Found [{}] notes!", retrieved_notes.len());
        Ok(InternalMessage::try_from(retrieved_notes)?)
    }
}
