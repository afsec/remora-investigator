module Layout.Maincontent.Bottompanel.Tab.History.Table exposing (cellTDUrl, historyTable)

{-| -}

-- Local imports

import Element
    exposing
        ( Element
        , column
        , fill
        , height
        , mouseOver
        , pointer
        , px
        , scrollbars
        , text
        , width
        )
import Element.Background as Background
import Element.Border as Border
import Element.Events as Events
import Element.Font as Font
import Globaltypes exposing (DataEventsStatus(..), DataSitesStatus(..), Httpevent, Model, Msg(..))
import Helpers exposing (humanReadableBytes, humanReadableMillis)
import Monoicons.Png exposing (monoIcons)
import Ui.Colors exposing (color)



-- eventsFilter : Maybe (List Httpevent) -> Maybe String -> List Httpevent
-- eventsFilter httpEvents maybeSite =
--     filterEventsBySite httpEvents maybeSite
-- unwrapEvents : DataEventsStatus -> Maybe (List Httpevent)
-- unwrapEvents events =
--     case events of
--         DataEventsRequestSuccess maybeEventsResponse ->
--             case maybeEventsResponse of
--                 Just eventsResponse ->
--                     Just eventsResponse.events
--                 Nothing ->
--                     Nothing
--         _ ->
--             Nothing


historyTable : Model -> Element Msg
historyTable model =
    column
        [ width fill
        , height fill
        , scrollbars
        ]
        [ Element.table
            [ width fill
            , height fill
            , Element.scrollbars
            , Element.padding 10
            , Background.color color.white
            , Element.spacing 1
            , Font.size 12
            ]
            { data =
                case model.data_events of
                    DataEventsRequestSuccess maybeEventResponse ->
                        case maybeEventResponse of
                            Just eventResponse ->
                                eventResponse.events

                            Nothing ->
                                []

                    _ ->
                        []

            -- data = httpEvents
            , columns =
                [ { header = cellTH "id"
                  , width = px 40
                  , view =
                        \httpEvent -> cellTD httpEvent model <| Maybe.map (\id -> String.fromInt id) (Just httpEvent.id)
                  }
                , { header = cellTH "Protocol"
                  , width = px 80
                  , view =
                        \httpEvent -> cellTDProtocol httpEvent model
                  }
                , { header = cellTH "Req. Timestamp"
                  , width = px 230
                  , view =
                        \httpEvent -> cellTD httpEvent model httpEvent.started_datetime
                  }
                , { header = cellTH "Method"
                  , width = px 70
                  , view =
                        \httpEvent -> cellTD httpEvent model httpEvent.request_method
                  }
                , { header = cellTH "URL"
                  , width = px 370
                  , view =
                        \httpEvent -> cellTDUrl httpEvent model
                  }
                , { header = cellTH "Status"
                  , width = px 55
                  , view =
                        \httpEvent -> cellTD httpEvent model <| Maybe.map (\statusCode -> String.fromInt statusCode) httpEvent.response_status_code
                  }
                , { header = cellTH "Format"
                  , width = px 75
                  , view =
                        \httpEvent ->
                            cellTD httpEvent
                                model
                            <|
                                getContentType httpEvent.response_content_mimetype
                  }
                , { header = cellTH "RTT"
                  , width = px 60
                  , view =
                        \httpEvent -> cellTDRtt httpEvent model
                  }
                , { header = cellTH "Resp. Body"
                  , width = px 90
                  , view =
                        \httpEvent -> cellTDRespSizeBody httpEvent model
                  }
                , { header = cellTH "Notes"
                  , width = fill
                  , view =
                        \httpEvent -> cellTDNotes httpEvent model
                  }
                ]
            }
        ]


