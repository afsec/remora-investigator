port module Main exposing (main)

import Base64
import Browser
import Browser.Events
import Data.HttpDataEvent exposing (jsonDecodeDataEvent)
import Data.HttpDataEventReqBody exposing (jsonDecodeRequestBody)
import Data.HttpDataEventResBody exposing (jsonDecodeResponseBody)
import Data.HttpDataEvents exposing (jsonDecodeEventsResponse)
import Data.HttpDataNote exposing (jsonDecodeNoteEntry)
import Data.HttpDataSites exposing (jsonDecodeSites)
import Globaltypes
    exposing
        ( DataEventReqBodyStatus(..)
        , DataEventResBodyStatus(..)
        , DataEventStatus(..)
        , DataEventsStatus(..)
        , DataNoteStatus(..)
        , DataSitesStatus(..)
        , Flags
        , Model
        , Msg(..)
        , StateNoteEditor(..)
        , Tabtype(..)
        )
import Helpers exposing (httpErrorToString)
import Html exposing (Html)
import Http
import Json.Decode
import Layout.Base exposing (renderLayout)
import Task



-- CONSTANTS


serverUrl : String
serverUrl =
    "http://localhost:65432/api"



-- MAIN


main : Program Flags Model Msg
main =
    Browser.element
        { view = view
        , init = init
        , update = update
        , subscriptions = subscriptions
        }



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ messageResult ReceivedDataFromJS
        , Browser.Events.onResize OnResize
        ]



-- PORTS
-- port searchSomeData :
--     String
--     -> Cmd msg -- Stub function


port consoleError : String -> Cmd msg


port sendMessage : String -> Cmd msg


port messageResult : (String -> msg) -> Sub msg



---- INIT ----


init : Flags -> ( Model, Cmd Msg )
init flags =
    ( { data_event = DataEventNoRequest
      , data_event_req_body = DataEventReqBodyNoRequest
      , data_event_res_body = DataEventResBodyNoRequest
      , data_events = DataEventsNoRequest
      , data_note = DataNoteNoRequest
      , data_notes = [] -- TODO: Implement like `data_events`.
      , data_sites = DataSitesNoRequest
      , error = Nothing
      , shared_events_filter_by_site = Nothing
      , shared_selected_event_id = Nothing
      , state_highlighted_event_id = Nothing
      , state_note_editor = StateNoteEditorVoid
      , state_note_editor_input = ""
      , state_tabsbar = History
      , ua = flags.ua
      , window_size_x = flags.x
      , window_size_y = flags.y
      }
    , Cmd.none
    )



