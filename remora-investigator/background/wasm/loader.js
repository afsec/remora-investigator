"use strict";
const BINDGEN_URL = chrome.runtime.getURL('/background/wasm/background.js')

self.importScripts(BINDGEN_URL);
// Like with the `--target web` output the exports are immediately
// available but they won't work until we initialize the module. Unlike
// `--target web`, however, the globals are all stored on a
// `wasm_bindgen` global. The global itself is the initialization
// function and then the properties of the global are all the exported
// functions.
//
// Note that the name `wasm_bindgen` can be configured with the
// `--no-modules-global` CLI flag

const WASM_URL = chrome.runtime.getURL('/background/wasm/background_bg.wasm')

async function main() {
  // await wasm_bindgen('./pkg/background_bg.wasm');
  await wasm_bindgen(WASM_URL);
  const { entrypoint } = wasm_bindgen;
  const input = document.getElementById("input")
  const output = document.getElementById("output")

  const message = {
    sender: "FetchAndInstantiate",
    actor: "sha-encoder",
    input: btoa(input.value)
  }
  let message_json = JSON.stringify(message)
  // console.warn(`[${message_json}]`)
  const resultFromActor = entrypoint(message_json)

  const validResult =
    typeof (resultFromActor["sender"]) !== undefined
      ? typeof (resultFromActor["actor"]) !== undefined
        ? typeof (resultFromActor["output"]) !== undefined
          ? JSON.parse(resultFromActor) : null
        : null
      : null;

  const validValue =
    validResult !== null
      ? validResult["output"]
      : null;

  (validValue !== null) ? output.innerText = validValue : null

  input.addEventListener("keyup", function (e) {
    const message = {
      sender: "FetchAndInstantiate",
      actor: "sha-encoder",
      input: btoa(input.value)
    }
    let message_json = JSON.stringify(message)
    // console.warn(`[${message_json}]`)
    const resultFromActor = entrypoint(message_json)

    const validResult =
      typeof (resultFromActor["sender"]) !== undefined
        ? typeof (resultFromActor["actor"]) !== undefined
          ? typeof (resultFromActor["output"]) !== undefined
            ? JSON.parse(resultFromActor) : null
          : null
        : null;

    const validValue =
      validResult !== null
        ? validResult["output"]
        : null;

    (validValue !== null) ? output.innerText = validValue : null
  })
}

main();



