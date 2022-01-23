module Layout.Maincontent.Bottompanel.Tab.Alerts.Base exposing (alertsTab)

import Element exposing (el, text)
import Globaltypes exposing (Model, Msg, tabtypeToString)


alertsTab : Model -> List (Element.Element Msg)
alertsTab model =
    [ el [] <| text <| "" ++ tabtypeToString model.state_tabsbar ++ "Tab"
    ]
