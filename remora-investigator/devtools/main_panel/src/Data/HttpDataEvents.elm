-- module Datahttpevents exposing (Httpevent, decodeHttpEvents)


module Data.HttpDataEvents exposing
    ( filterEventsById
    , getEventById
    , getSiteFromUrl
    , getUrlFromEvents
    , jsonDecodeEventsResponse
    )

-- import Globaltypes exposing (DataEventsStatus(..))
-- import Globaltypes exposing (HttpDataEvent)
-- import Globaltypes exposing ( Msg(..))

import Globaltypes exposing (EventsResponse, Httpevent)
import Json.Decode exposing (Decoder, decodeString, field, int, list, maybe, string, succeed)
import Json.Decode.Extra exposing (andMap)
import List.Extra exposing (last)



-- import Mydebug exposing (myDebug)


httpEventsResponseDecoder : Decoder EventsResponse
httpEventsResponseDecoder =
    succeed EventsResponse
        |> andMap (field "events_found" int)
        |> andMap (field "offset" int)
        |> andMap (field "events" httpEventListDecoder)


httpEventListDecoder : Decoder (List Httpevent)
httpEventListDecoder =
    list httpEventDecoder



-- httpEventDecoder : Decoder Httpevent
-- httpEventDecoder =
--     succeed Httpevent
--         |> andMap (field "id" int)
--         |> andMap (field "protocol" string)
--         |> andMap (field "reqTimestamp" string)
--         |> andMap (field "method" string)
--         |> andMap (field "url" string)
--         |> andMap (field "code" int)
--         |> andMap (field "rtt" string)
--         |> andMap (field "sizeRespBody" int)
--         |> andMap (field "notes" string)
------------------------


httpEventDecoder : Decoder Httpevent
httpEventDecoder =
    succeed Httpevent
        |> andMap (field "id" int)
        |> andMap (field "started_datetime" (maybe string))
        |> andMap (field "rtt" (maybe int))
        |> andMap (field "request_method" (maybe string))
        |> andMap (field "request_url" (maybe string))
        |> andMap (field "request_http_version" (maybe string))
        |> andMap (field "response_status_code" (maybe int))
        |> andMap (field "response_content_mimetype" (maybe string))
        |> andMap (field "response_body_size" (maybe int))
        |> andMap (field "note_id" (maybe int))
        |> andMap (field "row_position" int)


jsonDecodeEventsResponse : String -> Result Json.Decode.Error EventsResponse
jsonDecodeEventsResponse jsonData =
    decodeString httpEventsResponseDecoder jsonData



-- jsonDecodeEvents : String -> Result Json.Decode.Error (List Httpevent)
-- jsonDecodeEvents jsonData =
--     decodeString httpEventListDecoder jsonData


getUrlFromEvents : Maybe (List Httpevent) -> List String
getUrlFromEvents events =
    case events of
        Just data ->
            data
                |> List.map
                    (\event ->
                        case event.request_url of
                            Just url ->
                                url

                            Nothing ->
                                ""
                    )
                |> List.filter (\item -> String.length item > 0)

        Nothing ->
            []


getSiteFromUrl : String -> String
getSiteFromUrl url =
    String.join "/" <| List.take 3 <| String.split "/" url



-- filterEventsBySite : Maybe (List Httpevent) -> Maybe String -> List Httpevent
-- filterEventsBySite maybeEvents maybeSite =
--     case maybeSite of
--         Just site ->
--             case maybeEvents of
--                 Just events ->
--                     List.filter (\event -> isSelectedSite event site) events
--                 Nothing ->
--                     []
--         Nothing ->
--             case maybeEvents of
--                 Just events ->
--                     events
--                 Nothing ->
--                     []
-- Scene| Maybe a | Maybe b
-- 1    | Nothing | Nothing
-- 2    | Nothing | Just b
-- 3    | Just a  | Nothing
-- 4    | Just a  | Just b


getEventById : Maybe EventsResponse -> Maybe Int -> Maybe Httpevent
getEventById maybeEventsResponse maybeEventId =
    last <|
        case maybeEventId of
            Just eventId ->
                List.filter (\event -> event.id == eventId) <|
                    case maybeEventsResponse of
                        Just eventsResponse ->
                            eventsResponse.events

                        Nothing ->
                            []

            Nothing ->
                []


filterEventsById : List Httpevent -> Int -> List Httpevent
filterEventsById events eventId =
    List.filter (\event -> event.id == eventId) events



-- * site  = scheme://authority -> RFC3986
-- isSelectedSite : Httpevent -> String -> Bool
-- isSelectedSite event site =
--     site == getSiteFromUrl event.request_url
-- Http Events FULL --
-- httpEventAllFieldsDecoder : Decoder HttpDataEvent
-- httpEventAllFieldsDecoder =
--     succeed HttpDataEvent
--         |> andMap (field "id" int)
--         |> andMap (field "security_state" string)
--         |> andMap (field "destination_port" int)
--         |> andMap (field "server_ip_address" string)
--         |> andMap (field "started_datetime" string)
--         |> andMap (field "rtt" int)
--         |> andMap (field "request_method" string)
--         |> andMap (field "request_url" string)
--         |> andMap (field "request_http_version" string)
--         |> andMap (field "request_query_string" string)
--         |> andMap (field "request_headers_size" int)
--         |> andMap (field "request_headers" string)
--         |> andMap (field "request_cookies" string)
--         |> andMap (field "request_body_size" int)
--         |> andMap (field "request_postdata_mimetype" string)
--         |> andMap (field "response_http_version" string)
--         |> andMap (field "response_status_code" int)
--         |> andMap (field "response_headers_size" int)
--         |> andMap (field "response_headers" string)
--         |> andMap (field "response_redirect_url" string)
--         |> andMap (field "response_cookies" string)
--         |> andMap (field "response_content_mimetype" string)
--         |> andMap (field "response_content_size" int)
--         |> andMap (field "response_body_size" int)
--         |> andMap (field "response_body_encoding" string)
-- * DEBUG
-- if site == getSiteFromUrl event.url
--   then myDebug "getSiteFromUrl True event.url" (getSiteFromUrl event.url) True
--     |> myDebug "getSiteFromUrl True site" site
--   else myDebug "getSiteFromUrl False event.url" (getSiteFromUrl event.url) False
--     |> myDebug "getSiteFromUrl False site" site
