use super::{
    outcome::{InternalMessage, QueryEvent},
    GetEventResBody,
};
use crate::error::MvpError;
use application_models::event::EventId;
use databases::application_db::connection::AppDatabaseConnection;
use mvp_scaffold::endpoint::Model;

impl Model<AppDatabaseConnection, String, InternalMessage> for GetEventResBody {
    fn model(
        &self,
        db_connection: &AppDatabaseConnection,
        request_body: &String,
    ) -> Result<InternalMessage, Box<dyn std::error::Error>> {
        use mvp_scaffold::endpoint::Name;
        let query_event: QueryEvent = match serde_json::from_str::<QueryEvent>(&request_body) {
            Ok(data) => data,
            Err(error) => {
                // * Security: Custom error to verify if system is under attack.
                log::warn!("VIOLATION: Endpoint /{} is under attack!", self.name());
                let error = MvpError::new(error.to_string());
                return Err(Box::new(error));
            }
        };
        let event_id: &EventId = query_event.get_id();
        let retrieved_event = InternalMessage::retrieve_event(db_connection, &event_id)?;
        log::info!("Found events id: {:?}", &event_id.get());

        // Ok(InternalMessage::try_from(retrieve_events)?)
        Ok(InternalMessage::new(retrieved_event))
    }
}
