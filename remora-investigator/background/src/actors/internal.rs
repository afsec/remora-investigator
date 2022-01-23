use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub enum InternalActor {
    #[serde(rename = "sha-encoder")]
    ShaEncoder, // each Internal Actor should have a api code
    Nil,
}

impl Default for InternalActor {
    fn default() -> Self {
        Self::Nil
    }
}
