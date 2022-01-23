use std::fmt::Display;

use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub enum ExternalActor {
    FetchAndInstantiate,
    MainFunction,
    InputField,
    Nil,
}

impl Display for ExternalActor{
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f,"{:?}",self)
    }
}

impl Default for ExternalActor {
    fn default() -> Self {
        Self::Nil
    }
}
