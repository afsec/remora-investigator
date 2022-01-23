module Data.HttpDataNote exposing (jsonDecodeNoteEntry)

import Globaltypes exposing (NoteEntry)
import Json.Decode exposing (Decoder, decodeString, field, int, string, succeed)
import Json.Decode.Extra exposing (andMap)


jsonDecodeNoteEntry : String -> Result Json.Decode.Error NoteEntry
jsonDecodeNoteEntry jsonData =
    decodeString requestBodyDecoder jsonData


requestBodyDecoder : Decoder NoteEntry
requestBodyDecoder =
    succeed NoteEntry
        |> andMap (field "id" int)
        |> andMap (field "note_content" string)
        |> andMap (field "event_id" int)
        |> andMap (field "created_at" int)
        |> andMap (field "updated_at" int)



-- * DEBUG
-- if site == getSiteFromUrl event.url
--   then myDebug "getSiteFromUrl True event.url" (getSiteFromUrl event.url) True
--     |> myDebug "getSiteFromUrl True site" site
--   else myDebug "getSiteFromUrl False event.url" (getSiteFromUrl event.url) False
--     |> myDebug "getSiteFromUrl False site" site
