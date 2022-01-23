module Data.HttpDataSites exposing (jsonDecodeSites)

import Globaltypes exposing (SiteEntry, SitesReponse)
import Json.Decode exposing (Decoder, decodeString, field, int, list, string, succeed)
import Json.Decode.Extra exposing (andMap)


sitesResponseDecoder : Decoder SitesReponse
sitesResponseDecoder =
    succeed SitesReponse
        |> andMap (field "total_events" int)
        |> andMap (field "total_sites" int)
        |> andMap (field "sites" siteEntryListDecoder)


siteEntryListDecoder : Decoder (List SiteEntry)
siteEntryListDecoder =
    list siteEntryDecoder


siteEntryDecoder : Decoder SiteEntry
siteEntryDecoder =
    succeed SiteEntry
        |> andMap (field "site" string)
        |> andMap (field "events" int)


jsonDecodeSites : String -> Result Json.Decode.Error SitesReponse
jsonDecodeSites jsonData =
    decodeString sitesResponseDecoder jsonData
