mod sha_encoder;

pub fn dispatcher(json: &str) -> String {
    use crate::actors::{internal::InternalActor, message::ActorEnvelope};
    let envelope: ActorEnvelope = match serde_json::from_str(json) {
        Ok(data) => data,
        Err(error) => {
            let data = error.to_string();
            let error_envelope = ActorEnvelope::new().set_data(data.into());
            let error_envelope_json = serde_json::to_string(&error_envelope).unwrap();
            return error_envelope_json;
        }
    };

    let returned_envelope = match envelope.actor() {
        &InternalActor::ShaEncoder => sha_encoder::go(envelope),
        _ => ActorEnvelope::from(envelope).set_data("Actor not found".to_string().into()), // ! Unreachable code because of enum usage (It's not a compile time check aproach. Could use a struct)
    };

    let returned_envelope_json = match serde_json::to_string(&returned_envelope) {
        Ok(data) => data,
        Err(error) => error.to_string(),
    };

    returned_envelope_json
}