getContentType : Maybe String -> Maybe String
getContentType maybeRespContMime =
    Maybe.andThen
        (\mimeType ->
            String.split ";" mimeType
                |> List.head
                |> (\maybeMimeFormat ->
                        Maybe.andThen
                            (\mimeFormat ->
                                String.split "/" mimeFormat
                                    |> List.reverse
                                    |> List.head
                                    |> Maybe.map (\content -> contentFormatLimitString content)
                            )
                            maybeMimeFormat
                   )
        )
        maybeRespContMime


contentFormatLimitString : String -> String
contentFormatLimitString content =
    let
        maxLength =
            10
    in
    if String.length content > maxLength then
        String.slice 0 maxLength content

    else
        content


cellTH : String -> Element msg
cellTH labelText =
    Element.row
        [ Border.widthEach { bottom = 1, top = 1, left = 1, right = 1 }
        , Border.rounded 1
        , Border.color color.darkGrey
        , mouseOver [ Background.color color.blueRemora ]

        -- , Background.color color.cyan
        , pointer
        , width fill
        , height <| px 20
        , Font.size 14
        ]
        [ Element.row
            [ Element.centerX

            -- , Background.color color.red
            , height <| px 20
            , case labelText of
                "Notes" ->
                    Font.size 12

                _ ->
                    Font.regular
            ]
            [ text labelText
            , case labelText of
                "id" ->
                    Element.el []
                        (Element.image
                            [ width <| px 20
                            , height <| px 20
                            ]
                            { src = monoIcons.caret_up
                            , description = "caret up"
                            }
                        )

                _ ->
                    -- Element.el
                    --     [ width <| px 20
                    --     , height <| px 20
                    --     ]
                    -- <|
                    Element.none
            ]
        ]


cellTD : Httpevent -> Model -> Maybe String -> Element Msg
cellTD currentEvent model maybeContent =
    let
        maybeLastRenderedEventId =
            model.shared_selected_event_id

        currentRowId =
            currentEvent.id

        currentRowPosition =
            currentEvent.row_position

        maybeHighlightRowId =
            model.state_highlighted_event_id

        resStatusCode =
            case currentEvent.response_status_code of
                Just code ->
                    code

                Nothing ->
                    0

        content =
            case maybeContent of
                Just data ->
                    data

                Nothing ->
                    ""
    in
    Element.el
        [ Border.widthEach { bottom = 0, top = 0, left = 0, right = 0 }
        , height <| px 14
        , pointer
        , Events.onMouseEnter <| TableLineHighLighted (Just currentRowId)
        , Events.onMouseLeave <| TableLineHighLighted Nothing
        , Events.onClick <| ShowHttpEvent (Just currentRowId)
        , dynamicTDBackground currentRowId maybeLastRenderedEventId maybeHighlightRowId currentRowPosition
        ]
    <|
        Element.el
            [ Element.centerX
            , Font.family [ Font.monospace ]
            , Font.size 12
            , if resStatusCode == 0 then
                Font.color color.darkGrey

              else
                Font.color color.black
            ]
        <|
            text content



-- cellTDProtocol : Int -> Maybe Int -> Maybe Int -> String -> Element Msg
-- cellTDProtocol currentRowId maybeLastRenderedEventId maybeHighlightRowId content =


cellTDProtocol : Httpevent -> { a | shared_selected_event_id : Maybe Int, state_highlighted_event_id : Maybe Int } -> Element Msg
cellTDProtocol currentEvent model =
    let
        maybeLastRenderedEventId =
            model.shared_selected_event_id

        currentRowId =
            currentEvent.id

        currentRowPosition =
            currentEvent.row_position

        maybeHighlightRowId =
            model.state_highlighted_event_id

        content =
            case currentEvent.request_http_version of
                Just httpVersion ->
                    httpVersion

                Nothing ->
                    ""

        resStatusCode =
            case currentEvent.response_status_code of
                Just code ->
                    code

                Nothing ->
                    0
    in
    Element.el
        [ Border.widthEach { bottom = 0, top = 0, left = 0, right = 0 }
        , height <| px 14
        , pointer
        , Events.onMouseEnter <| TableLineHighLighted (Just currentRowId)
        , Events.onMouseLeave <| TableLineHighLighted Nothing
        , Events.onClick <| ShowHttpEvent (Just currentRowId)
        , dynamicTDBackground currentRowId maybeLastRenderedEventId maybeHighlightRowId currentRowPosition
        ]
    <|
        Element.el
            [ Element.alignLeft
            , Font.family [ Font.monospace ]
            , Font.size 12
            , if resStatusCode == 0 then
                Font.color color.darkGrey

              else
                Font.color color.black
            ]
            (text <|
                String.concat
                    [ " "
                    , cellTDUrlLimitString content
                    ]
            )


