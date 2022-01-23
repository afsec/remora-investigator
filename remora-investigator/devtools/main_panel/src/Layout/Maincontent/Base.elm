module Layout.Maincontent.Base exposing (mainContent)

import Element
    exposing
        ( column
        , el
        , fill
        , height
        , row
        , width
        )
import Element.Border as Border
import Globaltypes exposing (Msg(..))
import Layout.Maincontent.Bottompanel.Base exposing (bottomPanel)

import Layout.Maincontent.Rightpanel.Base exposing (rightPanel)
import Ui.Colors exposing (color)
import Ui.Widgets
    exposing
        ( horizontalSplitter
        , verticalSplitter
        )
import Globaltypes exposing (Model)
import Layout.Maincontent.Leftpanel.Base exposing (leftPanel)


mainContent : Model -> Element.Element Msg
mainContent model =
    el
        [ width fill
        , height fill
        , Border.widthEach { bottom = 0, top = 1, left = 0, right = 0 }
        , Border.color color.white
        ]
    <|
        column
            [ width fill
            , height fill
            ]
            [ row
                [ width fill
                , height fill
                ]
                [ leftPanel model
                , verticalSplitter
                , rightPanel model
                ]
            , horizontalSplitter

            -- TODO: Implement tabs: History, Websockets, Custom Requests
            , bottomPanel model
            ]
