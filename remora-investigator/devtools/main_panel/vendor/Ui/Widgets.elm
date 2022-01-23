module Ui.Widgets exposing
    ( horizontalSplitter
    , toolbarButton
    , toolbarButtonMini
    , toolbarSearch
    , toolbarSeparatorX
    , toolbarVoidButton
    , verticalSplitter
    )

import Element
    exposing
        ( Element
        , alpha
        , centerX
        , centerY
        , clip
        , el
        , fill
        , focused
        , height
        , image
        , mouseDown
        , mouseOver
        , padding
        , paddingEach
        , paddingXY
        , px
        , row
        , text
        , width
        )
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font
import Element.Input as Input
import Monoicons.Png exposing (monoIcons)
import Ui.Colors exposing (color)
import Ui.Cursor exposing (Cursor(..), cursor)



-- toolbarButton : String -> Element msg


toolbarButton : String -> Maybe msg -> Element msg
toolbarButton recordName maybeMsg =
    Input.button
        [ padding 3
        , Border.width 0
        , focused [ Border.color color.grey ]
        ]
        { onPress = maybeMsg
        , label =
            -- The label can be any element, so for example, the button
            -- can contain an image
            el [ clip, Border.rounded 6 ] <|
                image
                    [ width <| px 24
                    , height <| px 24
                    , alpha 0.7
                    , mouseOver [ alpha 1 ]
                    , mouseDown [ Background.color color.lightGrey ]
                    ]
                    { src = recordName
                    , description = "Image button"
                    }
        }


toolbarVoidButton : Element.Element msg
toolbarVoidButton =
    Input.button
        [ padding 3
        , Border.width 0
        , focused [ Border.color color.grey ]
        ]
        { onPress = Nothing
        , label =
            -- The label can be any element, so for example, the button
            -- can contain an image
            el
                [ clip
                , Border.rounded 6
                , width <| px 24
                , height <| px 24
                ]
            <|
                Element.none
        }


toolbarButtonMini : String -> Maybe msg -> Element msg
toolbarButtonMini recordName msg =
    Input.button
        [ Border.width 0

        -- , padding 3
        , focused [ Border.color color.grey ]
        ]
        { onPress = msg
        , label =
            -- The label can be any element, so for example, the button
            -- can contain an image
            el [ clip, Border.rounded 6 ] <|
                image
                    [ width <| px 20
                    , height <| px 20
                    , alpha 0.7
                    , mouseOver [ alpha 1 ]
                    , mouseDown [ Background.color color.lightGrey ]
                    ]
                    { src = recordName
                    , description = "Image button"
                    }
        }


toolbarSeparatorX : Element msg
toolbarSeparatorX =
    row []
        [ el
            [ paddingEach { bottom = 10, top = 10, left = 2, right = 2 }
            , Border.widthEach { bottom = 0, top = 0, left = 0, right = 1 }
            , Border.color color.darkGrey
            ]
            Element.none
        , el
            [ paddingEach { bottom = 10, top = 10, left = 2, right = 2 }
            , Border.widthEach { bottom = 0, top = 0, left = 1, right = 0 }
            , Border.color color.white
            ]
            Element.none
        ]



-- toolbarSearch : (String -> msg) -> Element msg


toolbarSearch : String -> (String -> msg) -> Element msg
toolbarSearch searchContent msg =
    el [ Element.alignRight ] <|
        Input.text
            [ width <| px 200
            , height <| px 20
            , Font.size 12
            , Font.alignLeft
            , focused []
            , padding 2
            ]
            { label = Input.labelRight [] (text "")
            , onChange = msg
            , placeholder = Nothing
            , text = searchContent
            }


verticalSplitter : Element.Element msg
verticalSplitter =
    el
        [ height fill
        , width <| px 6
        ]
    <|
        el
            [ width <| px 6
            , centerY
            , cursor ColResize
            , Background.image monoIcons.options_vertical
            ]
        <|
            el [ paddingXY 6 10 ] <|
                Element.none


horizontalSplitter : Element.Element msg
horizontalSplitter =
    el
        [ width fill
        , height <| px 6
        ]
    <|
        el
            [ height <| px 6
            , centerX
            , cursor RowResize
            , Background.image monoIcons.options_horizontal
            ]
        <|
            el [ paddingXY 10 6 ] <|
                Element.none