cellTDUrl : Httpevent -> { a | shared_selected_event_id : Maybe Int, state_highlighted_event_id : Maybe Int } -> Element Msg
cellTDUrl currentEvent model =
    let
        maybeLastRenderedEventId =
            model.shared_selected_event_id

        currentRowId =
            currentEvent.id

        currentRowPosition =
            currentEvent.row_position

        maybeHighlightRowId =
            model.state_highlighted_event_id

        content =
            case currentEvent.request_url of
                Just requestUrl ->
                    requestUrl

                Nothing ->
                    ""

        resStatusCode =
            case currentEvent.response_status_code of
                Just code ->
                    code

                Nothing ->
                    0
    in
    Element.el
        [ Border.widthEach { bottom = 0, top = 0, left = 0, right = 0 }
        , height <| px 14
        , pointer
        , Events.onMouseEnter <| TableLineHighLighted (Just currentRowId)
        , Events.onMouseLeave <| TableLineHighLighted Nothing
        , Events.onClick <| ShowHttpEvent (Just currentRowId)
        , dynamicTDBackground currentRowId maybeLastRenderedEventId maybeHighlightRowId currentRowPosition
        ]
    <|
        Element.el
            [ Element.alignLeft
            , Font.family [ Font.monospace ]
            , Font.size 12
            , if resStatusCode == 0 then
                Font.color color.darkGrey

              else
                Font.color color.black
            ]
        <|
            (text <|
                String.concat
                    [ " "
                    , cellTDUrlLimitString content
                    ]
            )



-- cellTDRtt : Int -> Maybe Int -> Maybe Int -> String -> Element Msg


cellTDRtt : Httpevent -> { a | shared_selected_event_id : Maybe Int, state_highlighted_event_id : Maybe Int } -> Element Msg
cellTDRtt currentEvent model =
    let
        maybeLastRenderedEventId =
            model.shared_selected_event_id

        currentRowId =
            currentEvent.id

        currentRowPosition =
            currentEvent.row_position

        maybeHighlightRowId =
            model.state_highlighted_event_id

        content =
            currentEvent.rtt

        resStatusCode =
            case currentEvent.response_status_code of
                Just code ->
                    code

                Nothing ->
                    0
    in
    Element.el
        [ Border.widthEach { bottom = 0, top = 0, left = 0, right = 0 }
        , height <| px 14
        , pointer
        , Events.onMouseEnter <| TableLineHighLighted (Just currentRowId)
        , Events.onMouseLeave <| TableLineHighLighted Nothing
        , Events.onClick <| ShowHttpEvent (Just currentRowId)
        , dynamicTDBackground currentRowId maybeLastRenderedEventId maybeHighlightRowId currentRowPosition
        ]
    <|
        Element.el
            [ Element.alignRight
            , Font.family [ Font.monospace ]
            , Font.size 12
            , if resStatusCode == 0 then
                Font.color color.darkGrey

              else
                Font.color color.black
            ]
        <|
            text <|
                String.concat [ humanReadableMillis content ]


