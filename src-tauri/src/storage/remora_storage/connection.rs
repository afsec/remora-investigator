use anyhow::anyhow;

use sea_orm::{Database, DatabaseConnection};

use crate::SESSIONS_DIR;

#[derive(Debug)]
pub struct DbConnection(DatabaseConnection);
impl DbConnection {
    pub async fn start<T: AsRef<str>>(session_filename: T) -> anyhow::Result<Self> {
        // TODO get path from static
        let maybe_session_file_path = SESSIONS_DIR
            .get()
            .map(|pathbuf| {
                let mut inner_pathbuf = pathbuf.clone();
                inner_pathbuf.push(session_filename.as_ref());
                inner_pathbuf.set_extension("sqlite3");
                inner_pathbuf.to_str().map(|path_str| path_str.to_string())
            })
            .flatten();

        let sqlite_path = match maybe_session_file_path {
            Some(filename_path) => format!("sqlite://{}?mode=rwc", filename_path),
            None => return Err(anyhow!("Wrong session_filename")),
        };

        dbg!(&sqlite_path);

        let db_connection: DatabaseConnection = Database::connect(sqlite_path).await?;

        dbg!(&db_connection);

        // * Bootstraping
        // if let Err(bootstrap_error) = Self::db_bootstrap(&db_connection).await {
        //     return Err(anyhow::Error::from(bootstrap_error));
        // }

        Ok(Self(db_connection))
    }
    async fn db_bootstrap(db_conn_pool: &DatabaseConnection) -> anyhow::Result<()> {
        Self::create_tables(db_conn_pool).await?;
        Ok(())
    }
    async fn create_tables(db_conn_pool: &DatabaseConnection) -> anyhow::Result<()> {
        // TODO:
        // let _ = sqlx::query(include_str!("../migrations/20211231034234_init.sql"))
        //     .execute(db_conn_pool)
        //     .await?;
        Ok(())
    }
    pub fn take(self) -> DatabaseConnection {
        self.0
    }
}
