"use strict";
console.log('REMORA: background/bg-loader.js loaded')
const WASM_URL = browser.runtime.getURL('/background/wasm/background_bg.wasm')


wasm_bindgen(WASM_URL);

var { entrypoint } = wasm_bindgen;


console.log('REMORA: background/bg-loader.js - entrypoint=', entrypoint)


//////////////////////////////////////////////////////////////////////////////////////
const REMORA_DATABASE = 'remora_beta'

// const isDatabaseExists = async () => {
//   console.log('REMORA: background.js - isDatabaseExists: loaded')
//   const databases = await indexedDB.databases()
//   console.log('REMORA: background.js - isDatabaseExists: databases ->', databases)

//   if ((typeof (databases.length) === 'number') && (databases.length > 0)) {
//     console.log('REMORA: background.js - isDatabaseExists() -> true')
//     return true
//   } else {
//     console.log('REMORA: background.js - isDatabaseExists() -> false')
//     return false
//   }
// }

//* BACKEND: IndexedDB

const insertRecords = async (dbConn, records) => {
  console.log('REMORA: background.js - insertRecords: loaded')
  console.log('REMORA: background.js - insertRecords: (dbConn, records)', dbConn, records)
  const insertTransaction = dbConn.transaction(["users"], "readwrite")
  const objectStore = insertTransaction.objectStore("users");
  console.log('REMORA: background.js - insertRecords: insertTransaction ->', insertTransaction)
  console.log('REMORA: background.js - insertRecords: objectStore ->', objectStore)
  return new Promise((resolve, reject) => {
    insertTransaction.oncomplete = () => {
      console.log("ALL INSERT TRANSACTIONS COMPLETE.")
      resolve(true)
    }

    insertTransaction.onerror = () => {
      console.log("PROBLEM INSERTING RECORDS.")
      resolve(false)
    }

    records.forEach(person => {
      let request = objectStore.add(person)

      request.onsuccess = () => {
        console.log("Added:", person)
      }
    })
  })
}

const startDatabase = async () => {
  console.log('REMORA: background.js - startDatabase: loaded')
  // const isDbExists = await isDatabaseExists()
  // console.log('REMORA: background.js - startDatabase: isDbExists ->', isDbExists)
  // if (isDbExists) {
  //     const databases = await indexedDB.databases()
  //     console.log('REMORA: background.js - startDatabase: DatabaseExists', databases)
  // } else {
  {
    // Populate Database
    const indexedDbOpen = indexedDB.open(REMORA_DATABASE)

    indexedDbOpen.onerror = event => {
      console.log("startDatabase: indexedDbOpen.onerror: event ->", event)
    }

    indexedDbOpen.onsuccess = async (event) => {
      let dbConn = event.target.result
      console.log("startDatabase: indexedDbOpen.onsuccess: event ->", event)
      const users = [
        {
          "id": 1,
          "name": "Charlie Root",
          "createdAt": "10/09/2020",
          "email": "root@localhost"
        },
        {
          "id": 2,
          "name": "User",
          "createdAt": "10/09/2020",
          "email": "user@localhost"
        },
        {
          "id": 3,
          "name": "Admin",
          "createdAt": "10/09/2020",
          "email": "admin@localhost"
        }
      ]

      console.log("startDatabase: indexedDbOpen.onsuccess:  dbConn (event.target.result) ->", dbConn)
      const result = await insertRecords(dbConn, users)
      console.log("startDatabase: insertRecords(): result ->", result)
      // indexedDbOpen.close()

    }
    // Create Object
    indexedDbOpen.onupgradeneeded = event => {
      console.log("startDatabase: indexedDbOpen.onupgradeneeded: event ->", event)
      let dbConn = event.target.result
      const objectStoreUsers = dbConn.createObjectStore('users', {
        "keyPath": 'id'
      })
      objectStoreUsers.transaction.oncomplete = event => {
        console.log("ObjectStoreUsers Created.")
      }
      const objectStoreHTTPRequests = dbConn.createObjectStore("http_requests", { keyPath: "id", autoIncrement: true })
      // TODO: Check if CreateIndex is ok
      // objectStoreHTTPRequests.createIndex('connection', 'connection', {unique: true})
      objectStoreHTTPRequests.transaction.oncomplete = event => {
        console.log("saveHTTPRequest: objectStoreHTTPRequests Created.")
      }
      const objectStoreResponsesBody = dbConn.createObjectStore("responses_body", { keyPath: "id", autoIncrement: true })
      // TODO: Check if CreateIndex is ok
      // objectStoreHTTPRequests.createIndex('connection', 'connection', {unique: true})
      objectStoreResponsesBody.transaction.oncomplete = event => {
        console.log("saveHTTPRequest: objectStoreResponsesBody Created.")
      }

    }
    console.log("startDatabase: indexedDbOpen ->", indexedDbOpen)
  }
}


// Create Database if not exists.
startDatabase()

// TODO:  Possible Feature: HAR export. HAR files are required to be saved in
// TODO: UTF-8 encoding, other encodings are forbidden.

