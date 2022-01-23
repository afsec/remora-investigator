module Data.HttpDataEventResBody exposing (jsonDecodeResponseBody)

import Globaltypes exposing (HttpeventResponsebody)
import Json.Decode exposing (Decoder, decodeString, field, int, maybe, string, succeed)
import Json.Decode.Extra exposing (andMap)


jsonDecodeResponseBody : String -> Result Json.Decode.Error HttpeventResponsebody
jsonDecodeResponseBody jsonData =
    decodeString responseBodyDecoder jsonData


responseBodyDecoder : Decoder HttpeventResponsebody
responseBodyDecoder =
    succeed HttpeventResponsebody
        |> andMap (field "id" int)
        |> andMap (field "response_body_encoding" (maybe string))
        |> andMap (field "response_body_content" (maybe string))



-- * DEBUG
-- if site == getSiteFromUrl event.url
--   then myDebug "getSiteFromUrl True event.url" (getSiteFromUrl event.url) True
--     |> myDebug "getSiteFromUrl True site" site
--   else myDebug "getSiteFromUrl False event.url" (getSiteFromUrl event.url) False
--     |> myDebug "getSiteFromUrl False site" site
