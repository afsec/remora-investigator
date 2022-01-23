"use strict";

// devtools.js
console.log("REMORA: devtools/devtools.js loaded")


browser.devtools.panels.create(
  "Remora Investigator",
  "/icons/logo-green.png",
  "/devtools/main_panel/main.html",
).then((panel) => {
  console.log("PANEL Created!")
  console.log(panel)
  const theme = browser.devtools.panels.themeName
  if (theme === "dark") {
    console.log("Dark theme")
  } else {
    console.log("Other theme:", theme)
  }
  // code invoked on panel creation
})


const DATASTORE_SERVER = "http://localhost:65432"
const DATASTORE_ENDPOINT = "/api/save_event"

// Save Requests
const sendToDataStore = (message, callback) => {
  console.log("REMORA: devtools.js - sendToDataStore(): message=", message)
  fetch(`${DATASTORE_SERVER}${DATASTORE_ENDPOINT}`, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: message
  }).then((response) => response.text())
    .then(callback)

}

browser.devtools.network.onRequestFinished.addListener((httpEvent) => {
  console.log("REMORA: devtools.js - onRequestFinished: httpEvent=", httpEvent)

  const url = httpEvent["request"]["url"]

  if ((url.includes("chrome://")) || (url.includes("moz-extension://") || url.includes(DATASTORE_SERVER))) {
    console.warn("REMORA: devtools.js - onRequestFinished (INTERNAL) httpEvent=", httpEvent)
  } else {
    httpEvent.getContent().then(([respBodyContent, respBodyEncoding]) => {
      // console.log("REMORA: devtools.js - onRequestFinished httpEvent.getContent: responseBodyContent ->", responseBodyContent)
      // console.log("REMORA: devtools.js - onRequestFinished httpEvent.getContent: requestBodyEncoding ->", requestBodyEncoding)
      // const message = JSON.parse(JSON.stringify(obj)) // * To avoid error: `"DOMException:" The object could not be cloned.`
      ///////////////////////////////////////////////////////////////////////////////////////
      // * Event metadata
      const eventSecurityState = httpEvent["_securityState"] || null
      const eventDestinationPort = parseInt(httpEvent["connection"]) || 0
      const eventServerIPAddress = httpEvent["serverIPAddress"] || null
      const eventStartedDateTime = httpEvent["startedDateTime"] || null
      const eventRtt = parseInt(httpEvent["time"]) || 0

      // * Request metadata 
      const requestMethod = httpEvent["request"]["method"]
      const requestUrl = httpEvent["request"]["url"]
      const requestHttpVersion = httpEvent["request"]["httpVersion"]
      const requestQueryString = JSON.stringify(httpEvent["request"]["queryString"]) // []
      const requestHeadersSize = httpEvent["request"]["headersSize"]
      const requestHeaders = httpEvent["request"]["headers"] // []
      const requestCookies = JSON.stringify(httpEvent["request"]["cookies"]) // []
      const requestBodySize = httpEvent["request"]["bodySize"]
      const isrequestHaspostData = httpEvent["request"].hasOwnProperty("postData")
      const requestPostDataMimeType = isrequestHaspostData ? httpEvent["request"]["postData"]["mimeType"] : null
      const requestPostDataParams = isrequestHaspostData ? JSON.stringify(httpEvent["request"]["postData"]["params"]) : null // []
      const requestPostDataText = isrequestHaspostData ? httpEvent["request"]["postData"]["text"] : null

      // * Response metadata

      const responseHttpVersion = httpEvent["response"]["httpVersion"]
      const responseStatusCode = httpEvent["response"]["status"]
      const responseHeadersSize = httpEvent["response"]["headersSize"]
      const responseHeaders = httpEvent["response"]["headers"] // []
      const responseRedirectURL = httpEvent["response"]["redirectURL"]
      const responseCookies = JSON.stringify(httpEvent["response"]["cookies"]) // []
      const responseContentMimeType = httpEvent["response"]["content"]["mimeType"]
      const responseContentSize = httpEvent["response"]["content"]["size"]
      const responseBodySize = httpEvent["response"]["content"]["size"] // TODO: You must  check on this
      // const responseSize = httpEvent["response"]["bodySize"]
      const responseBodyEncoding = respBodyEncoding
      console.warn("typeof(responseBodyEncoding)=", typeof (responseBodyEncoding))
      // const isjavascriptCode = responseBodyEncoding === "application/javascript"
      // const responseBodyContent = isjavascriptCode ? btoa(`${respBodyContent}`) : respBodyContent
      // const responseBodyContent = btoa(`${respBodyContent}`)
      const responseBodyContent = `${respBodyContent}`
      console.warn("typeof(responseBodyContent)=", typeof (responseBodyContent))

      const message = {
        // Event
        security_state: eventSecurityState,
        destination_port: eventDestinationPort,
        server_ip_address: eventServerIPAddress,
        started_datetime: eventStartedDateTime,
        rtt: eventRtt,
        // Request
        request_method: requestMethod || null,
        request_url: requestUrl || null,
        request_http_version: requestHttpVersion || null,
        request_query_string: requestQueryString || null,
        request_headers_size: parseInt(requestHeadersSize) || 0,
        request_headers: requestHeaders || null,
        request_cookies: requestCookies || null,
        request_body_size: parseInt(requestBodySize) || 0,
        request_postdata_mimetype: requestPostDataMimeType || null,
        request_postdata_params: requestPostDataParams || null,
        request_postdata_text: requestPostDataText || null,
        // Response
        response_http_version: responseHttpVersion || null,
        response_status_code: parseInt(responseStatusCode) || 0,
        response_headers_size: parseInt(responseHeadersSize) || 0,
        response_headers: responseHeaders || null,
        response_redirect_url: responseRedirectURL || null,
        response_cookies: responseCookies || null,
        response_content_mimetype: responseContentMimeType || null,
        response_content_size: parseInt(responseContentSize) || 0,
        response_body_size: parseInt(responseBodySize) || 0,
        response_body_encoding: responseBodyEncoding || null,
        response_body_content: responseBodyContent,
        // Message metadata
        actor: "SaveHttpEvent",
        sender: "onRequestFinished",
      }
      // ///////////////////////////////////////////////////////////////////////////////////////
      // console.log("MESSAGE: message=", message)
      sendToDataStore(JSON.stringify(message), (response) => {
        // console.log("CALLBACK: response=", response)
        console.log("DATASTORE Reponse", response);
      })

    })
  }
})


