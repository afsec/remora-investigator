use super::external::ExternalActor;
use super::internal::InternalActor;
use serde::{Deserialize, Serialize};

#[derive(Debug, Default, Serialize, Deserialize)]
pub struct ActorMessage(String);

impl Into<ActorMessage> for String {
    fn into(self) -> ActorMessage {
        ActorMessage(self)
    }
}

impl ToString for ActorMessage {
    fn to_string(&self) -> String {
        self.0.clone()
    }
}

#[derive(Debug, Default, Serialize, Deserialize)]
pub struct ActorEnvelope {
    sender: ExternalActor,
    actor: InternalActor,

    #[serde(rename(deserialize = "input", serialize = "output"))]
    data: ActorMessage,
}

impl ActorEnvelope {
    pub fn new() -> Self {
        Self::default()
    }
    pub fn set_sender(mut self, sender: ExternalActor) -> Self {
        self.sender = sender;
        self
    }
    pub fn set_actor(mut self, actor: InternalActor) -> Self {
        self.actor = actor;
        self
    }
    pub fn set_data(mut self, data: ActorMessage) -> Self {
        self.data = data;
        self
    }
    pub fn build(self) -> Self {
        self
    }
    pub fn sender(&self) -> &ExternalActor {
        &self.sender
    }
    pub fn actor(&self) -> &InternalActor {
        &self.actor
    }
    pub fn data(&self) -> &ActorMessage {
        &self.data
    }
}
