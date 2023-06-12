pub use sea_orm_migration::prelude::*;

mod m20220101_000001_create_table_session_info;
mod m20230612_195555_create_table_requests;

pub struct Migrator;

#[async_trait::async_trait]
impl MigratorTrait for Migrator {
    fn migrations() -> Vec<Box<dyn MigrationTrait>> {
        vec![
            Box::new(m20220101_000001_create_table_session_info::Migration),
            Box::new(m20230612_195555_create_table_requests::Migration),
        ]
    }
}