const saveHTTPRequest = (dataHTTPRequestMessage) => {
  const httpEvent = dataHTTPRequestMessage.metadata || null

  console.warn("saveHTTPRequest: loaded ->", httpEvent)

  // request["data"]
  // const IDX_OBJ_NAME = "http_requests"
  const HTTPRequestsDB = indexedDB.open(REMORA_DATABASE)
  HTTPRequestsDB.onerror = event => {
    console.log("saveHTTPRequest: HTTPRequestsDB.onerror: event ->", event)
  }

  HTTPRequestsDB.onsuccess = async (event) => {
    let dbConn = event.target.result
    console.log("saveHTTPRequest: HTTPRequestsDB.onsuccess: event ->", event)
    console.log("saveHTTPRequest: HTTPRequestsDB.onsuccess:  dbConn (event.target.result) ->", dbConn)
    const insertTransaction = dbConn.transaction(["http_requests"], "readwrite") //! Error object store not found
    const objectStore = insertTransaction.objectStore("http_requests");
    return new Promise((resolve, reject) => {
      insertTransaction.oncomplete = () => {
        console.warn("ALL INSERT TRANSACTIONS COMPLETE.")
        resolve(true)
      }

      insertTransaction.onerror = () => {
        console.error("PROBLEM INSERTING RECORDS.")
        resolve(false)
      }

      let request = objectStore.add(httpEvent)

      request.onsuccess = () => {
        console.warn("saveHTTPRequest Added: httpEvent=", httpEvent)
        const responseBody = {
          content: btoa(dataHTTPRequestMessage.responseBodyContent),
          encoding: dataHTTPRequestMessage.responseBodyEncoding || null
        }
        const insertTransaction = dbConn.transaction(["responses_body"], "readwrite") //! Error object store not found
        const objectStore = insertTransaction.objectStore("responses_body");
        return new Promise((resolve, reject) => {
          insertTransaction.oncomplete = () => {
            console.warn("ALL INSERT TRANSACTIONS COMPLETE.")
            resolve(true)
          }

          insertTransaction.onerror = () => {
            console.error("PROBLEM INSERTING RECORDS.")
            resolve(false)
          }

          let request = objectStore.add(responseBody)

          request.onsuccess = () => {
            console.warn("saveHTTPRequest Added: responseBody=", responseBody)
          }
        })

      }
    })
  }
  // Create Object
  HTTPRequestsDB.onupgradeneeded = event => {
    console.log("saveHTTPRequest: HTTPRequestsDB.onupgradeneeded: event ->", event)
    let dbConn = event.target.result

    const objectStore = dbConn.createObjectStore("http_requests", { keyPath: "id", autoIncrement: true })

    objectStore.transaction.oncomplete = event => {
      console.log("saveHTTPRequest: ObjectStore Created.")
    }
  }
  console.log("saveHTTPRequest: HTTPRequestsDB ->", HTTPRequestsDB)
}
//////////////////////////////////////////////////////////////////////////////////////

const saveHTTPEvent = (message, sendResult) => {
  console.log("REMORA: background/bg-loader.js - saveHTTPEvent(): message=", message)
  const result = saveHTTPRequest(message)
  console.log("REMORA: background/bg-loader.js - saveHTTPEvent(): result=", result)
  sendResult({
    "sentMessage": message,
    "isOk": false,
  })
}

const sendToWasmEntrypoint = (message, sendResult) => {
  console.log("REMORA: background/bg-loader.js - sendToWasmEntrypoint(): message=", message)
  const wasmMessage = {
    sender,
    actor,
    input: btoa(input)
  }

  const input = "Hello World!"

  const sender = typeof (message["sender"]) !== undefined ? message["sender"] : null

  const actor = typeof (message["actor"]) !== undefined ? message["actor"] : null

  // let message_json = JSON.stringify(message)

  let message_json = JSON.stringify(wasmMessage)
  console.log("REMORA: background/bg-loader.js - sendToWasmEntrypoint(): wasmMessage=", wasmMessage)
  console.log("REMORA: background/bg-loader.js - sendToWasmEntrypoint(): message_json=", message_json)

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

  console.log("REMORA: background/bg-loader.js - onMessage(): Output: validValue=", validValue)

  if (validValue !== null) {
    sendResult({
      "isOk": true,
    })
  } else {
    sendResult({
      "isOk": true,
    })
  }
}
browser.runtime.onMessage.addListener((message, tabSender, sendResult) => {
  console.log('REMORA: background/bg-loader.js - onMessage: Message received!')
  console.log('REMORA: background/bg-loader.js - onMessage: message -> ', message)
  console.log('REMORA: background/bg-loader.js - onMessage: tabSender: -> ', tabSender)

  const actor = typeof (message["actor"]) !== undefined ? message["actor"] : null

  switch (actor) {
    case 'save-http-event':
      saveHTTPEvent(message, sendResult)
      break
    case null:
      console.log("MSG for actor(null)")
      break
    default:
      sendToWasmEntrypoint(message, sendResult)
  }




})


