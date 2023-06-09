use anyhow::anyhow;
use sqlx::SqlitePool;

use crate::SESSIONS_DIR;

#[derive(Debug)]
pub struct DbConnection(SqlitePool);
impl DbConnection {
    pub async fn start<T: AsRef<str>>(session_filename: T) -> anyhow::Result<Self> {
        use sqlx::sqlite::{SqliteConnectOptions, SqliteJournalMode, SqlitePoolOptions};
        use std::str::FromStr;
        use std::time::Duration;

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
        // let filename_path_str = filename_path.as_ref();
        // dbg!(&filename_path_str);

        let busy_timeout = Duration::from_secs(2);

        let sqlite_path = match maybe_session_file_path {
            Some(filename_path) => format!("sqlite://{}", filename_path),
            None => return Err(anyhow!("Worng session_filename")),
        };

        dbg!(&sqlite_path);

        let connect_options = SqliteConnectOptions::from_str(sqlite_path.as_str())?
            .busy_timeout(busy_timeout)
            // Why we set to `Delete`: https://www.sqlite.org/pragma.html#pragma_journal_mode
            // > "The DELETE journaling mode is the normal behavior".
            .journal_mode(SqliteJournalMode::Delete)
            .create_if_missing(true);

        let db_conn_pool = match SqlitePoolOptions::new()
            .max_connections(5)
            .connect_with(connect_options.clone())
            .await
        {
            Ok(pool) => pool,
            Err(error) => {
                // TODO
                // panic!("Impossible state reached!")
                dbg!(sqlite_path);
                dbg!(connect_options);
                panic!("{error}");
            }
        };

        // * Bootstraping
        if let Err(bootstrap_error) = Self::db_bootstrap(&db_conn_pool).await {
            return Err(anyhow::Error::from(bootstrap_error));
        }

        Ok(Self(db_conn_pool))
    }
    async fn db_bootstrap(db_conn_pool: &SqlitePool) -> anyhow::Result<()> {
        Self::create_tables(db_conn_pool).await?;
        Ok(())
    }
    async fn create_tables(db_conn_pool: &SqlitePool) -> anyhow::Result<()> {
        // TODO:
        // let _ = sqlx::query(include_str!("../migrations/20211231034234_init.sql"))
        //     .execute(db_conn_pool)
        //     .await?;
        Ok(())
    }
    pub fn take(self) -> SqlitePool {
        self.0
    }
}
