module Layout.Maincontent.Rightpanel.Response.Bodypanel exposing (responseViewerBody)

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
import Globaltypes exposing (DataEventResBodyStatus(..), DataEventsStatus(..), DataEventStatus(..), Model, Msg(..))
import Monoicons.Gif exposing (monoIconsGif)
import Ui.Colors exposing (color)


responseViewerBody : Model -> Element.Element msg
responseViewerBody model =
    let
        dynamicBackgroundColor =
            case model.shared_selected_event_id of
                Just _ ->
                    case model.data_event of
                        DataEventRequestSuccess eventFull ->
                            case eventFull.response_body_size of
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
        [ renderResponseBody model ]


renderResponseBody : Model -> Element.Element msg
renderResponseBody model =
    case model.shared_selected_event_id of
        Just _ ->
            case model.data_event of
                DataEventRequestSuccess eventFull ->
                    case eventFull.response_body_size of
                        Just bodySize ->
                            if bodySize > 0 then
                                case model.data_event_res_body of
                                    DataEventResBodySuccess responseBody ->
                                        case responseBody.response_body_content of
                                            Just bodyContent ->
                                                case responseBody.response_body_encoding of
                                                    Just response_body_encoding ->
                                                        case response_body_encoding of
                                                            "image/png" ->
                                                                Element.row
                                                                    [ Element.centerX
                                                                    , Element.centerY
                                                                    , Border.width 1
                                                                    ]
                                                                    [ Element.image []
                                                                        { src = "data:image/png;base64, " ++ bodyContent
                                                                        , description = ""
                                                                        }
                                                                    ]

                                                            "image/jpeg" ->
                                                                Element.row
                                                                    [ Element.centerX
                                                                    , Element.centerY
                                                                    , Border.width 1
                                                                    ]
                                                                    [ Element.image []
                                                                        { src = "data:image/jpeg;base64, " ++ bodyContent
                                                                        , description = ""
                                                                        }
                                                                    ]

                                                            "image/gif" ->
                                                                Element.row
                                                                    [ Element.centerX
                                                                    , Element.centerY
                                                                    , Border.width 1
                                                                    ]
                                                                    [ Element.image []
                                                                        { src = "data:image/gif;base64, " ++ bodyContent
                                                                        , description = ""
                                                                        }
                                                                    ]

                                                            "image/webp" ->
                                                                Element.row
                                                                    [ Element.centerX
                                                                    , Element.centerY
                                                                    , Border.width 1
                                                                    ]
                                                                    [ Element.image []
                                                                        { src = "data:image/webp;base64, " ++ bodyContent
                                                                        , description = ""
                                                                        }
                                                                    ]

                                                            "image/vnd.microsoft.icon" ->
                                                                Element.row
                                                                    [ Element.centerX
                                                                    , Element.centerY
                                                                    , Border.width 1
                                                                    ]
                                                                    [ Element.image []
                                                                        { src = "data:image/vnd.microsoft.icon;base64, " ++ bodyContent
                                                                        , description = ""
                                                                        }
                                                                    ]

                                                            "image/x-icon" ->
                                                                Element.row
                                                                    [ Element.centerX
                                                                    , Element.centerY
                                                                    , Border.width 1
                                                                    ]
                                                                    [ Element.image []
                                                                        { src = "data:image/x-icon;base64, " ++ bodyContent
                                                                        , description = ""
                                                                        }
                                                                    ]

                                                            _ ->
                                                                Element.row [] [ text bodyContent ]

                                                    Nothing ->
                                                        Element.row [] [ text bodyContent ]

                                            Nothing ->
                                                Element.none

                                    DataEventResBodyPending ->
                                        if bodySize > 0 then
                                            Element.row [ Element.centerX, Element.centerY ] [ Element.image [ Element.alpha 0.7 ] { src = monoIconsGif.refresh, description = "Loading..." } ]

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
