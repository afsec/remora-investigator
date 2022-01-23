module Globaltypes exposing
    ( DataEventReqBodyStatus(..)
    , DataEventResBodyStatus(..)
    , DataEventStatus(..)
    , DataEventsStatus(..)
    , DataNoteStatus(..)
    , DataSitesStatus(..)
    , EventsResponse
    , Flags
    , HttpDataEvent
    , HttpDataEventHeaders
    , HttpHeader
    , Httpevent
    , HttpeventRequestbody
    , HttpeventResponsebody
    , Model
    , Msg(..)
    , NoteEntry
    , SiteEntry
    , SitesReponse
    , StateNoteEditor(..)
    , Tabtype(..)
    , tabtypeGet2ndLine
    , tabtypeToString
    )

import Http



-- FLAGS


type alias Flags =
    { x : Int
    , y : Int
    , ua : String
    }



-- MODEL


type alias Model =
    { data_event : DataEventStatus
    , data_event_req_body : DataEventReqBodyStatus
    , data_event_res_body : DataEventResBodyStatus
    , data_events : DataEventsStatus
    , data_note : DataNoteStatus
    , data_notes : List NoteEntry
    , data_sites : DataSitesStatus
    , error : Maybe String
    , shared_events_filter_by_site : Maybe String
    , shared_selected_event_id : Maybe Int
    , state_highlighted_event_id : Maybe Int
    , state_note_editor : StateNoteEditor
    , state_note_editor_input : String
    , state_tabsbar : Tabtype
    , ua : String
    , window_size_x : Int
    , window_size_y : Int
    }



-- MSG


type
    Msg
    -- * States
    = ApplicationErrorShow
    | FilterBySite String
    | NoteEditorUserTypedContent String
    | OnResize Int Int
    | ReceivedDataFromJS String
    | SaveDataNote (Maybe Int)
    | SavedDataNote (Result Http.Error String)
    | ShowHttpEvent (Maybe Int)
    | ShowNoteEditor StateNoteEditor
    | ShowTab Tabtype
    | TableLineHighLighted (Maybe Int)
      -- * Data
    | GetDataEvent Int
    | GotDataEvent (Result Http.Error String)
    | GetDataEvents (Maybe Int)
    | GotDataEvents (Result Http.Error String)
    | GetDataNote Int
    | GotDataNote (Result Http.Error String)
    | GetDataEventReqBody Int
    | GotDataEventReqBody (Result Http.Error String)
    | GetDataEventResBody Int
    | GotDataEventResBody (Result Http.Error String)
    | GetDataSites
    | GotDataSites (Result Http.Error String)



-- SITES


type DataSitesStatus
    = DataSitesNoRequest
    | DataSitesRequestPending
    | DataSitesRequestFailure
    | DataSitesRequestSuccess (Maybe SitesReponse)


type alias SitesReponse =
    { total_events : Int
    , total_sites : Int
    , sites : List SiteEntry
    }


type alias SiteEntry =
    { site : String
    , events : Int
    }



-- EVENTS


type DataEventsStatus
    = DataEventsNoRequest
    -- | DataEventsRequestPending
    | DataEventsRequestFailure
    | DataEventsRequestSuccess (Maybe EventsResponse)


type alias EventsResponse =
    { events_found : Int
    , offset : Int
    , events : List Httpevent
    }


type alias Httpevent =
    { id : Int
    , started_datetime : Maybe String
    , rtt : Maybe Int
    , request_method : Maybe String
    , request_url : Maybe String
    , request_http_version : Maybe String
    , response_status_code : Maybe Int
    , response_content_mimetype : Maybe String
    , response_body_size : Maybe Int
    , note_id : Maybe Int
    , row_position : Int
    }



-- DATA EVENT


type DataEventStatus
    = DataEventNoRequest
    -- | DataEventRequestPending
    | DataEventRequestFailure
    | DataEventRequestSuccess HttpDataEvent


type alias HttpDataEvent =
    { id : Int
    , security_state : Maybe String
    , destination_port : Maybe Int
    , server_ip_address : Maybe String
    , started_datetime : Maybe String
    , rtt : Maybe Int
    , request_method : Maybe String
    , request_url : Maybe String
    , request_http_version : Maybe String
    , request_query_string : Maybe String
    , request_headers_size : Maybe Int
    , request_headers : List HttpHeader
    , request_cookies : Maybe String
    , request_body_size : Maybe Int
    , response_http_version : Maybe String
    , response_status_code : Maybe Int
    , response_headers_size : Maybe Int
    , response_headers : List HttpHeader
    , response_redirect_url : Maybe String
    , response_cookies : Maybe String
    , response_content_mimetype : Maybe String
    , response_content_size : Maybe Int
    , response_body_size : Maybe Int
    , note_id : Maybe Int
    }



-- HTTP Event Headers (/get_headers)


type alias HttpDataEventHeaders =
    { id : Int
    , request_headers : Maybe (List HttpHeader)
    , response_headers : Maybe (List HttpHeader)
    }


type alias HttpHeader =
    { name : String
    , value : String
    }



-- Fetch Request Body


type DataEventReqBodyStatus
    = DataEventReqBodyNoRequest
    | DataEventReqBodyPending
    | DataEventReqBodyFailure
    | DataEventReqBodySuccess HttpeventRequestbody



-- Fetch Response Body


type DataEventResBodyStatus
    = DataEventResBodyNoRequest
    | DataEventResBodyPending
    | DataEventResBodyFailure
    | DataEventResBodySuccess HttpeventResponsebody



-- RequestBody


type alias HttpeventRequestbody =
    { id : Int
    , request_postdata_mimetype : Maybe String
    , request_postdata_params : Maybe String
    , request_postdata_text : Maybe String
    }



-- ResponseBody


type alias HttpeventResponsebody =
    { id : Int
    , response_body_encoding : Maybe String
    , response_body_content : Maybe String
    }



-- NOTES


type DataNoteStatus
    = DataNoteNoRequest
    | DataNotePending
    | DataNoteFailure
    | DataNoteSuccess NoteEntry



-- NoteResponseBody


type alias NoteEntry =
    { id : Int
    , note_content : String
    , event_id : Int
    , created_at : Int
    , updated_at : Int
    }



-- Note Editor


type StateNoteEditor
    = StateNoteEditorVoid
    | StateNoteEditorNewEdit
    | StateNoteEditorNewSave
    | StateNoteEditorShow Int
    | StateNoteEditorEdit Int
    | StateNoteEditorSaveEdit Int



-- TABS


type Tabtype
    = History
    | Notes
    | Alerts
    | Logbook


tabtypeToString : Tabtype -> String
tabtypeToString tabType =
    case tabType of
        History ->
            "History"

        Notes ->
            "Notes"

        Logbook ->
            "Logbook"

        Alerts ->
            "Alerts"


tabtypeGet2ndLine : Tabtype -> String
tabtypeGet2ndLine tabType =
    case tabType of
        History ->
            "(Browser)"

        Notes ->
            "(Events)"

        Logbook ->
            "(Analysis)"

        Alerts ->
            "(Risks)"
