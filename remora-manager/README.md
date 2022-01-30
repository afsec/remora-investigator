# brickpack-2021

[![dependency status](https://deps.rs/repo/github/afsec/brickpack/status.svg)](https://deps.rs/repo/github/afsec/brickpack)

## How it works

> TODO

## Features
> TODO

## Getting started
Install depencies:
```sh
# Ubuntu Linux
sudo apt-get install build-essential make musl-tools -y
```
Install [Rust](https://www.rust-lang.org/en-US/install.html):
```sh
# Install Rust compiler
$ curl https://sh.rustup.rs -sSf | sh
.
.
.
# Build project(Release) and Run
$ make release run
```

## Lean artifact (< 7 MB)
> The whole artifact is built with static compiling using **MUSL** target.
```
$ ls -lh
total 6,4M
-rwxrwxr-x 1 user user 6,4M jul 22 22:52 tide-crud-users
$ ldd ./dist/tide-crud-users 
        statically linked
$
```

## Startup message
```
$ LOG_LEVEL=TRACE ./tide-crud-users
{"level":40,"time":1627005201576,"msg":"Logger started: TRACE"}
{"level":30,"time":1627005201576,"msg":"Starting App [BrickPack v0.1.92]:"}
{"level":30,"time":1627005201576,"msg":"DbConnection [application_db.sqlite3]: MODE (connection) Initializing"}
{"level":10,"time":1627005201576,"msg":"block_on: sleep until notification"}
{"level":30,"time":1627005201578,"msg":"DbConnection [application_db.sqlite3]: MODE (connection) Connected"}
{"level":30,"time":1627005201578,"msg":"DbConnection [application_db.sqlite3]: Bootstraping"}
{"level":40,"time":1627005201578,"msg":"no such table: departments"}
{"level":40,"time":1627005201578,"msg":"Creating tables `departments`"}
{"level":40,"time":1627005201615,"msg":"no such table: permissions"}
{"level":40,"time":1627005201615,"msg":"Creating tables `permissions`"}
{"level":40,"time":1627005201650,"msg":"no such table: statuses"}
{"level":40,"time":1627005201650,"msg":"Creating tables `statuses`"}
{"level":40,"time":1627005201686,"msg":"no such table: users"}
{"level":40,"time":1627005201686,"msg":"Creating tables `users`"}
{"level":30,"time":1627005201724,"msg":"DbConnection [application_db.sqlite3]: Bootstraped"}
{"level":30,"time":1627005201724,"msg":"DbConnection [metrics_db.sqlite3]: MODE (connection) Initializing"}
{"level":30,"time":1627005201726,"msg":"DbConnection [metrics_db.sqlite3]: MODE (connection) Connected"}
{"level":30,"time":1627005201726,"msg":"DbConnection [metrics_db.sqlite3]: Bootstraping"}
{"level":40,"time":1627005201726,"msg":"no such table: metrics"}
{"level":40,"time":1627005201726,"msg":"Creating tables `metrics`"}
{"level":30,"time":1627005201735,"msg":"DbConnection [metrics_db.sqlite3]: Bootstraped"}
{"level":10,"time":1627005201736,"msg":"add: epoll_fd=3, fd=8, ev=Event { key: 0, readable: false, writable: false }"}
{"level":30,"time":1627005201736,"msg":"Server listening on http://0.0.0.0:8080"}
{"level":10,"time":1627005201736,"msg":"modify: epoll_fd=3, fd=8, ev=Event { key: 0, readable: true, writable: false }"}
{"level":10,"time":1627005201736,"msg":"block_on: sleep until notification"}
```

## Show endpoints
```
$ ./tide-crud-users -e

  Internal Endpoints:
    /                - index_page
    /maintenance     - maintenance
    /auth            - check_auth
  
  Endpoints:
    /api/add_user - AddUser
    /api/delete_user - DeleteUser
    /api/export_users - ExportUsers
    /api/show_departments - ShowDepartments
    /api/show_permissions - ShowPermissions
    /api/show_statuses - ShowStatuses
    /api/show_user - ShowUser
    /api/show_users - ShowUsers
    /api/update_user - UpdateUser

$
```

## Help
```
$ ./tide-crud-users -h
BrickPack 0.1.92
Antonio Costa - https://github.com/afsec


USAGE:
    tide-crud-users [FLAGS] [OPTIONS]

FLAGS:
    -e, --endpoints    Show endpoint names
    -h, --help         Prints help information
    -V, --version      Prints version information

OPTIONS:
        --log-level=<LOG_LEVEL>         Log level: OFF, ERROR, WARN, INFO, DEBUG or TRACE [env: LOG_LEVEL=]
        --port=<PORT>                   Port number [env: PORT=]
        --tide-cert-path=<CERT_PATH>    TLS certificate file [env: TIDE_CERT_PATH=]
        --tide-key-path=<KEY_PATH>      TLS key file [env: TIDE_KEY_PATH=]

```

## Running with all options
```
 ./tide-crud-users --tide-cert-path ~/tmp/test-ca/ecdsa/end.cert --tide-key-path ~/tmp/test-ca/ecdsa/end.key --port 5000 --log-level DEBUG
```

---


## Vulnerability (Parametized queries limitation)
https://www.ge.com/digital/documentation/historian/version72/c_parameterized_sql_queries.html#:~:text=You%20cannot%20use%20parameters%20to%20substitute%20table%20names%20or%20columns%20in%20a%20query.


## Performance references
https://stackoverflow.com/questions/3094689/synchronizing-sqlite-database-from-memory-to-file

