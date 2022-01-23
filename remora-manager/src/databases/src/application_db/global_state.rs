use crate::application_db::connection::AppDatabaseConnection;

#[derive(Debug, Clone)]
pub struct AppGlobalState {
    pub db_connection_app: AppDatabaseConnection,
}
