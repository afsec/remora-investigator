use std::sync::Arc;

use crate::AppResult;
use sha2::Digest;
use tokio::sync::{Mutex, RwLock};
use ulid::Generator;

pub type OidPool = Arc<RwLock<ObjectIdReactor>>;

pub struct ObjectIdReactor {
    instance_id: String,
    generator: OidGenerator,
}

pub type OidGenerator = RwLock<Mutex<Generator>>;

impl ObjectIdReactor {
    // * Public
    pub async fn new() -> AppResult<OidPool> {
        tracing::info!("Generating InstanceID...");
        let instance_id = Self::new_instance_id().await;
        tracing::info!("InstanceID generated: [{instance_id}]");
        let generator = RwLock::new(Mutex::new(Generator::new()));
        Ok(Arc::new(RwLock::new(Self { instance_id, generator })))
    }
    pub async fn generate(&mut self) -> AppResult<String> {
        use chrono::Utc;
        use sha2::Sha256;
        use std::time::Instant;

        let now_monotonic = Instant::now();
        let mutex = self.generator.write().await;
        let mut ulid_gen = mutex.lock().await;
        let instance_id = &self.instance_id;

        let new_ulid: String = ulid_gen.generate()?.into();
        let now_timestamp = Utc::now().timestamp_nanos();
        let elapsed_monotonic = now_monotonic.elapsed().as_nanos();

        let new_oid_string =
            format!("{instance_id}-{now_timestamp}-{new_ulid}-{elapsed_monotonic}");

        let mut hasher = Sha256::new();
        hasher.update(new_oid_string.as_bytes());

        let new_oid = format!("{:x}", hasher.finalize());

        Ok(new_oid)
    }
    // * Private
    async fn new_instance_id() -> String {
        use rand::Rng;
        use sha2::Sha512;
        #[cfg(debug_assertions)]
        const VEC_SIZE: usize = 1_048_576; // 1 MBytes
        #[cfg(not(debug_assertions))]
        const VEC_SIZE: usize = 104_857_600; // 100 MBytes
        let instance_id: String;
        {
            let mut random_bytes: Vec<u8> = Vec::with_capacity(VEC_SIZE);
            let mut rng = rand::thread_rng();

            for _ in 0..VEC_SIZE {
                random_bytes.push(rng.gen::<u8>());
            }

            let mut hasher = Sha512::new();
            hasher.update(random_bytes);

            instance_id = format!("{:x}", hasher.finalize());
        }
        instance_id
    }
}
