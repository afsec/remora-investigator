console.log("REMORA: devtools/main_panel/main_panel-loader.js loaded")

var app = Elm.Main.init({
    flags: {
        x: window.innerWidth,
        y: window.innerHeight,
        ua: navigator.userAgent,
        isEmptyPage: false
    },
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
    // console.log("REMORA: devtools/main_panel/main_panel-loader.js - entrypoint=", entrypoint)

    console.log("REMORA: devtools/main_panel/main_panel-loader.js - input=", message)

    // const messageResult = entrypoint(message) // WASM
    const messageResult = message
    console.log("REMORA: devtools/main_panel/main_panel-loader.js - messageResult=", messageResult)

    // Send data back to Elm
    app.ports.messageResult.send(messageResult)
});

