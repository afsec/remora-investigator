console.log("REMORA: devtools/main_panel/main_panel-loader.js loaded")
//////////////////////////////////////////////////////////////
// const WASM_URL = browser.runtime.getURL('/background/wasm/background_bg.wasm')
const WASM_URL = "/pkg/process_events_bg.wasm"
//////////////////////////////////////////////////////////////

const main = async () => {

    await wasm_bindgen(WASM_URL);

    var { entrypoint } = wasm_bindgen;

    var app = Elm.Main.init({
        node: document.getElementById("app")
    });

    // app.ports.searchSomeData.subscribe(function (message) {
    //     console.log("JS searchSomeData(): message=", message)
    // });

    app.ports.consoleError.subscribe(function (message) {
        console.error("JS consoleError(): message=", message)
    });

    ////////////////////////////////////////////////////
    app.ports.sendMessage.subscribe(function (message) {
        console.log("JS sendMessage(): message=", message)
        console.log("REMORA: devtools/main_panel/main_panel-loader.js - entrypoint=", entrypoint)

        console.log("REMORA: devtools/main_panel/main_panel-loader.js - input=", message)

        const messageResult = entrypoint(message)
        console.log("REMORA: devtools/main_panel/main_panel-loader.js - messageResult=", messageResult)

        // Send data back to Elm
        app.ports.messageResult.send(messageResult)
    });

}



main()

// TODO
// app.ports.showPopup.subscribe(function (someData) {
//   chrome.windows.create({
//     url: chrome.runtime.getURL("/devtools/panel_popup/panel_popup.html"),
//     type: "popup",
//     setSelfAsOpener: true
//   }, (win) => {
//     // win represents the Window object from windows API
//     // Do something after opening
//     console.log("Popup open: win=", win)
//   });
// });
