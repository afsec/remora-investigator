#![warn(clippy::all)]

use wasm_bindgen::prelude::*;

mod actors;
mod api;
// mod chrome_api;

// use chrome_api::action_seticon;

#[wasm_bindgen]
extern "C" {
    // Use `js_namespace` here to bind `console.log(..)` instead of just
    // `log(..)`
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

    pub fn browser_action_seticon(s: &str);
}

#[wasm_bindgen]
pub fn entrypoint(data: &str) -> String {
    api::dispatcher(data)
}

#[cfg(test)]
mod tests {
    use crate::api::dispatcher;

    #[test]
    fn dispatcher_nodata() {
        let result_str = dispatcher("");
        dbg!(result_str);
    }

    #[test]
    fn message_builder() {
        use crate::actors::message::ActorEnvelope;
        let message = ActorEnvelope::new();
        let json = serde_json::to_string(&message).unwrap();
        println!("{}", json);
    }
}
