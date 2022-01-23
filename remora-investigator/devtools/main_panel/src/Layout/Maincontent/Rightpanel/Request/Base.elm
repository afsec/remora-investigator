module Layout.Maincontent.Rightpanel.Request.Base exposing (panelHttpViewerRequest)

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
import Globaltypes exposing (DataEventStatus(..), Model, Msg(..))
import Helpers exposing (humanReadableBytes)
import Layout.Maincontent.Rightpanel.Request.Bodypanel exposing (requestViewerBody)
import Layout.Maincontent.Rightpanel.Request.Headerspanel exposing (requestViewerHeaders)
import Monoicons.Png exposing (monoIcons)
import Ui.Colors exposing (color)
import Ui.Widgets
    exposing
        ( horizontalSplitter
        , toolbarButton
        , toolbarSeparatorX
        )



-- REQUEST


panelHttpViewerRequest : Model -> Element.Element Msg
panelHttpViewerRequest model =
    column
        [ width <| px <| floor (toFloat model.window_size_x * 0.37)
        , height fill
        ]
        [ requestToolbar model
        , requestViewer model
        ]


requestToolbar : Model -> Element.Element Msg
requestToolbar model =
    let
        maybeHeadersCount =
            case model.data_event of
                DataEventRequestSuccess event ->
                    Just (List.length event.request_headers)

                _ ->
                    Nothing

        maybeRequestBodySize =
            case model.data_event of
                DataEventRequestSuccess event ->
                    event.request_body_size

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
            (text "Request")
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
                    , toolbarButton monoIcons.backspace <| Just (ShowHttpEvent Nothing)
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
                                    [ case maybeRequestBodySize of
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
                                        humanReadableBytes maybeRequestBodySize

                                -- , "0 Bytes"
                                , el [] <| text <| ""
                                ]
                            , el [ Element.alignRight ] <|
                                row
                                    [ spacingXY 1 0
                                    , paddingEach { bottom = 0, top = 0, left = 0, right = 0 }
                                    , width fill
                                    ]
                                    [ toolbarButton monoIcons.edit Nothing

                                    --     , toolbarButton monoIcons.expand Nothing
                                    ]
                            ]

                    Nothing ->
                        Element.none

            Nothing ->
                Element.none
        ]


requestViewer : Model -> Element.Element msg
requestViewer model =
    column
        [ width fill
        , height fill
        ]
        [ requestViewerHeaders model
        , horizontalSplitter
        , requestViewerBody model
        ]
