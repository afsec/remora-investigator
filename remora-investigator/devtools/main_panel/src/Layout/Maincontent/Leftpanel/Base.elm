module Layout.Maincontent.Leftpanel.Base exposing (leftPanel)

import Element
    exposing
        ( column
        , fill
        , height
        , px
        , width
        )
import Globaltypes exposing (Model, Msg(..))
import Layout.Maincontent.Leftpanel.Notespanel.Base exposing (panelNotes)
import Layout.Maincontent.Leftpanel.Sitespanel.Base exposing (sitesPanel)
import Ui.Widgets exposing (horizontalSplitter)



-- Panel Sites


leftPanel : Model -> Element.Element Msg
leftPanel model =
    column
        [ width <| px 300
        , height fill
        ]
        [ sitesPanel model
        , horizontalSplitter
        , panelNotes model
        ]
