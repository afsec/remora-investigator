module Layout.Topbar exposing (myToolbar, topBar)

import Element
    exposing
        ( el
        , fill
        , height
        , px
        , row
        , spacingXY
        , text
        , width
        )
import Element.Border as Border
import Globaltypes exposing (Model, Msg(..))
import Monoicons.Png exposing (monoIcons)
import Ui.Colors exposing (color)
import Ui.Widgets
    exposing
        ( toolbarButton
        --   , toolbarSearch
        , toolbarSeparatorX
        )


topBar : Model -> Element.Element Msg
topBar _ =
    el
        [ width fill
        , Border.widthEach { bottom = 1, top = 0, left = 0, right = 0 }
        , Border.color color.darkGrey
        ]
    <|
        row
            [ width fill
            ]
            [ myToolbar
                [ toolbarButton monoIcons.add Nothing
                , toolbarButton monoIcons.ban Nothing
                , toolbarSeparatorX
                , toolbarButton monoIcons.calendar Nothing
                , toolbarButton monoIcons.compass Nothing
                , toolbarButton monoIcons.email Nothing
                , toolbarSeparatorX
                , toolbarButton monoIcons.cloud Nothing
                , toolbarButton monoIcons.location Nothing
                , toolbarButton monoIcons.grid Nothing
                , el [ Element.alignRight ] <| toolbarSeparatorX
                , el [ Element.alignRight ] <| text "Search:"
                -- , toolbarSearch model.search UserTypedSearch
                -- , toolbarButton monoIcons.backspace <| Just UserTypedSearchClear
                , text " "
                ]
            ]


myToolbar :
    List (Element.Element msg)
    -> Element.Element msg -- Infered annotation
myToolbar buttons =
    row
        [ spacingXY 1 0
        , width fill
        , height <| px 24
        ]
    <|
        buttons
