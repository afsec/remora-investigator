module Layout.Maincontent.Rightpanel.Request.Headerspanel exposing (requestViewerHeaders)

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
import Ui.Colors exposing (color)


requestViewerHeaders : Model -> Element.Element msg
requestViewerHeaders model =
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
                        [ renderRequestMethodUrlHttpVersion eventFull
                        , renderRequestHeaders eventFull
                        ]

                    -- DataEventRequestPending ->
                    --     [ Element.row [ Element.centerX, Element.centerY ] [ text "Loading..." ] ]

                    _ ->
                        []

            Nothing ->
                []


renderRequestMethodUrlHttpVersion : HttpDataEvent -> Element.Element msg
renderRequestMethodUrlHttpVersion eventFull =
    Element.row
        [ Font.semiBold
        , Element.paddingEach { top = 0, right = 0, bottom = 2, left = 0 }
        ]
        [ text <|
            case eventFull.request_method of
                Just requestMethod ->
                    requestMethod

                Nothing ->
                    ""
        , text <| " "
        , Element.row [ Font.color color.blue ]
            [ text <|
                case eventFull.request_url of
                    Just requestUrl ->
                        requestUrl

                    Nothing ->
                        ""
            ]
        , text <| " "
        , text <|
            case eventFull.request_http_version of
                Just requestHttpVersion ->
                    requestHttpVersion

                Nothing ->
                    ""
        ]


renderRequestHeaders : HttpDataEvent -> Element.Element msg
renderRequestHeaders eventFull =
    Element.column [] <| List.map (\header -> renderHeaderRow header) eventFull.request_headers


renderHeaderRow : HttpHeader -> Element.Element msg
renderHeaderRow header =
    Element.row []
        [ Element.row [ Font.bold ] [ text (header.name ++ ": ") ]
        , Element.row [] [ text header.value ]
        ]
