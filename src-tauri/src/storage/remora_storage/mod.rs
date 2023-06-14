use anyhow::anyhow;
use sea_orm::{Database, DatabaseConnection};

use crate::AppResult;
use crate::SESSIONS_DIR;

#[derive(Debug, Default)]
pub struct RemoraStorage {
    uri: String,
    connection: DatabaseConnection,
}

pub struct RemoraStorageBuilderWithU {
    uri: String,
}

impl RemoraStorageBuilderWithU {
    pub async fn build(self) -> AppResult<RemoraStorage> {
        let Self { uri } = self;
        let connection: DatabaseConnection = Database::connect(&uri).await?;

        Ok(RemoraStorage { uri, connection })
    }
}

impl RemoraStorage {
    pub fn new<T: AsRef<str>>(session_filename: T) -> AppResult<RemoraStorageBuilderWithU> {
        let mut session_file_path = SESSIONS_DIR
            .get()
            .ok_or(anyhow!("sessions directory not defined"))?
            .clone();

        session_file_path.push(session_filename.as_ref());
        session_file_path.set_extension("sqlite3");

        let maybe_session_file_path = session_file_path
            .to_str()
            .map(|path_str| path_str.to_string());

        let database_uri = match maybe_session_file_path {
            Some(filename_path) => format!("sqlite://{}?mode=rwc", filename_path),
            None => return Err(anyhow!("Wrong session_filename")),
        };

        Ok(RemoraStorageBuilderWithU { uri: database_uri })
    }
    pub async fn start_db(&self) -> AppResult<()> {
        let _ = &self.db_bootstrap().await?;
        Ok(())
    }

    async fn db_bootstrap(&self) -> AppResult<()> {
        let _ = &self.create_tables().await?;
        Ok(())
    }
    async fn create_tables(&self) -> AppResult<()> {
        use migration::Migrator;
        use sea_orm_migration::prelude::*;
        let schema_manager = SchemaManager::new(&self.connection);
        Migrator::refresh(&self.connection).await?;
        assert!(schema_manager.has_table("session").await?);
        assert!(schema_manager.has_table("requests").await?);
        assert!(schema_manager.has_table("responses").await?);
        Ok(())
    }

    pub fn uri(&self) -> &str {
        self.uri.as_ref()
    }

    pub fn connection(&self) -> &DatabaseConnection {
        &self.connection
    }
}
