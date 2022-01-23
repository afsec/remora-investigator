"use strict";

// sw.js

const debug = (msg1, msg2) => {
    const debug_str = "DEBUG(sw.js)"
    if (msg2) {
        console.log(debug_str, msg1, msg2)
    } else if (msg1) {
        console.log(debug_str, msg1)
    } else {
        console.log(debug_str)
    }
}

debug("loaded")

const REMORA_DATABASE = 'some_session_id'
// TODO: Check if can be done with Rust

// TODO: Export and Import session


const isDatabaseExists = async () => {
    debug(' isDatabaseExists: loaded')
    const databases = await indexedDB.databases()
    debug(' isDatabaseExists: databases ->', databases)

    if ((typeof (databases.length) === 'number') && (databases.length > 0)) {
        debug(' isDatabaseExists() -> true')
        return true
    } else {
        debug(' isDatabaseExists() -> false')
        return false
    }
}

//* BACKEND: IndexedDB

const insertRecords = async (dbConn, records) => {
    debug(' insertRecords: loaded')
    debug(' insertRecords: (dbConn, records)', dbConn, records)
    const isDbExists = await isDatabaseExists()
    debug(' insertRecords: isDbExists ->', isDbExists)
    if (isDbExists) {
        const insertTransaction = dbConn.transaction(["users"], "readwrite")
        const objectStore = insertTransaction.objectStore("users");
        debug(' insertRecords: insertTransaction ->', insertTransaction)
        debug(' insertRecords: objectStore ->', objectStore)
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
}

const startDatabase = async () => {
    debug(' startDatabase: loaded')
    const isDbExists = await isDatabaseExists()
    debug(' startDatabase: isDbExists ->', isDbExists)
    // if (isDbExists) {
    //     const databases = await indexedDB.databases()
    //     debug(' startDatabase: DatabaseExists', databases)
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
            const objectStoreHTTPRequests = dbConn.createObjectStore("http_events", { keyPath: "id", autoIncrement: true })
            // const objectStoreHTTPRequests = dbConn.createObjectStore("http_events", { autoIncrement: true })
            // TODO: Check if CreateIndex is ok
            // objectStoreHTTPRequests.createIndex('connection', 'connection', {unique: true})
            objectStoreHTTPRequests.transaction.oncomplete = event => {
                console.log("saveHTTPRequest: objectStoreHTTPRequests Created.")
            }
        }
        console.log("startDatabase: indexedDbOpen ->", indexedDbOpen)
    }
}


// Create Database if not exists.
startDatabase()

// TODO:  Possible Feature: HAR export. HAR files are required to be saved in
// TODO: UTF-8 encoding, other encodings are forbidden.

const saveHTTPRequest = async (message) => {
    console.warn("saveHTTPRequest: loaded ->", message)
    const dataHTTPRequest = {
        metadata: message["metadata"],
        // TODO:  Maybe use Uint8Array at responseBodyContent to preserve
        // TODO:   all Bytes.
        responseBodyContent: message["responseBodyContent"],
        requestBodyEncoding: message["requestBodyEncoding"]
    }
    // request["data"]
    // const IDX_OBJ_NAME = "http_events"
    const HTTPRequestsDB = indexedDB.open(REMORA_DATABASE)
    HTTPRequestsDB.onerror = event => {
        console.log("saveHTTPRequest: HTTPRequestsDB.onerror: event ->", event)
    }

    HTTPRequestsDB.onsuccess = async (event) => {
        let dbConn = event.target.result
        console.log("saveHTTPRequest: HTTPRequestsDB.onsuccess: event ->", event)
        console.log("saveHTTPRequest: HTTPRequestsDB.onsuccess:  dbConn (event.target.result) ->", dbConn)
        const insertTransaction = dbConn.transaction(["http_events"], "readwrite") //! Error object store not found
        const objectStore = insertTransaction.objectStore("http_events");
        return new Promise((resolve, reject) => {
            insertTransaction.oncomplete = () => {
                console.warn("ALL INSERT TRANSACTIONS COMPLETE.")
                resolve(true)
            }

            insertTransaction.onerror = () => {
                console.warn("PROBLEM INSERTING RECORDS.")
                resolve(false)
            }

            let request = objectStore.add(dataHTTPRequest)

            request.onsuccess = () => {
                console.warn("saveHTTPRequest Added:", dataHTTPRequest)
            }
        })
    }
    // Create Object
    HTTPRequestsDB.onupgradeneeded = event => {
        console.log("saveHTTPRequest: HTTPRequestsDB.onupgradeneeded: event ->", event)
        let dbConn = event.target.result

        const objectStore = dbConn.createObjectStore("http_events", { keyPath: "id", autoIncrement: true })

        objectStore.transaction.oncomplete = event => {
            console.log("saveHTTPRequest: ObjectStore Created.")
        }
    }
    console.log("saveHTTPRequest: HTTPRequestsDB ->", HTTPRequestsDB)
}



