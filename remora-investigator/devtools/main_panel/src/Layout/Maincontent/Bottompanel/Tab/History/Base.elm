module Layout.Maincontent.Bottompanel.Tab.History.Base exposing (..)

import Element
    exposing
        ( centerX
        , column
        , el
        , fill
        , height
        , paddingXY
        , px
        , row
        , spacingXY
        , text
        , width
        )
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font
import Globaltypes exposing (DataEventsStatus(..), DataSitesStatus(..), Model, Msg(..), Tabtype(..))
import Layout.Maincontent.Bottompanel.Tab.History.Table exposing (historyTable)
import Monoicons.Png exposing (monoIcons)
import Parser
import Ui.Colors exposing (color)
import Ui.Widgets exposing (toolbarButton)


historyTab : Model -> List (Element.Element Msg)
historyTab model =
    [ row
        [ width fill
        , height fill
        ]
        [ historyPaginator model
        , historyTable model
        ]
    ]


historyPaginator : Model -> Element.Element Msg
historyPaginator model =
    column
        [ width <| px 100
        , height fill
        , Element.paddingEach { bottom = 10, top = 10, right = 0, left = 10 }

        -- , Background.color color.red
        ]
        [ column
            [ width fill
            , height fill
            , Border.width 1
            , Border.color color.darkGrey
            , Border.rounded 5
            , Background.color color.grey
            ]
            [ column
                [ width fill

                -- , height fill
                , Element.centerX
                , Element.centerY
                , paddingXY 0 5
                , spacingXY 0 2

                -- , Background.color color.red
                ]
                [ column
                    [ width fill
                    , height <| px 35

                    -- , Background.color color.blue
                    , centerX
                    ]
                    [ el [ width fill, height fill ] <|
                        el [ centerX ] <|
                            text "Events"
                    , el [ width fill, height fill ] <|
                        el [ centerX ] <|
                            text <|
                                case model.data_events of
                                    DataEventsRequestSuccess maybeResponseEvents ->
                                        case maybeResponseEvents of
                                            Just responseEvents ->
                                                String.fromInt <| responseEvents.events_found

                                            Nothing ->
                                                " "

                                    _ ->
                                        " "
                    ]
                , column
                    [ height <| px 10
                    , width fill

                    -- , Background.color color.red
                    , Font.family [ Font.monospace ]
                    ]
                    [ el
                        [ width <| px 75
                        , height <| px 5
                        , Element.centerX
                        , Border.widthEach { bottom = 1, top = 0, right = 0, left = 0 }
                        , Border.color color.darkGrey
                        ]
                      <|
                        Element.none
                    , el
                        [ width <| px 75
                        , height <| px 5
                        , Element.centerX
                        , Border.widthEach { bottom = 0, top = 1, right = 0, left = 0 }
                        , Border.color color.white
                        ]
                      <|
                        Element.none
                    ]
                , row
                    [ height <| px 24
                    , Font.family [ Font.monospace ]
                    , Font.color color.darkGrey
                    , Element.centerX

                    -- , Background.color color.red
                    ]
                    [ el [] <|
                        text "Page"
                    ]
                , row
                    [ height <| px 24
                    , Font.family [ Font.monospace ]
                    , Element.centerX
                    ]
                    [ el
                        [ Font.center
                        , width <| px 30
                        , height <| px 25
                        ]
                      <|
                        el
                            [ Element.centerX
                            , Element.centerY
                            ]
                        <|
                            text <|
                                case model.data_events of
                                    DataEventsRequestSuccess maybeResponseEvents ->
                                        case maybeResponseEvents of
                                            Just responseEvents ->
                                                String.fromInt <|
                                                    if responseEvents.offset > 0 then
                                                        truncate (toFloat (responseEvents.offset + 20) / 20)

                                                    else if responseEvents.events_found == 0 then
                                                        0

                                                    else
                                                        1

                                            Nothing ->
                                                " "

                                    _ ->
                                        " "
                    , el
                        [ Font.center
                        , width <| px 20
                        , height <| px 25
                        ]
                      <|
                        el
                            [ Element.centerX
                            , Element.centerY
                            ]
                        <|
                            text <|
                                case model.data_events of
                                    DataEventsRequestSuccess _ ->
                                        "of"

                                    _ ->
                                        "  "
                    , el
                        [ Font.center
                        , width <| px 30
                        , height <| px 25
                        ]
                      <|
                        el
                            [ Element.centerX
                            , Element.centerY
                            ]
                        <|
                            text <|
                                case model.data_events of
                                    DataEventsRequestSuccess maybeResponseEvents ->
                                        case maybeResponseEvents of
                                            Just responseEvents ->
                                                String.fromInt <| calculatePages responseEvents

                                            Nothing ->
                                                " "

                                    _ ->
                                        " "
                    ]
                , row
                    [ height <| px 24
                    , Font.family [ Font.monospace ]
                    , Element.centerX
                    ]
                    [ el [] <|
                        case model.data_events of
                            DataEventsRequestSuccess maybeResponseEvents ->
                                case maybeResponseEvents of
                                    Just responseEvents ->
                                        if responseEvents.offset < 20 then
                                            el [ width <| px 30, height <| px 24 ] <| Element.none

                                        else
                                            toolbarButton monoIcons.chevron_left <|
                                                Just <|
                                                    GetDataEvents <|
                                                        if responseEvents.offset > 20 then
                                                            Just (responseEvents.offset - 20)

                                                        else
                                                            Just 0

                                    Nothing ->
                                        el [ width <| px 30, height <| px 24 ] <| Element.none

                            _ ->
                                el [ width <| px 30, height <| px 24 ] <| Element.none
                    , el
                        [ Element.centerX
                        , Element.centerY
                        , paddingXY 5 10
                        , Border.widthEach { bottom = 0, top = 0, right = 1, left = 0 }
                        , Border.color color.darkGrey
                        ]
                      <|
                        Element.none
                    , el
                        [ Element.centerX
                        , Element.centerY
                        , paddingXY 5 10
                        , Border.widthEach { bottom = 0, top = 0, right = 0, left = 1 }
                        , Border.color color.white
                        ]
                      <|
                        Element.none
                    , el [] <|
                        case model.data_events of
                            DataEventsRequestSuccess maybeResponseEvents ->
                                case maybeResponseEvents of
                                    Just responseEvents ->
                                        if responseEvents.offset > responseEvents.events_found - 21 then
                                            el [ width <| px 30, height <| px 24 ] <| Element.none

                                        else
                                            toolbarButton monoIcons.chevron_right <|
                                                Just <|
                                                    GetDataEvents <|
                                                        -- Just ((responseEvents.offset + 1) * 20)
                                                        if responseEvents.offset > 0 then
                                                            Just (responseEvents.offset + 20)

                                                        else
                                                            Just 20

                                    Nothing ->
                                        el [ width <| px 30, height <| px 24 ] <| Element.none

                            _ ->
                                el [ width <| px 30, height <| px 24 ] <| Element.none
                    ]
                , row
                    [ height <| px 24
                    , Font.family [ Font.monospace ]
                    , Element.centerX
                    ]
                    [ el [] <|
                        case model.data_events of
                            DataEventsRequestSuccess maybeResponseEvents ->
                                case maybeResponseEvents of
                                    Just responseEvents ->
                                        if responseEvents.offset < 20 then
                                            el
                                                [ width <| px 30
                                                , height <| px 24
                                                ]
                                            <|
                                                Element.none

                                        else
                                            toolbarButton monoIcons.chevron_double_left <|
                                                Just <|
                                                    GetDataEvents <|
                                                        Just 0

                                    Nothing ->
                                        el
                                            [ width <| px 30
                                            , height <| px 24
                                            ]
                                        <|
                                            Element.none

                            _ ->
                                el [ width <| px 30, height <| px 24 ] <| Element.none
                    , el
                        [ Element.centerX
                        , Element.centerY
                        , paddingXY 5 10
                        , Border.widthEach { bottom = 0, top = 0, right = 1, left = 0 }
                        , Border.color color.darkGrey
                        ]
                      <|
                        Element.none
                    , el
                        [ Element.centerX
                        , Element.centerY
                        , paddingXY 5 10
                        , Border.widthEach { bottom = 0, top = 0, right = 0, left = 1 }
                        , Border.color color.white
                        ]
                      <|
                        Element.none
                    , el [] <|
                        -- toolbarButton monoIcons.chevron_double_right   Nothing
                        case model.data_events of
                            DataEventsRequestSuccess maybeResponseEvents ->
                                case maybeResponseEvents of
                                    Just responseEvents ->
                                        if responseEvents.offset > responseEvents.events_found - 21 then
                                            el [ width <| px 30, height <| px 24 ] <| Element.none

                                        else
                                            toolbarButton monoIcons.chevron_double_right <|
                                                Just <|
                                                    GetDataEvents <|
                                                        Just ((calculatePages responseEvents - 1) * 20)

                                    Nothing ->
                                        el [ width <| px 30, height <| px 24 ] <| Element.none

                            _ ->
                                el [ width <| px 30, height <| px 24 ] <| Element.none
                    ]
                ]
            ]
        ]


calculatePages : { a | events_found : Int } -> Int
calculatePages responseEvents =
    let
        itemsPerPage =
            20

        -- TODO: Implement `//` Integer division operator
        divResFloat =
            toFloat responseEvents.events_found / itemsPerPage

        divResInt =
            truncate divResFloat
    in
    if isHigherThanFloor divResFloat then
        divResInt + 1

    else
        divResInt


isHigherThanFloor : Float -> Bool
isHigherThanFloor divResFloat =
    let
        maybeFloatFloor : Maybe Float
        maybeFloatFloor =
            Result.toMaybe <|
                Parser.run Parser.float <|
                    String.concat
                        [ String.fromInt <| truncate divResFloat
                        , ".0"
                        ]
    in
    case maybeFloatFloor of
        Just floatFloor ->
            divResFloat > floatFloor

        Nothing ->
            False
