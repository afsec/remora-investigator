#[async_std::test]
pub async fn it_works() {
    use surf::Body;
    use surf::StatusCode;
    use url::Url;
    // TODO: Use Build Patterns
    // TODO: from env var
    let uri = "http://localhost:8080/api/show_users";
    let uri = Url::parse(uri).unwrap();
    let data = format!("{{}}");
    // TODO: from json
    let body = Body::from_string(data.clone());
    let res = surf::post(uri).body(body).await.unwrap();
    assert_eq!(res.status(), StatusCode::Ok);
}

#[async_std::test]
pub async fn faster_than_500ms() {
    use std::time::{Duration, Instant};
    use surf::Body;
    use url::Url;
    // TODO: Use Build Patterns
    let dur_threshold = Duration::from_millis(500);
    // TODO: from env var
    let uri = "http://localhost:8080/api/show_users";
    let uri = Url::parse(uri).unwrap();
    let data = format!("{{}}");
    // TODO: from json
    let body = Body::from_string(data.clone());
    let stopwatch = Instant::now();
    let res = surf::post(uri).body(body).await.unwrap();
    let elapsed = stopwatch.elapsed();
    drop(res);
    assert!(elapsed < dur_threshold);
}


// #[derive(Debug)]
// struct InternalError(String);

// impl std::fmt::Display for InternalError {
//     fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
//         write!(f, "{}", self.0)
//     }
// }

// impl std::error::Error for InternalError {}
