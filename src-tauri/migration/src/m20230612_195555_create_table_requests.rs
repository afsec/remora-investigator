use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Requests::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(Requests::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(
                        ColumnDef::new(Requests::RequestId)
                            .string()
                            .unique_key()
                            .not_null(),
                    )
                    .col(ColumnDef::new(Requests::Method).string().not_null())
                    .col(ColumnDef::new(Requests::RequestTime).date_time().not_null())
                    .col(ColumnDef::new(Requests::Url).string().not_null())
                    .index(
                        Index::create()
                            .unique()
                            .name("request-id-idx")
                            .col(Requests::RequestId),
                    )
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Requests::Table).to_owned())
            .await
    }
}

/// Learn more at https://docs.rs/sea-query#iden
#[derive(Iden)]
enum Requests {
    Table,
    Id,
    RequestId,
    Method,
    RequestTime,
    Url,
}
