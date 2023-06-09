mod connection;

use sea_orm::DatabaseConnection;

use self::connection::DbConnection;

// use sqlx::SqlitePool;

#[derive(Debug, Default)]
pub struct RemoraStorage;

impl RemoraStorage {
    pub fn new() -> Self {
        Default::default()
    }
    pub async fn start_db<T: AsRef<str>>(
        self,
        session_filename: T,
    ) -> anyhow::Result<DatabaseConnection> {
        let db_connection = DbConnection::start(session_filename).await?;
        let pool = db_connection.take();
        Ok(pool)
    }
}

// pub fn add(left: usize, right: usize) -> usize {
//     left + right
// }

// #[cfg(test)]
// mod tests {
//     use super::*;

//     #[test]
//     fn it_works() {
//         let result = add(2, 2);
//         assert_eq!(result, 4);
//     }
// }
