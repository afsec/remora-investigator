use sha1::Sha1;

// use crate::actors::message::{ActorEnvelope, ActorMessage};
use crate::actors::{external::ExternalActor, message::ActorEnvelope};
use crate::browser_action_seticon;

pub fn go(message: ActorEnvelope) -> ActorEnvelope {
    let json_str = r#"{ "path": "/icons/logo-green.png" }"#;
    browser_action_seticon(&json_str);
    match message.sender() {
        &ExternalActor::FetchAndInstantiate => (), // Permitted External Actor
        _ => {
            let sender = message.sender().to_string();
            // let sender = "Test42".to_string();
            let error_message = format!("Forbidden message from {}", sender);
            return ActorEnvelope::from(message)
                .set_data(error_message.into())
                .build();
        }
    }

    let input = message.data().to_string();
    let mut m = Sha1::new();
    m.update(input.as_bytes());
    let dgst = m.digest().to_string();
    ActorEnvelope::from(message).set_data(dgst.into()).build()
}
