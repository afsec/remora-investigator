module Layout.Maincontent.Rightpanel.Response.Headerspanel exposing (responseViewerHeaders)

import Element
    exposing
        ( column
        , fill
        , height
        , paddingXY
        , text
        , width
        )
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font
import Globaltypes exposing (DataEventsStatus(..), DataEventStatus(..), HttpHeader, HttpDataEvent, Model, Msg(..))
import Helpers exposing (renderStatusCodeReason)
import Ui.Colors exposing (color)


responseViewerHeaders : Model -> Element.Element msg
responseViewerHeaders model =
    column
        [ Border.color color.darkGrey
        , Border.rounded 2
        , Border.width 1
        , paddingXY 3 3
        , width fill
        , height fill
        , case model.shared_selected_event_id of
            Just _ ->
                Background.color color.white

            Nothing ->
                Background.color color.lightGrey
        , Element.scrollbars
        , Font.family [ Font.monospace ]
        ]
    <|
        case model.shared_selected_event_id of
            Just _ ->
                case model.data_event of
                    DataEventRequestSuccess eventFull ->
                        [ renderResponseHttpVersionStatusCodeAndReason eventFull
                        , renderResponseHeaders eventFull
                        ]

                    -- DataEventRequestPending ->
                    --     [ Element.row [ Element.centerX, Element.centerY ] [ text "Loading..." ] ]

                    _ ->
                        []

            Nothing ->
                []


renderResponseHttpVersionStatusCodeAndReason : HttpDataEvent -> Element.Element msg
renderResponseHttpVersionStatusCodeAndReason eventFull =
    Element.row
        [ Font.semiBold
        , Element.paddingEach { top = 0, right = 0, bottom = 2, left = 0 }
        ]
        [ let
            responseHttpVersion =
                case eventFull.response_http_version of
                    Just data ->
                        data

                    Nothing ->
                        ""

            requestHttpVersion =
                case eventFull.request_http_version of
                    Just data ->
                        data

                    Nothing ->
                        ""
          in
          Element.row
            [ if responseHttpVersion == requestHttpVersion then
                Font.regular

              else
                Font.color color.redRemora
            ]
            [ text responseHttpVersion
            ]
        , text <| " "
        , Element.row [ Font.semiBold ]
            [ text <|
                case eventFull.response_status_code of
                    Just statusCode ->
                        String.fromInt statusCode

                    Nothing ->
                        ""
            ]
        , text <| " "
        , Element.row
            [ case eventFull.response_status_code of
                Just statusCode ->
                    if statusCode > 499 then
                        Font.color color.red

                    else if statusCode > 399 then
                        Font.color color.blueTest

                    else if statusCode > 299 then
                        Font.color color.blueTest

                    else
                        Font.regular

                Nothing ->
                    Font.regular
            ]
            [ text <|
                case eventFull.response_status_code of
                    Just statusCode ->
                        renderStatusCodeReason statusCode

                    Nothing ->
                        ""
            ]
        , text <| " "
        ]


renderResponseHeaders : HttpDataEvent -> Element.Element msg
renderResponseHeaders eventFull =
    Element.column [] <| List.map (\header -> renderHeaderRow header) eventFull.response_headers


renderHeaderRow : HttpHeader -> Element.Element msg
renderHeaderRow header =
    Element.row []
        [ Element.row [ Font.bold ] [ text (header.name ++ ": ") ]
        , Element.row [] [ text header.value ]
        ]
