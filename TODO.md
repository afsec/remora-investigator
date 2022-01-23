# Remora Investigator

## Backend (`remora-manager`)

- [X] Implement open existing session (--session-file) CLI option
- [X] Implement endpoint (/show_sites)
- [X] Implement *paginator metadata field* response at endpoint (/show_events)
- [X] Implement *request site filter* at endpoint (/show_events)
- [X] Implement `row_position`  field as `u16` at endpoint (/show_events)
- [X] Implement `notes_id`  field as `Option<u16>` at endpoint (/show_events)
- [X] Implement endpoint `show_full_event`
- [X] Implement endpoint `create_note`
- [X] Implement endpoint `get_notes`
- [X] Implement endpoint `get_full_note`
- [X] Implement endpoint `update_note`
- [X] Implement endpoint `get_headers`
- [X] Implement endpoint `get_event_res_body`
- [X] Implement endpoint: `get_event_req_body`
- [ ] Implement field `event_initiator` and so on
- [ ] Implement `Logbook` window for: `FilterBySite`, `ShowEvent`, `InsertNote`, `UpdateNote`.


## Frontend (`remora-investigator`)

- [X] Implement endpoint (/show_sites)
- [X] Implement *request site filter* at endpoint (/show_events)
- [X] Implement historyTab table paginator at Frontend
- [X] Implement `rowPosition` at historyTable. Mind `eventId` concept
- [X] Implement alternate row background at historyTable (Depends on task above)
- [X] Implement `notes_id` as Maybe Int
- [X] Implement `Maybe` on various fiels at `historyTable` and `Httpevent`
- [X] Implement elements size on Resize using `OnResize` triggered from subscriptions
- [X] Implement endpoint `show_full_event` rendering
- [X] Implement endpoint `create_note` rendering
- [ ] Implement a modal when info button (above Response Headers) is pressed.
- [ ] Implement `Logbook` window for: `FilterBySite`, `ShowEvent`, `InsertNote`, `UpdateNote`.
- [ ] Check at Firefox devtools extension API what is happen when a Download is triggered
- [ ] Implement endpoint `get_notes` rendering
- [ ] Look into `cellTDNotes` to implement properly
- [ ] Implement column/info `event_initiator` and so on
- [ ] Implement `statusBar` message when `remora-manager` is *offline*

