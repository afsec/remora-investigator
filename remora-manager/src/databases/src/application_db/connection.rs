use mvp_scaffold::endpoint::EndpointDbConnection;

pub type SqlitePool = r2d2::Pool<r2d2_sqlite::SqliteConnectionManager>;
pub type SqlitePooledConnection = r2d2::PooledConnection<r2d2_sqlite::SqliteConnectionManager>;

pub struct AppDatabaseConnectionPreload(SqlitePool);

pub struct AppDatabaseConnectionBoostrapped(SqlitePool);
impl AppDatabaseConnectionBoostrapped {
    pub fn get(&self) -> Result<SqlitePooledConnection, r2d2::Error> {
        self.0.get()
    }
    pub fn build(self) -> AppDatabaseConnection {
        AppDatabaseConnection::from(self)
    }
}

impl From<AppDatabaseConnectionPreload> for AppDatabaseConnectionBoostrapped {
    fn from(preload: AppDatabaseConnectionPreload) -> Self {
        Self(preload.0)
    }
}

#[derive(Debug, Clone)]
pub struct AppDatabaseConnection(SqlitePool);

impl From<AppDatabaseConnectionBoostrapped> for AppDatabaseConnection {
    fn from(preload: AppDatabaseConnectionBoostrapped) -> Self {
        Self(preload.0)
    }
}

impl EndpointDbConnection for AppDatabaseConnection {}

impl AppDatabaseConnectionPreload {
    pub fn bootstrap(
        self,
        database_filename: &str,
    ) -> Result<AppDatabaseConnectionBoostrapped, DbError> {
        use std::time::Duration;
        log::info!("DbConnection [{}]: Bootstraping", database_filename);
        let app_database_conn = AppDatabaseConnectionBoostrapped::from(self);
        let conn = app_database_conn.get()?;
        conn.busy_timeout(Duration::from_secs(5))?;
        // conn.execute_batch("PRAGMA journal_mode=WAL")?;
        conn.execute_batch("PRAGMA foreign_keys=ON")?;

        if let Err(error) = conn.execute_batch("SELECT COUNT(*) from `events`") {
            log::warn!("{}", error);
            log::warn!("Creating tables `events`");
            conn.execute_batch(
                r#"
        CREATE TABLE `events` (
            "id"                        INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
            "security_state"            TEXT,
            "destination_port"          INTEGER,
            "server_ip_address"         TEXT,
            "started_datetime"          TEXT,
            "rtt"                       INTEGER,
            "request_method"            TEXT,
            "request_url"               TEXT,
            "request_http_version"      TEXT,
            "request_query_string"      TEXT,
            "request_headers_size"      INTEGER,
            "request_headers"           TEXT,
            "request_cookies"           TEXT,
            "request_body_size"         INTEGER,
            "request_postdata_mimetype" TEXT,
            "request_postdata_params"   TEXT,
            "request_postdata_text"     TEXT,
            "response_http_version"     TEXT,
            "response_status_code"      INTEGER,
            "response_headers_size"     INTEGER,
            "response_headers"          TEXT,
            "response_redirect_url"     TEXT,
            "response_cookies"          TEXT,
            "response_content_mimetype" TEXT,
            "response_content_size"     INTEGER,
            "response_body_size"        INTEGER,
            "response_body_encoding"    TEXT,
            "response_body_content"     TEXT,
            "note_id"                   INTEGER UNIQUE,
            FOREIGN KEY(note_id) REFERENCES notes(id)

        );
        "#,
            )?;
        }
        if let Err(error) = conn.execute_batch("SELECT COUNT(*) from `notes`") {
            log::warn!("{}", error);
            log::warn!("Creating tables `notes`");
            conn.execute_batch(
                r#"
        CREATE TABLE `notes` (
            "id"                        INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
            "event_id"                  INTEGER NOT NULL UNIQUE,
            "note_content"              TEXT NOT NULL,
            "created_at"                INTEGER NOT NULL,
            "updated_at"                INTEGER NOT NULL,
            FOREIGN KEY(event_id) REFERENCES events(id)
        );
        "#,
            )?;
        }
        assert!(conn.is_autocommit());
        log::info!("DbConnection [{}]: Bootstraped", database_filename);
        Ok(app_database_conn)
    }
}

impl AppDatabaseConnection {
    pub fn new_file(database_filename: &str) -> Result<AppDatabaseConnectionPreload, DbError> {
        const MAX_THREADS: u32 = 1;
        let database_mode = get_db_mode();
        log::info!(
            "DbConnection [{}]: MODE ({}) Initializing",
            database_filename,
            database_mode
        );
        let manager =
            r2d2_sqlite::SqliteConnectionManager::file(&database_filename).with_init(|c| {
                // c.execute_batch("PRAGMA journal_mode=WAL")?;
                c.execute_batch("PRAGMA foreign_keys=ON;")
            });
        // let manager = r2d2_sqlite::SqliteConnectionManager::memory();
        let db_conn = AppDatabaseConnectionPreload(
            r2d2::Pool::builder().max_size(MAX_THREADS).build(manager)?,
        );
        log::info!(
            "DbConnection [{}]: MODE ({}) Connected",
            database_filename,
            database_mode
        );
        Ok(db_conn)
    }

    pub fn open_file(database_filename: &str) -> Result<AppDatabaseConnectionPreload, DbError> {
        const MAX_THREADS: u32 = 1;
        let database_mode = get_db_mode();
        log::info!(
            "DbConnection [{}]: MODE ({}) Initializing",
            database_filename,
            database_mode
        );
        let manager =
            r2d2_sqlite::SqliteConnectionManager::file(&database_filename).with_init(|c| {
                // c.execute_batch("PRAGMA journal_mode=WAL")?; // TODO
                c.execute_batch("PRAGMA foreign_keys=ON;")
            });
        // let manager = r2d2_sqlite::SqliteConnectionManager::memory();
        let db_conn = AppDatabaseConnectionPreload(
            r2d2::Pool::builder().max_size(MAX_THREADS).build(manager)?,
        );
        log::info!(
            "DbConnection [{}]: MODE ({}) Connected",
            database_filename,
            database_mode
        );
        Ok(db_conn)
    }

    pub fn get(&self) -> Result<SqlitePooledConnection, r2d2::Error> {
        self.0.get()
    }
}

#[derive(Debug)]
pub struct DbError(String);

impl std::fmt::Display for DbError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.0)
    }
}

impl std::error::Error for DbError {}

impl From<r2d2::Error> for DbError {
    fn from(error: r2d2::Error) -> Self {
        DbError(error.to_string())
    }
}

impl From<rusqlite::Error> for DbError {
    fn from(error: rusqlite::Error) -> Self {
        DbError(error.to_string())
    }
}

impl DbError {
    pub fn get(self) -> String {
        self.0
    }
}

fn get_db_mode() -> String {
    let module_path = module_path!();
    let module_path_vec: Vec<&str> = module_path.split("::").collect();
    let pos = module_path_vec.len() - 2;

    // module_path_vec.last().unwrap().to_string()
    module_path_vec.get(pos).unwrap().to_string()
}
