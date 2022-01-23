module Layout.Maincontent.Bottompanel.Tab.Logbook.Base exposing (logbookTab)

import Element exposing (el, text)
import Globaltypes exposing (Model, Msg, tabtypeToString)


logbookTab : Model -> List (Element.Element Msg)
logbookTab model =
    [ el [] <| text <| "" ++ tabtypeToString model.state_tabsbar ++ "Tab" ]
