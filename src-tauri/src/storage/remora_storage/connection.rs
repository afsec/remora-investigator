use sqlx::{ConnectOptions, SqlitePool};

#[derive(Debug)]
pub struct DbConnection(SqlitePool);
impl DbConnection {
    pub async fn start<T: AsRef<str>>(filename_path: T) -> anyhow::Result<Self> {
        use sqlx::sqlite::{SqliteConnectOptions, SqliteJournalMode, SqlitePoolOptions};
        use std::str::FromStr;
        use std::time::Duration;

        let filename_path_str = filename_path.as_ref();

        let busy_timeout = Duration::from_secs(2);

        let sqlite_path = if filename_path_str == ":memory:" {
            format!("sqlite:{}", filename_path_str)
        } else {
            format!("sqlite://{}", filename_path_str)
        };

        let mut connect_options = SqliteConnectOptions::from_str(sqlite_path.as_str())?
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
