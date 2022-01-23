use async_std::task;
// use criterion::{black_box, criterion_group, criterion_main, Criterion};
use criterion::{criterion_group, criterion_main, Criterion};

// fn fibonacci(n: u64) -> u64 {
//     match n {
//         0 => 1,
//         1 => 1,
//         n => fibonacci(n - 1) + fibonacci(n - 2),
//     }
// }

// fn criterion_benchmark(c: &mut Criterion) {
//     task::block_on(||{
//         c.bench_function("fib 20", |b| b.iter(|| fibonacci(black_box(20))));
//     });

// }

pub fn it_works() {
    use surf::{Body, StatusCode};
    use url::Url;
    // TODO: Use Build Patterns
    // TODO: from env var
    task::block_on(async {
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
    });
}

fn criterion_benchmark(c: &mut Criterion) {
    c.bench_function("add_user", |b| b.iter(|| it_works()));
}

criterion_group!(benches, criterion_benchmark);
criterion_main!(benches);

// pub async fn faster_than_2000ms() {
//     use std::time::{Duration, Instant};
//     use surf::{Body, StatusCode};
//     use url::Url;
//     // TODO: Use Build Patterns
//     let dur_threshold = Duration::from_secs(2);
//     // TODO: from env var
//     let uri = "http://localhost:8080/api/add_user";
//     let uri = Url::parse(uri).unwrap();
//     let data = r#"{
//         "name": "Charlie Root2 #added",
//         "email": "root@example.net",
//         "department": 1,
//         "permission": 1
// }"#
//     .to_string();
//     // TODO: from json
//     let body = Body::from_string(data);
//     let stopwatch = Instant::now();
//     let res = surf::post(uri).body(body).await.unwrap();
//     let elapsed = stopwatch.elapsed();
//     assert_eq!(res.status(), StatusCode::Ok);
//     assert!(elapsed < dur_threshold);
// }
