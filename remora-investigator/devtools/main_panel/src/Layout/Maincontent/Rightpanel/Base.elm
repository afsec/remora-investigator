module Layout.Maincontent.Rightpanel.Base exposing (rightPanel)

import Element
    exposing
        ( fill
        , height
        , row
        , width
        )
import Globaltypes exposing (Model, Msg(..))
import Layout.Maincontent.Rightpanel.Request.Base exposing (panelHttpViewerRequest)
import Layout.Maincontent.Rightpanel.Response.Base exposing (panelHttpViewerResponse)
import Ui.Widgets
    exposing
        ( verticalSplitter
        )


rightPanel : Model -> Element.Element Msg
rightPanel model =
    row
        [ width fill
        , height fill
        ]
        [ panelHttpViewerRequest model
        , verticalSplitter
        , panelHttpViewerResponse model
        ]