chrome.runtime.onMessage.addListener(async (message, sender, sendResult) => {
    debug(' onMessage: Message received!')
    debug(' onMessage: message -> ', message)
    debug(' onMessage: sender: -> ', sender)
    if (message["cmd"] === "save-http-event") {
        // Presenter
        debug(' save-http-event "Presenter"')
        // debug(' save-http-event "Presenter"', JSON.stringify(message))
        // console.warn('REMORA: background.js - save-http-event "Presenter"', message)
        const result = await saveHTTPRequest(message)
        console.warn('REMORA: background.js - saveHTTPRequest "Presenter" "result"', result)
        console.warn('REMORA: background.js - saveHTTPRequest "Presenter" "JSON.stringify(result)"', JSON.stringify(result))
        sendResult({
            "isOk": true,
        })
    } else if (message["cmd"] === "panelMessage") {
        // Presenter
        debug(' panelMessage "Presenter"')
        sendResult({
            "isOk": true,
        })
    } else if (message["cmd"] === "set-color") {
        debug('set-color "Presenter"')
        const color = typeof (message["color"]) === undefined ? null : message["color"]
        switch (color) {
            case "#3AA757":
                chrome.action.setIcon({ path: '/icons/logo-green.png' })
                break

            case "#F9BB2D":
                chrome.action.setIcon({ path: '/icons/logo-yellow.png' })
                break

            case "#E8453C":
                chrome.action.setIcon({ path: '/icons/logo-red.png' })
                break

            case "#2039B7":
                chrome.action.setIcon({ path: '/icons/logo-blue.png' })
                break

            default:
                chrome.action.setIcon({ path: '/icons/logo-grey.png' })
                break

        }
        sendResult({
            "isOk": true,
        })
    } else if (message["cmd"] === "set-global-config") {
        debug('set-global-config "Presenter"')
        const color = typeof (message["input"]["global_config"]["color"]) === undefined ? null : message["input"]["global_config"]["color"]
        if (color !== null) {
            chrome.storage.local.set({
                global_config: {
                    color
                }
            })
            sendResult({
                "isOk": true,
            })
        } else {
            sendResult({
                "isOk": false,
            })
        }

    } else {
        console.warn('REMORA: background.js - Unknown Presenter!', message)
        sendResult({
            "isOk": false,
        })
    }

    // TODO: Add some comment about why is return boolean `true`
    return true
})


chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.get('global_config', (data) => {
        const color = '#3aa757'
        if (Object.keys(data).length === 0) {
            console.log('Default background color NOT FOUND!')
            console.log('Default background color set color=', color)
            chrome.storage.local.set({
                global_config: {
                    color
                }
            })
        } else {
            console.log('Default background color found. data.global_config=', data.global_config)
        }
    })
})

/*

// Show all stored Keys
const getAllConfig = () => {
    chrome.storage.local.get(null, (data) => {
        // Show all stored Keys
        console.log(data)
    })
}

const cleanConfig = () => {
    console.log('Cleaning all keys.')
    chrome.storage.local.clear(() => {
        if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError)
        }
    })
}

*/