module Layout.Statusbar exposing (statusBar)

-- Elm-ui imports
-- Local imports

import Element
    exposing
        ( el
        , fill
        , height
        , px
        , row
        , text
        , width
        )
import Element.Border as Border
import Element.Font as Font
import Globaltypes exposing (Model)
import Ui.Colors exposing (color)



-- Ports


statusBar : Model -> Element.Element msg
statusBar model =
    row
        [ width fill
        , height <| px 20
        , Border.widthEach { bottom = 0, top = 1, left = 0, right = 0 }
        , Border.color color.white
        ]
        [ el [ Element.paddingEach { bottom = 0, top = 0, left = 0, right = 5 } ] <| Element.none
        , el
            [ width <| px 100
            , height <| px 14
            , Border.color color.darkGrey
            , Element.alignTop
            , Border.widthEach { bottom = 0, top = 1, left = 1, right = 0 }
            , Font.size 12
            ]
          <|
            el
                [ width <| px 100
                , height <| px 14
                , Border.color color.white
                , Element.alignTop
                , Border.widthEach { bottom = 1, top = 0, left = 0, right = 1 }
                , Font.size 12
                ]
            <|
                text "statusBar "
        , el
            [ Font.color color.red
            ]
          <|
            text <|
                case model.error of
                    Just _ ->
                        String.concat [ " Error! See console.log." ]

                    Nothing ->
                        ""
        ]
