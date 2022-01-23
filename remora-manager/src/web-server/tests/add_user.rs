#[async_std::test]
pub async fn it_works() {
    use surf::{Body, StatusCode};
    use url::Url;
    // TODO: Use Build Patterns
    // TODO: from env var
    let uri = "http://localhost:8080/api/add_user";
    let uri = Url::parse(uri).unwrap();
    let data = r#"{
        "name": "Charlie Root1 #added",
        "email": "root@example.net",
        "department": 1,
        "permission": 1
}"#
    .to_string();
    // TODO: from json
    let body = Body::from_string(data.clone());
    let res = surf::post(uri).body(body).await.unwrap();
    if res.status() != 200 {
        panic!("{:#?}", data)
    }
    assert_eq!(res.status(), StatusCode::Ok);
}

#[async_std::test]
pub async fn faster_than_2000ms() {
    use std::time::{Duration, Instant};
    use surf::{Body, StatusCode};
    use url::Url;
    // TODO: Use Build Patterns
    let dur_threshold = Duration::from_secs(2);
    // TODO: from env var
    let uri = "http://localhost:8080/api/add_user";
    let uri = Url::parse(uri).unwrap();
    let data = r#"{
        "name": "Charlie Root2 #added",
        "email": "root@example.net",
        "department": 1,
        "permission": 1
}"#
    .to_string();
    // TODO: from json
    let body = Body::from_string(data);
    let stopwatch = Instant::now();
    let res = surf::post(uri).body(body).await.unwrap();
    let elapsed = stopwatch.elapsed();
    assert_eq!(res.status(), StatusCode::Ok);
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
