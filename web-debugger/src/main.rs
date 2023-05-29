use interceptor::Interceptor;

mod interceptor;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    Interceptor::launch().await?;
    Ok(())
}
