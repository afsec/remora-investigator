use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Responses::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(Responses::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(
                        ColumnDef::new(Responses::RequestId)
                            .string()
                            .unique_key()
                            .not_null(),
                    )
                    .col(ColumnDef::new(Responses::HttpProtocol).string().not_null())
                    .col(ColumnDef::new(Responses::ResponseTime).string().not_null())
                    .col(ColumnDef::new(Responses::StatusCode).integer().not_null())
                    .col(ColumnDef::new(Responses::ResponseUrl).string().not_null())
                    .col(ColumnDef::new(Responses::MimeType).string().not_null())
                    .index(
                        Index::create()
                            .unique()
                            .name("request-id-idx")
                            .col(Responses::RequestId),
                    )
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Responses::Table).to_owned())
            .await
    }
}

/// Learn more at https://docs.rs/sea-query#iden
#[derive(Iden)]
enum Responses {
    Table,
    Id,
    RequestId,
    HttpProtocol,
    ResponseTime,
    StatusCode,
    ResponseUrl,
    MimeType,
}
