module Helpers exposing (httpErrorToString, humanReadableBytes, humanReadableMillis, isMaybe, renderStatusCodeReason)

import Duration
import Filesize exposing (formatBase2)
import Http
import Round


isMaybe : Maybe a -> Bool
isMaybe maybe =
    case maybe of
        Just _ ->
            True

        Nothing ->
            False


httpErrorToString : Http.Error -> String
httpErrorToString httpError =
    case httpError of
        Http.BadUrl url ->
            "Http.BadUrl: [" ++ url ++ "]"

        Http.Timeout ->
            "Http.Timeout"

        Http.NetworkError ->
            "Http.NetworkError"

        Http.BadStatus statusCode ->
            "Http.BadStatus: [" ++ String.fromInt statusCode ++ "]"

        Http.BadBody body ->
            "Http.BadBody: [" ++ body ++ "]"


humanReadableBytes : Maybe Int -> String
humanReadableBytes maybeBytes =
    case maybeBytes of
        Just bytes ->
            formatBase2 bytes

        Nothing ->
            formatBase2 0


humanReadableMillis : Maybe Int -> String
humanReadableMillis maybeMillis =
    case maybeMillis of
        Just millis ->
            if millis > 1000 then
                String.concat
                    [ toFloat millis
                        |> Duration.milliseconds
                        |> Duration.inSeconds
                        |> Round.round 2
                    , " s "
                    ]

            else
                String.concat
                    [ String.fromInt millis
                    , " ms "
                    ]

        Nothing ->
            String.concat
                [ String.fromInt 0
                , " ms "
                ]


renderStatusCodeReason : Int -> String
renderStatusCodeReason statusCode =
    -- References: RFC6585, RFC7231, RFC2616
    case statusCode of
        100 ->
            "Continue"

        101 ->
            "Switching Protocols"

        200 ->
            "OK"

        201 ->
            "Created"

        202 ->
            "Accepted"

        203 ->
            "Non-Authoritative Information"

        204 ->
            "No Content"

        205 ->
            "Reset Content"

        206 ->
            "Partial Content"

        300 ->
            "Multiple Choices"

        301 ->
            "Moved Permanently"

        302 ->
            "Found"

        303 ->
            "See Other"

        304 ->
            "Not Modified"

        305 ->
            "Use Proxy"

        306 ->
            "(Unused)"

        307 ->
            "Temporary Redirect"

        400 ->
            "Bad Request"

        402 ->
            "Payment Required"

        403 ->
            "Forbidden"

        404 ->
            "Not Found"

        405 ->
            "Method Not Allowed"

        406 ->
            "Not Acceptable"

        408 ->
            "Request Timeout"

        409 ->
            "Conflict"

        410 ->
            "Gone"

        411 ->
            "Length Required"

        413 ->
            "Payload Too Large"

        414 ->
            "URI Too Long"

        415 ->
            "Unsupported Media Type"

        417 ->
            "Expectation Failed"

        426 ->
            "Upgrade Required"

        428 ->
            "Precondition Required"

        429 ->
            "Too Many Requests"

        431 ->
            "Request Header Fields Too Large"

        500 ->
            "Internal Server Error"

        501 ->
            "Not Implemented"

        502 ->
            "Bad Gateway"

        503 ->
            "Service Unavailable"

        504 ->
            "Gateway Timeout"

        505 ->
            "HTTP Version Not Supported"

        511 ->
            "Network Authentication Required"

        _ ->
            "Unknown code"
