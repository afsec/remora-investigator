module Data.HttpDataEventHeaders exposing (httpEventHeaderListDecoder)

-- import Json.Decode exposing (Decoder, decodeString, field, int, list, maybe, string, succeed)

import Globaltypes exposing (HttpHeader)
import Json.Decode exposing (Decoder, field, list, string, succeed)
import Json.Decode.Extra exposing (andMap)



-- jsonDecodeEventHeaders : String -> Result Json.Decode.Error HttpDataEventHeaders
-- jsonDecodeEventHeaders jsonData =
--     decodeString httpEventHeadersDecoder jsonData
-- httpEventHeadersDecoder : Decoder HttpDataEventHeaders
-- httpEventHeadersDecoder =
--     succeed HttpDataEventHeaders
--         |> andMap (field "id" int)
--         |> andMap (field "request_headers" (maybe httpEventHeaderListDecoder))
--         |> andMap (field "response_headers" (maybe httpEventHeaderListDecoder))


httpEventHeaderListDecoder : Decoder (List HttpHeader)
httpEventHeaderListDecoder =
    list httpEventHeaderDecoder


httpEventHeaderDecoder : Decoder HttpHeader
httpEventHeaderDecoder =
    succeed HttpHeader
        |> andMap (field "name" string)
        |> andMap (field "value" string)
