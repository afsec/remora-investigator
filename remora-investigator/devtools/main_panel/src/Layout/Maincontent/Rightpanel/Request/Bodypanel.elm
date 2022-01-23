module Layout.Maincontent.Rightpanel.Request.Bodypanel exposing (requestViewerBody)

import Element
    exposing
        ( column
        , fill
        , height
        , text
        , width
        )
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font
import Globaltypes exposing (DataEventReqBodyStatus(..), DataEventsStatus(..), DataEventStatus(..), Model, Msg(..))
import Ui.Colors exposing (color)


requestViewerBody : Model -> Element.Element msg
requestViewerBody model =
    let
        dynamicBackgroundColor =
            case model.shared_selected_event_id of
                Just _ ->
                    case model.data_event of
                        DataEventRequestSuccess event ->
                            case event.request_body_size of
                                Just bodySize ->
                                    if bodySize > 0 then
                                        Background.color color.white

                                    else
                                        Background.color color.lightGrey

                                Nothing ->
                                    Background.color color.lightGrey

                        _ ->
                            Background.color color.lightGrey

                Nothing ->
                    Background.color color.lightGrey
    in
    column
        [ Border.color color.darkGrey
        , Border.rounded 2
        , Border.width 1

        -- , width <| px 400
        , width fill -- TODO calculate width size to make scrollbars work
        , height fill -- TODO calculate height size to make scrollbars work
        , dynamicBackgroundColor
        , Element.scrollbars
        , Font.family [ Font.monospace ]
        ]
    <|
        [ renderRequestBody model ]


renderRequestBody : Model -> Element.Element msg
renderRequestBody model =
    case model.shared_selected_event_id of
        Just _ ->
            case model.data_event of
                DataEventRequestSuccess event ->
                    case event.request_body_size of
                        Just bodySize ->
                            if bodySize > 0 then
                                case model.data_event_req_body of
                                    DataEventReqBodySuccess requestBody ->
                                        case requestBody.request_postdata_text of
                                            Just postdataText ->
                                                Element.row []
                                                    [ text postdataText
                                                    ]

                                            Nothing ->
                                                Element.none

                                    DataEventReqBodyPending ->
                                        if bodySize > 0 then
                                            Element.row [ Element.centerX, Element.centerY ] [ text "Loading..." ]

                                        else
                                            Element.none

                                    _ ->
                                        Element.none

                            else
                                Element.none

                        Nothing ->
                            Element.none

                -- DataEventRequestPending ->
                --     Element.row [ Element.centerX, Element.centerY ] [ text "Loading..." ]

                _ ->
                    Element.none

        Nothing ->
            Element.none
