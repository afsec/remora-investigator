module Data.HttpDataEventReqBody exposing (jsonDecodeRequestBody)

import Globaltypes exposing (HttpeventRequestbody)
import Json.Decode exposing (Decoder, decodeString, field, int, maybe, string, succeed)
import Json.Decode.Extra exposing (andMap)


jsonDecodeRequestBody : String -> Result Json.Decode.Error HttpeventRequestbody
jsonDecodeRequestBody jsonData =
    decodeString requestBodyDecoder jsonData


requestBodyDecoder : Decoder HttpeventRequestbody
requestBodyDecoder =
    succeed HttpeventRequestbody
        |> andMap (field "id" int)
        |> andMap (field "request_postdata_mimetype" (maybe string))
        |> andMap (field "request_postdata_params" (maybe string))
        |> andMap (field "request_postdata_text" (maybe string))



-- * DEBUG
-- if site == getSiteFromUrl event.url
--   then myDebug "getSiteFromUrl True event.url" (getSiteFromUrl event.url) True
--     |> myDebug "getSiteFromUrl True site" site
--   else myDebug "getSiteFromUrl False event.url" (getSiteFromUrl event.url) False
--     |> myDebug "getSiteFromUrl False site" site
