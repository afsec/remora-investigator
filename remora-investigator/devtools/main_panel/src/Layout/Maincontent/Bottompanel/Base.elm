module Layout.Maincontent.Bottompanel.Base exposing (bottomPanel)

import Element
    exposing
        ( column
        , el
        , fill
        , height
        , px
        , row
        , spacingXY
        , width
        )
import Element.Background as Background
import Element.Border as Border
import Element.Events as Events
import Element.Font as Font
import Globaltypes
    exposing
        ( DataEventsStatus(..)
        , DataSitesStatus(..)
        , Model
        , Msg(..)
        , Tabtype(..)
        , tabtypeGet2ndLine
        , tabtypeToString
        )
import Layout.Maincontent.Bottompanel.Tab.Alerts.Base exposing (alertsTab)
import Layout.Maincontent.Bottompanel.Tab.History.Base exposing (historyTab)
import Layout.Maincontent.Bottompanel.Tab.Logbook.Base exposing (logbookTab)
import Layout.Maincontent.Bottompanel.Tab.Notes.Base exposing (notesTab)
import Ui.Colors exposing (color)


bottomPanel : Model -> Element.Element Msg
bottomPanel model =
    row
        [ height <| px 200
        , width fill
        , Border.widthEach { bottom = 1, top = 0, left = 0, right = 0 }
        , Border.color color.darkGrey
        ]
        [ tabsBar model -- Left(Tabs): History, Notes, Requests, Alerts
        , showTabContent model -- Right: Events table
        ]


tabsBar : Model -> Element.Element Msg
tabsBar model =
    column
        [ height fill
        , width <| px 80
        , Background.color color.grey
        , Border.widthEach { bottom = 0, top = 1, left = 0, right = 1 }
        , Border.color color.darkGrey
        ]
        [ column
            [ Element.centerY
            , spacingXY 0 10
            ]
            [ tabItem History model
            , tabItem Notes model
            , tabItem Alerts model
            , tabItem Logbook model
            ]
        ]


tabItem : Tabtype -> Model -> Element.Element Msg
tabItem tabType model =
    let
        renderedTabName =
            tabtypeToString tabType

        renderedTabName2ndLine =
            tabtypeGet2ndLine tabType

        dynamicBackground =
            if tabType == model.state_tabsbar then
                Background.color color.white

            else
                Background.color color.grey

        dynamicPointer =
            if tabType == model.state_tabsbar then
                Background.color color.white

            else
                Element.pointer

        dynamicRightBorder =
            if tabType == model.state_tabsbar then
                Border.widthEach { bottom = 1, top = 1, left = 0, right = 0 }

            else
                Border.widthEach { bottom = 1, top = 1, left = 0, right = 1 }
    in
    el
        [ width <| px 80
        , height <| px 30
        , Font.size 12
        , Border.color color.darkGrey
        , Element.mouseOver [ Background.color color.white ]
        , Events.onClick <| ShowTab tabType

        -- * mouseOver tab (Background color must be white)
        , dynamicBackground

        -- * Clicked tab (Pointer)
        , dynamicPointer

        -- * Clicked tab (No right border)
        , dynamicRightBorder
        ]
    <|
        column
            [ Element.centerX
            , Element.centerY
            , Font.center
            ]
            [ el [ Element.centerX ] (Element.text renderedTabName)
            , el [ Element.centerX ] (Element.text renderedTabName2ndLine)
            ]


showTabContent : Model -> Element.Element Msg
showTabContent model =
    column
        [ width fill
        , height fill
        , Background.color color.white
        , Border.widthEach { bottom = 0, top = 1, left = 0, right = 1 }
        , Border.color color.darkGrey
        ]
    <|
        case model.state_tabsbar of
            History ->
                historyTab model

            Notes ->
                notesTab model

            Logbook ->
                logbookTab model

            Alerts ->
                alertsTab model
