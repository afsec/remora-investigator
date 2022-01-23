module Layout.Maincontent.Leftpanel.Notespanel.Base exposing (panelNotes)

import Element
    exposing
        ( column
        , fill
        , height
        , width
        )
import Globaltypes
    exposing
        ( Model
        , Msg(..)
        )
import Layout.Maincontent.Leftpanel.Notespanel.Content exposing (panelNotesContent)
import Layout.Maincontent.Leftpanel.Notespanel.Toolbar exposing (panelNotesToolbar)


panelNotes : Model -> Element.Element Msg
panelNotes model =
    column
        [ width fill
        , height fill
        ]
        [ panelNotesToolbar model
        , panelNotesContent model
        ]
