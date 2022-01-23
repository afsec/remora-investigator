module Layout.Maincontent.Leftpanel.Sitespanel.Base exposing (sitesPanel)

import Element
    exposing
        ( column
        , fill
        , height
        , width
        )
import Globaltypes exposing (Model, Msg(..))
import Layout.Maincontent.Leftpanel.Sitespanel.Content exposing (sitesContent)
import Layout.Maincontent.Leftpanel.Sitespanel.Toolbar exposing (sitesPanelToolbar)


sitesPanel : Model -> Element.Element Msg
sitesPanel model =
    column
        [ width fill
        , height fill
        ]
        [ sitesPanelToolbar model
        , sitesContent model
        ]
