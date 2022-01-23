use super::{
    outcome::{EventsFound, EventsResponse, InternalMessage, Paging, PagingOffset},
    ShowEvents,
};
use crate::error::MvpError;
use databases::application_db::connection::AppDatabaseConnection;
use mvp_scaffold::endpoint::Model;

impl Model<AppDatabaseConnection, String, InternalMessage> for ShowEvents {
    fn model(
        &self,
        db_connection: &AppDatabaseConnection,
        request_body: &String,
    ) -> Result<InternalMessage, Box<dyn std::error::Error>> {
        use mvp_scaffold::endpoint::Name;
        // use std::convert::TryFrom;

        let paging: Paging = match serde_json::from_str(&request_body) {
            Ok(paging_settings) => paging_settings,
            Err(error) => {
                // * Security: Custom error to verify if system is under attack.
                log::warn!("VIOLATION: Endpoint /{} is under attack!", self.name());
                let error = MvpError::new(error.to_string());
                return Err(Box::new(error));
            }
        };
        let events_found: EventsFound = InternalMessage::count_events(db_connection, &paging)?;
        let retrieved_events = InternalMessage::retrieve_events(db_connection, &paging)?;
        log::info!("Found [{}] events!", retrieved_events.len());
        let offset = paging.get_offset().get();
        let response_body = EventsResponse {
            events_found,
            offset: PagingOffset::new(offset),
            events: retrieved_events,
        };
        // Ok(InternalMessage::try_from(retrieve_events)?)
        Ok(InternalMessage::new(response_body))
    }
}
