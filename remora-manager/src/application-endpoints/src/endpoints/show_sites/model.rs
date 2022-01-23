use super::{
    outcome::{InternalMessage, Paging},
    ShowSites,
};
use crate::error::MvpError;
use databases::application_db::connection::AppDatabaseConnection;
use mvp_scaffold::endpoint::Model;

impl Model<AppDatabaseConnection, String, InternalMessage> for ShowSites {
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
        let events_summary = InternalMessage::events_summary(db_connection, paging)?;
        log::info!("Found [{}] events!", events_summary.get_total_events());
        Ok(InternalMessage::try_from(events_summary)?)
    }
}
