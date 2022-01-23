module Layout.Maincontent.Bottompanel.Tab.Notes.Base exposing (notesTab)

import Element exposing (el, text)
import Globaltypes exposing (Model, Msg, tabtypeToString)


notesTab : Model -> List (Element.Element Msg)
notesTab model =
    [ el [] <| text <| "" ++ tabtypeToString model.state_tabsbar ++ "Tab" ]