---- UPDATE ----


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        -- NoOp ->
        -- ( model, Cmd.none )
        OnResize windowSizeX windowSizeY ->
            ( { model | window_size_x = windowSizeX, window_size_y = windowSizeY }, Cmd.none )

        ApplicationErrorShow ->
            case model.error of
                Just errorString ->
                    ( model, consoleError errorString )

                Nothing ->
                    ( model, consoleError "Error without string. That's wierd!" )

        TableLineHighLighted maybeRowId ->
            ( { model | state_highlighted_event_id = maybeRowId }, Cmd.none )

        GetDataSites ->
            ( { model | shared_events_filter_by_site = Nothing, data_sites = DataSitesRequestPending }
            , Http.post
                { url = serverUrl ++ "/show_sites"
                , body = Http.stringBody "application/json" """{ }"""
                , expect = Http.expectString GotDataSites -- * Go to next state: `GotDataSites` *
                }
            )

        GotDataSites result ->
            case result of
                Ok jsonSites ->
                    case jsonDecodeSites jsonSites of
                        Ok data ->
                            update (GetDataEvents Nothing) { model | data_sites = DataSitesRequestSuccess (Just data) }

                        Err error ->
                            update ApplicationErrorShow
                                { model | error = Just (Json.Decode.errorToString error) }

                Err _ ->
                    ( { model | data_events = DataEventsRequestFailure }, Cmd.none )

        GetDataEvents maybeTableEventsOffset ->
            -- ( { model | data_events = DataEventsRequestPending }
            ( model
            , Http.post
                { url = serverUrl ++ "/show_events"

                -- , body = Http.stringBody "application/json" """{"limit": 1000,"offset": 0}"""
                , body =
                    Http.stringBody "application/json" <|
                        String.concat
                            [ "{"
                            , case model.shared_events_filter_by_site of
                                Just site ->
                                    String.concat
                                        [ "\"filter_by_site\": \""
                                        , site
                                        , "\","
                                        ]

                                Nothing ->
                                    ""
                            , "\"offset\":"
                            , String.fromInt <|
                                case maybeTableEventsOffset of
                                    Just tableEventsOffset ->
                                        tableEventsOffset

                                    Nothing ->
                                        0
                            , "}"
                            ]
                , expect = Http.expectString GotDataEvents -- * Go to next state: `GotDataEvents` *
                }
            )

        GotDataEvents result ->
            case result of
                Ok jsonValue ->
                    case model.shared_selected_event_id of
                        Just eventId ->
                            case jsonDecodeEventsResponse jsonValue of
                                Ok dataEvents ->
                                    case model.data_event of
                                        DataEventNoRequest ->
                                            update (GetDataEvent eventId) { model | data_events = DataEventsRequestSuccess (Just dataEvents) }

                                        _ ->
                                            ( { model | data_events = DataEventsRequestSuccess (Just dataEvents) }, Cmd.none )

                                Err error ->
                                    update ApplicationErrorShow { model | error = Just (Json.Decode.errorToString error) }

                        Nothing ->
                            ( model, sendMessage jsonValue )

                Err _ ->
                    ( { model | data_events = DataEventsRequestFailure }, Cmd.none )

        GetDataEvent eventId ->
            -- ( { model
            --     | data_event = DataEventRequestPending
            --     , data_event_req_body = DataEventReqBodyNoRequest
            --     , data_event_res_body = DataEventResBodyNoRequest
            --     , data_note = DataNoteNoRequest
            --     , state_note_editor = StateNoteEditorVoid
            --     , state_note_editor_input = ""
            --   }
            ( { model
                | data_event_req_body = DataEventReqBodyNoRequest
                , data_event_res_body = DataEventResBodyNoRequest
                , data_note = DataNoteNoRequest
                , state_note_editor = StateNoteEditorVoid
                , state_note_editor_input = ""
              }
            , Http.post
                { url = serverUrl ++ "/show_full_event"
                , body =
                    Http.stringBody "application/json" <|
                        String.concat
                            [ "{"
                            , "\"id\":"
                            , String.fromInt eventId
                            , "}"
                            ]
                , expect = Http.expectString GotDataEvent -- * Go to next state: `GotDataEvent` *
                }
            )

        GotDataEvent result ->
            case result of
                Ok jsonValue ->
                    case jsonDecodeDataEvent jsonValue of
                        Ok dataEvent ->
                            case dataEvent.note_id of
                                Just noteId ->
                                    ( { model
                                        | data_event = DataEventRequestSuccess dataEvent
                                        , state_note_editor = StateNoteEditorShow noteId
                                      }
                                    , Cmd.batch
                                        [ Task.perform GetDataEventResBody (Task.succeed dataEvent.id)
                                        , Task.perform GetDataEventReqBody (Task.succeed dataEvent.id)
                                        , Task.perform GetDataNote (Task.succeed noteId)
                                        ]
                                    )

                                Nothing ->
                                    ( { model | data_event = DataEventRequestSuccess dataEvent }
                                    , Cmd.batch
                                        [ Task.perform GetDataEventResBody (Task.succeed dataEvent.id)
                                        , Task.perform GetDataEventReqBody (Task.succeed dataEvent.id)
                                        ]
                                    )

                        Err error ->
                            update ApplicationErrorShow { model | error = Just (Json.Decode.errorToString error) }

                Err _ ->
                    ( { model | data_event = DataEventRequestFailure }, Cmd.none )

        GetDataNote noteId ->
            ( { model | data_note = DataNotePending }
            , Http.post
                { url = serverUrl ++ "/get_full_note"
                , body =
                    Http.stringBody "application/json" <|
                        String.concat
                            [ "{"
                            , "\"id\":"
                            , String.fromInt noteId
                            , "}"
                            ]
                , expect = Http.expectString GotDataNote -- * Go to next state: `GotDataNote` *
                }
            )

        GotDataNote result ->
            case result of
                Ok jsonValue ->
                    case jsonDecodeNoteEntry jsonValue of
                        Ok data ->
                            ( { model
                                | data_note = DataNoteSuccess data
                                , state_note_editor = StateNoteEditorShow data.id
                                , state_note_editor_input = data.note_content
                              }
                            , Cmd.none
                            )

                        Err error ->
                            update ApplicationErrorShow { model | error = Just (Json.Decode.errorToString error) }

                Err _ ->
                    ( { model | data_event = DataEventRequestFailure }, Cmd.none )

        NoteEditorUserTypedContent noteContent ->
            ( { model | state_note_editor_input = noteContent }, Cmd.none )

        GetDataEventReqBody eventId ->
            ( { model | data_event_req_body = DataEventReqBodyPending }
            , Http.post
                { url = serverUrl ++ "/get_event_req_body"
                , body =
                    Http.stringBody "application/json" <|
                        String.concat
                            [ "{"
                            , "\"id\":"
                            , String.fromInt eventId
                            , "}"
                            ]
                , expect = Http.expectString GotDataEventReqBody -- * Go to next state: `GotDataEventReqBody` *
                }
            )

        GotDataEventReqBody result ->
            case result of
                Ok jsonValue ->
                    case jsonDecodeRequestBody jsonValue of
                        Ok data ->
                            ( { model | data_event_req_body = DataEventReqBodySuccess data }, Cmd.none )

                        Err error ->
                            update ApplicationErrorShow { model | error = Just (Json.Decode.errorToString error) }

                Err _ ->
                    ( { model | data_event_req_body = DataEventReqBodyFailure }, Cmd.none )

        GetDataEventResBody eventId ->
            ( { model | data_event_res_body = DataEventResBodyPending }
            , Http.post
                { url = serverUrl ++ "/get_event_res_body"
                , body =
                    Http.stringBody "application/json" <|
                        String.concat
                            [ "{"
                            , "\"id\":"
                            , String.fromInt eventId
                            , "}"
                            ]
                , expect = Http.expectString GotDataEventResBody -- * Go to next state: `GotDataResBody` *
                }
            )

        GotDataEventResBody result ->
            case result of
                Ok jsonValue ->
                    case jsonDecodeResponseBody jsonValue of
                        Ok data ->
                            ( { model | data_event_res_body = DataEventResBodySuccess data }, Cmd.none )

                        Err error ->
                            update ApplicationErrorShow { model | error = Just (Json.Decode.errorToString error) }

                Err _ ->
                    ( { model | data_event_res_body = DataEventResBodyFailure }, Cmd.none )

        --------------------------
        --------------------------
        -- UserTypedSearch content ->
        --     ( { model | search = content }, searchSomeData content )
        -- UserTypedSearchClear ->
        --     ( { model | search = "" }, searchSomeData "" )
        FilterBySite site ->
            update (GetDataEvents Nothing) { model | shared_events_filter_by_site = Just site }

        ShowNoteEditor noteEditorStatus ->
            case noteEditorStatus of
                StateNoteEditorShow noteId ->
                    ( { model | state_note_editor = StateNoteEditorShow noteId }, Cmd.none )

                StateNoteEditorNewSave ->
                    update (SaveDataNote Nothing) { model | state_note_editor = StateNoteEditorNewSave }

                StateNoteEditorNewEdit ->
                    ( { model | state_note_editor = StateNoteEditorNewEdit }, Cmd.none )

                StateNoteEditorEdit noteId ->
                    ( { model | state_note_editor = StateNoteEditorEdit noteId }, Cmd.none )

                StateNoteEditorSaveEdit noteId ->
                    update (SaveDataNote (Just noteId)) { model | state_note_editor = StateNoteEditorSaveEdit noteId }

                StateNoteEditorVoid ->
                    ( { model | state_note_editor = StateNoteEditorVoid }, Cmd.none )

        SaveDataNote maybeNoteId ->
            case maybeNoteId of
                Just noteId ->
                    ( { model
                        | state_note_editor = StateNoteEditorVoid
                        , state_note_editor_input = ""
                      }
                    , Http.post
                        { url = serverUrl ++ "/update_note"
                        , body =
                            Http.stringBody "application/json" <|
                                String.concat
                                    [ "{"
                                    , "\"id\":"
                                    , String.fromInt noteId
                                    , ",\"note_content\":"
                                    , "\""
                                    , Base64.encode model.state_note_editor_input
                                    , "\""
                                    , "}"
                                    ]
                        , expect = Http.expectString SavedDataNote -- * Go to next state: `SavedDataNote` *
                        }
                    )

                Nothing ->
                    let
                        maybeEventId =
                            case model.data_event of
                                DataEventRequestSuccess dataEvent ->
                                    Just dataEvent.id

                                _ ->
                                    Nothing
                    in
                    case maybeEventId of
                        Just eventId ->
                            ( { model
                                | state_note_editor = StateNoteEditorVoid
                                , state_note_editor_input = ""
                              }
                            , Http.post
                                { url = serverUrl ++ "/create_note"
                                , body =
                                    Http.stringBody "application/json" <|
                                        String.concat
                                            [ "{"
                                            , "\"note_content\":"
                                            , "\""
                                            , Base64.encode model.state_note_editor_input
                                            , "\","
                                            , "\"event_id\":"
                                            , String.fromInt eventId
                                            , "}"
                                            ]
                                , expect = Http.expectString SavedDataNote -- * Go to next state: `SavedDataNote` *
                                }
                            )

                        Nothing ->
                            update ApplicationErrorShow { model | error = Just "Error on saving new Note" }

        SavedDataNote result ->
            case result of
                Ok _ ->
                    -- TODO: Fix Updated Note
                    case model.data_event of
                        DataEventRequestSuccess eventData ->
                            let
                                eventsOffset =
                                    case model.data_events of
                                        DataEventsRequestSuccess maybeDataEvents ->
                                            Maybe.map (\dataEvents -> dataEvents.offset) maybeDataEvents

                                        _ ->
                                            Nothing
                            in
                            ( { model | state_note_editor_input = "" }
                            , Cmd.batch
                                [ Task.perform GetDataEvents (Task.succeed eventsOffset)
                                , Task.perform GetDataEvent (Task.succeed eventData.id)
                                ]
                            )

                        _ ->
                            update (GetDataEvents Nothing) { model | state_note_editor_input = "" }

                -- update (GetDataEvents Nothing) { model | state_note_editor_input = "" }
                Err error ->
                    update ApplicationErrorShow { model | error = Just <| httpErrorToString error }

        ShowHttpEvent maybeEventId ->
            case maybeEventId of
                Just eventId ->
                    -- * Go to next state: `GetDataEvent eventId` *
                    update (GetDataEvent eventId) { model | shared_selected_event_id = maybeEventId }

                Nothing ->
                    ( { model
                        | shared_selected_event_id = maybeEventId
                        , data_event = DataEventNoRequest
                        , data_event_req_body = DataEventReqBodyNoRequest
                        , data_event_res_body = DataEventResBodyNoRequest
                        , data_note = DataNoteNoRequest
                        , state_note_editor = StateNoteEditorVoid
                      }
                    , Cmd.none
                    )

        ShowTab tabType ->
            ( { model | state_tabsbar = tabType }, Cmd.none )

        ReceivedDataFromJS jsonEvents ->
            case jsonDecodeEventsResponse jsonEvents of
                Ok data ->
                    ( { model | data_events = DataEventsRequestSuccess (Just data) }, Cmd.none )

                Err error ->
                    update ApplicationErrorShow { model | error = Just (Json.Decode.errorToString error) }



---- VIEW ----


view : Model -> Html Msg
view model =
    renderLayout model
