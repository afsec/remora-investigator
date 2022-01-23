console.log('REMORA: background/firefox-api.js loaded')
function browser_action_seticon(json) {
    const obj = JSON.parse(json)
    console.log("action_seticon(): obj=", obj)
    // if (!typeof (obj["path"]) === 'undefined') {
    // action.setIcon(obj)
    browser.browserAction.setIcon({ path: '/icons/logo-blue.png' })
    // } else {
    // console.log("action_seticon(): typeof (obj['path']) === 'undefined'): obj=", obj)
    // }
}