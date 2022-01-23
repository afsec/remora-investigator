module Data.HttpDataEvent exposing (jsonDecodeDataEvent)
import Data.HttpDataEventHeaders exposing (httpEventHeaderListDecoder)
import Globaltypes exposing (HttpDataEvent)
import Json.Decode exposing (Decoder, decodeString, field, int, maybe, string, succeed)
import Json.Decode.Extra exposing (andMap)


jsonDecodeDataEvent : String -> Result Json.Decode.Error HttpDataEvent
jsonDecodeDataEvent jsonData =
    decodeString httpDataEventDecoder jsonData



-- jsonDecodeEvents : String -> Result Json.Decode.Error (List Httpevent)
-- jsonDecodeEvents jsonData =
--     decodeString httpEventListDecoder jsonData
-- * site  = scheme://authority -> RFC3986
-- isSelectedSite : Httpevent -> String -> Bool
-- isSelectedSite event site =
--     site == getSiteFromUrl event.request_url
-- Http Events FULL --


httpDataEventDecoder : Decoder HttpDataEvent
httpDataEventDecoder =
    succeed HttpDataEvent
        |> andMap (field "id" int)
        |> andMap (field "security_state" (maybe string))
        |> andMap (field "destination_port" (maybe int))
        |> andMap (field "server_ip_address" (maybe string))
        |> andMap (field "started_datetime" (maybe string))
        |> andMap (field "rtt" (maybe int))
        |> andMap (field "request_method" (maybe string))
        |> andMap (field "request_url" (maybe string))
        |> andMap (field "request_http_version" (maybe string))
        |> andMap (field "request_query_string" (maybe string))
        |> andMap (field "request_headers_size" (maybe int))
        |> andMap (field "request_headers" httpEventHeaderListDecoder)
        |> andMap (field "request_cookies" (maybe string))
        |> andMap (field "request_body_size" (maybe int))
        |> andMap (field "response_http_version" (maybe string))
        |> andMap (field "response_status_code" (maybe int))
        |> andMap (field "response_headers_size" (maybe int))
        |> andMap (field "response_headers" httpEventHeaderListDecoder)
        |> andMap (field "response_redirect_url" (maybe string))
        |> andMap (field "response_cookies" (maybe string))
        |> andMap (field "response_content_mimetype" (maybe string))
        |> andMap (field "response_content_size" (maybe int))
        |> andMap (field "response_body_size" (maybe int))
        |> andMap (field "note_id" (maybe int))



-- * DEBUG
-- if site == getSiteFromUrl event.url
--   then myDebug "getSiteFromUrl True event.url" (getSiteFromUrl event.url) True
--     |> myDebug "getSiteFromUrl True site" site
--   else myDebug "getSiteFromUrl False event.url" (getSiteFromUrl event.url) False
--     |> myDebug "getSiteFromUrl False site" site
