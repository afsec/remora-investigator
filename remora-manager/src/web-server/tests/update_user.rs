use serde::Deserialize;

#[derive(Debug,Deserialize)]
struct ResponseBody {
    pub updated_fields: u16,
}



#[async_std::test]
pub async fn it_works() {
    use surf::Body;
    use surf::StatusCode;
    use url::Url;
    // TODO: Use Build Patterns
    // TODO: from env var
    let uri = "http://localhost:8080/api/update_user";
    let uri = Url::parse(uri).unwrap();
    let data = r#"{
        "id": 4,
        "name": "Charlie Root #updated",
        "email": "root@example.net",
        "department": 1,
        "permission": 1
}"#
    .to_string();
    // TODO: from json
    let body = Body::from_string(data.clone());
    let mut res = surf::post(uri).body(body).await.unwrap();
    let data: ResponseBody = res.body_json().await.unwrap();
    
    assert_eq!(res.status(), StatusCode::Ok);
    assert!(data.updated_fields == 4);
}

#[async_std::test]
pub async fn faster_than_1000ms() {
    use std::time::{Duration, Instant};
    use surf::Body;
    use url::Url;
    // TODO: Use Build Patterns
    let dur_threshold = Duration::from_secs(1);
    // TODO: from env var
    let uri = "http://localhost:8080/api/update_user";
    let uri = Url::parse(uri).unwrap();
    let data = r#"{
        "id": 5,
        "name": "Charlie Root #updated",
        "email": "root@example.net",
        "department": 1,
        "permission": 1
}"#
    .to_string();
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


