module Layout.Base exposing (renderLayout)
import Element
    exposing
        ( clip
        , column
        , fill
        , height
        , layout
        , width
        )
import Element.Background as Background
import Element.Font as Font
import Globaltypes exposing (DataEventsStatus(..), DataSitesStatus(..), Model, Msg(..), Tabtype(..))
import Html exposing (Html)
import Layout.Maincontent.Base exposing (mainContent)
import Layout.Statusbar exposing (statusBar)
import Ui.Colors exposing (color)

renderLayout : Model -> Html Msg
renderLayout model = layout
        [ width fill
        , height fill
        , clip
        , Background.color color.grey
        , Font.size 14
        , Font.family [ Font.sansSerif ]
        ]
    <|
        column
            [ width fill
            , height fill
            ]
            [ -- topBar model  -- TOOLBAR (Supports more than one)
              mainContent model -- MAIN CONTENT (Sites + Request + Response)
            , statusBar model
            ]