cellTDRespSizeBody : Httpevent -> Model -> Element Msg
cellTDRespSizeBody currentEvent model =
    let
        maybeLastRenderedEventId =
            model.shared_selected_event_id

        currentRowId =
            currentEvent.id

        currentRowPosition =
            currentEvent.row_position

        maybeHighlightRowId =
            model.state_highlighted_event_id

        content =
            currentEvent.response_body_size

        resStatusCode =
            case currentEvent.response_status_code of
                Just code ->
                    code

                Nothing ->
                    0
    in
    Element.el
        [ Border.widthEach { bottom = 0, top = 0, left = 0, right = 0 }
        , height <| px 14
        , pointer
        , Events.onMouseEnter <| TableLineHighLighted (Just currentRowId)
        , Events.onMouseLeave <| TableLineHighLighted Nothing
        , Events.onClick <| ShowHttpEvent (Just currentRowId)
        , dynamicTDBackground currentRowId maybeLastRenderedEventId maybeHighlightRowId currentRowPosition
        ]
    <|
        Element.el
            [ Element.alignRight
            , Font.family [ Font.monospace ]
            , Font.size 12
            , if resStatusCode == 0 then
                Font.color color.darkGrey

              else
                Font.color color.black
            ]
        <|
            text <|
                String.concat
                    [ humanReadableBytes content
                    , " "
                    ]


cellTDNotes : Httpevent -> { a | shared_selected_event_id : Maybe Int, state_highlighted_event_id : Maybe Int } -> Element Msg
cellTDNotes currentEvent model =
    let
        maybeLastRenderedEventId =
            model.shared_selected_event_id

        currentRowId =
            currentEvent.id

        currentRowPosition =
            currentEvent.row_position

        maybeHighlightRowId =
            model.state_highlighted_event_id

        resStatusCode =
            case currentEvent.response_status_code of
                Just code ->
                    code

                Nothing ->
                    0
    in
    Element.el
        [ Border.widthEach { bottom = 0, top = 0, left = 0, right = 0 }
        , height <| px 14
        , pointer
        , Events.onMouseEnter <| TableLineHighLighted (Just currentRowId)
        , Events.onMouseLeave <| TableLineHighLighted Nothing
        , Events.onClick <| ShowHttpEvent (Just currentRowId)
        , dynamicTDBackground currentRowId maybeLastRenderedEventId maybeHighlightRowId currentRowPosition
        ]
    <|
        Element.el
            [ Font.family [ Font.monospace ]
            , Font.size 12
            , Element.centerX
            , if resStatusCode == 0 then
                Font.color color.darkGrey

              else
                Font.color color.black
            ]
        <|
            text <|
                case currentEvent.note_id of
                    Just _ ->
                        "X"

                    Nothing ->
                        ""


cellTDUrlLimitString : String -> String
cellTDUrlLimitString content =
    if String.length content > 51 then
        String.concat
            [ String.slice 0 47 content
            , "..."
            ]

    else
        content


dynamicTDBackground : Int -> Maybe Int -> Maybe Int -> Int -> Element.Attr decorative msg
dynamicTDBackground currentRowId maybeLastRenderedEventId maybeHighlightRowId currentRowPosition =
    case maybeLastRenderedEventId of
        Just lastRenderedEventId ->
            if currentRowId == lastRenderedEventId then
                Background.color color.lightBlue

            else
                case maybeHighlightRowId of
                    Just rowIdToHighlight ->
                        if currentRowId == rowIdToHighlight then
                            Background.color color.lightYellow

                        else
                            colorFromRowPosition currentRowPosition

                    Nothing ->
                        colorFromRowPosition currentRowPosition

        Nothing ->
            case maybeHighlightRowId of
                Just rowIdToHighlight ->
                    if currentRowId == rowIdToHighlight then
                        Background.color color.lightYellow

                    else
                        colorFromRowPosition currentRowPosition

                Nothing ->
                    colorFromRowPosition currentRowPosition


colorFromRowPosition : Int -> Element.Attr decorative msg
colorFromRowPosition currentRowPosition =
    Background.color <|
        if remainderBy 2 currentRowPosition == 0 then
            color.lightGrey

        else
            color.white
