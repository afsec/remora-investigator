# Remora Investigator v0.1 (Linux/x86_64)


Remora Investigator v0.1 was a Firefox extension that helps you to stealthily investigate a web application. Could be used as a sidecar tool with an IAST (Interactive Application Security Testing). Powered by Rust and Elm-ui.

You can take notes, do a full-text-search on the entire session, download artifacts, or simply registry the interactive activities between states of a Web Applications and its backend's traffic.

## v0.1 quoted in
- **AppSecEzine #415 - jan/2022**: https://github.com/Simpsonpt/AppSecEzine/blob/master/Ezines/415%20-%20AppSec%20Ezine#L57-L58


## Screenshot
![Remora Screenshot](/doc/img/remora.png "Remora Investigator")


## How to use: `remora-distrib-binary.tar.gz`
```sh
$ tar -xvf remora-distrib-binary.tar.gz 
dist/
dist/remora.xpi
dist/start.sh
dist/Insomnia.json
dist/remora-manager
dist/relax-white.xpi
```
```
$ tree --charset=ascii ./dist
./dist
|-- relax-white.xpi - (Firefox theme - optional)
|-- remora-manager  - (Remora Investigator [Rust App] - Backend) 
|-- remora.xpi      - (Remora Investigator [Firefox Devtools Extension] - Frontend)
`-- start.sh        - (Another way to start backend)

0 directories, 5 files
```

### Previous saved session

```sh
./remora-manager --session-file=remora-session-1641561324.dat
```

### New session
```sh
$ ./start.sh 
#   OR
$ ./remora-manager
{"level":30,"time":1641570785765,"msg":"Logging started: INFO"}
{"level":30,"time":1641570785765,"msg":"Starting App [BrickPack v0.1.92]:"}
{"level":30,"time":1641570785765,"msg":"DbConnection [remora-session-1641570785.dat]: MODE (application_db) Initializing"}
{"level":30,"time":1641570785765,"msg":"DbConnection [remora-session-1641570785.dat]: MODE (application_db) Connected"}
{"level":30,"time":1641570785765,"msg":"DbConnection [remora-session-1641570785.dat]: Bootstraping"}
{"level":40,"time":1641570785766,"msg":"no such table: events"}
{"level":40,"time":1641570785766,"msg":"Creating tables `events`"}
{"level":40,"time":1641570785780,"msg":"no such table: notes"}
{"level":40,"time":1641570785780,"msg":"Creating tables `notes`"}
{"level":30,"time":1641570785789,"msg":"DbConnection [remora-session-1641570785.dat]: Bootstraped"}
{"level":30,"time":1641570785789,"msg":"Server listening on http://127.0.0.1:65432"}
```

## Dependency for code beautifier

**Prettier** - https://prettier.io/docs/en/install.html


## Recommended firefox flavor for unsigned extension install

- **Firefox Developer Edition** - https://www.mozilla.org/en-US/firefox/developer/

**Explanation and Help on setting `xpinstall.signatures.required` flag on `about:config`:** https://support.mozilla.org/en-US/kb/add-on-signing-in-firefox?as=u&utm_source=inproduct#w_what-are-my-options-if-i-want-to-use-an-unsigned-add-on-advanced-users

## References

- *Burp is detectable and can be diverted:* https://www.dustri.org/b/detecting-and-annoying-burp-users.html
