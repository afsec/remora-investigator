module Layout.Maincontent.Rightpanel.Response.Base exposing (panelHttpViewerResponse)

import Element
    exposing
        ( column
        , el
        , fill
        , height
        , paddingEach
        , px
        , row
        , spacingXY
        , text
        , width
        )
import Element.Border as Border
import Element.Font as Font
import Globaltypes exposing (DataEventsStatus(..), DataEventStatus(..), Model, Msg(..))
import Helpers exposing (humanReadableBytes)
import Layout.Maincontent.Rightpanel.Response.Bodypanel exposing (responseViewerBody)
import Layout.Maincontent.Rightpanel.Response.Headerspanel exposing (responseViewerHeaders)
import Monoicons.Png exposing (monoIcons)
import Ui.Colors exposing (color)
import Ui.Widgets
    exposing
        ( horizontalSplitter
        , toolbarButton
        , toolbarSeparatorX
        )



-- REQUEST


panelHttpViewerResponse : Model -> Element.Element Msg
panelHttpViewerResponse model =
    column
        [ width <| px <| ((model.window_size_x - 300) - floor (toFloat model.window_size_x * 0.37) - 12)
        , height fill
        ]
        [ responseToolbar model
        , responseViewer model
        ]


responseToolbar : Model -> Element.Element Msg
responseToolbar model =
    let
        maybeHeadersCount =
            case model.data_event of
                DataEventRequestSuccess eventFull ->
                    Just (List.length eventFull.response_headers)

                _ ->
                    Nothing

        maybeResponseBodySize =
            case model.data_event of
                DataEventRequestSuccess eventFull ->
                    eventFull.response_body_size

                _ ->
                    Nothing
    in
    row
        [ width fill
        , height <| px 28
        , Border.color color.darkGrey
        , Border.widthEach { bottom = 0, top = 0, left = 1, right = 1 }
        , Font.family [ Font.monospace ]
        ]
        [ el
            [ paddingEach { bottom = 5, top = 5, left = 5, right = 1 }
            , Font.size 16
            , Font.center
            , Font.family [ Font.sansSerif ]
            ]
            (text "Response")
        , case model.shared_selected_event_id of
            Just eventId ->
                row []
                    [ el [ Element.alignLeft, Font.bold ] <|
                        text <|
                            String.concat
                                [ " "
                                , "id:"
                                , String.fromInt eventId
                                , ""
                                ]

                    -- , toolbarButton monoIcons.backspace <| Just (ShowHttpEvent Nothing)
                    ]

            Nothing ->
                Element.none
        , toolbarSeparatorX
        , case model.shared_selected_event_id of
            Just _ ->
                case maybeHeadersCount of
                    Just headersCount ->
                        row
                            [ width fill
                            ]
                            [ row [ Element.alignLeft ]
                                [ el [] <| text <| "Headers: "
                                , el
                                    [ if headersCount > 0 then
                                        Font.bold

                                      else
                                        Font.regular
                                    ]
                                  <|
                                    text <|
                                        String.fromInt headersCount
                                , el [] <| text <| " | Body size: "
                                , el
                                    [ case maybeResponseBodySize of
                                        Just bodySize ->
                                            if bodySize > 0 then
                                                Font.bold

                                            else
                                                Font.regular

                                        Nothing ->
                                            Font.regular
                                    ]
                                  <|
                                    text <|
                                        humanReadableBytes maybeResponseBodySize

                                -- , "0 Bytes"
                                , el [] <| text <| ""
                                ]
                            , el [ Element.alignRight ] <|
                                row
                                    [ spacingXY 1 0
                                    , paddingEach { bottom = 0, top = 0, left = 0, right = 0 }
                                    , width fill
                                    ]
                                    [ toolbarButton monoIcons.message Nothing -- ? Have websocket ?
                                    , toolbarButton monoIcons.circle_information Nothing -- ? Open modal with full metadata ?

                                    --     , toolbarButton monoIcons.expand Nothing
                                    ]
                            ]

                    Nothing ->
                        Element.none

            Nothing ->
                Element.none
        ]


responseViewer : Model -> Element.Element msg
responseViewer model =
    column
        [ width fill
        , height fill
        ]
        [ responseViewerHeaders model
        , horizontalSplitter
        , responseViewerBody model
        ]
