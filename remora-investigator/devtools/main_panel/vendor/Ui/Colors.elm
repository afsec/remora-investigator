module Ui.Colors exposing (color)

import Element exposing (rgb255)



-- colorMainBackground : Element.Color
-- colorMainBackground = rgb255 0xd4 0xd0 0xc8
-- colorBasicBorder = rgb255 0x6a 0x68 0x64
-- colorBasicBorderBottomRight : Element.Color
-- colorBasicBorderBottomRight = rgb255 0x6a 0x68 0x64
-- colorBasicBorderTopLeft : Element.Color
-- colorBasicBorderTopLeft = rgb255 0xff 0xff 0xff
-- colorBorderTop = (rgb255 0xd4 0xd0 0xc8)
-- colorBorderBottom = (rgb255 0xd4 0xd0 0xc8)
-- colorBorderLeft = (rgb255 0xd4 0xd0 0xc8)
-- colorBorderRight = (rgb255 0xd4 0xd0 0xc8)


color : { black : Element.Color, blue : Element.Color, blueTest : Element.Color, blueRemora : Element.Color, cyan : Element.Color, darkCharcoal : Element.Color, darkGrey : Element.Color, grey : Element.Color, lightBlue : Element.Color, lightGrey : Element.Color, lightYellow : Element.Color, red : Element.Color, redRemora : Element.Color, white : Element.Color }
color =
    { black = rgb255 0x00 0x00 0x00
    , blue = rgb255 0x1A 0x0D 0xAB
    , blueTest = rgb255 0x20 0x39 0xB7
    , blueRemora = rgb255 0x72 0x9F 0xCF
    , cyan = rgb255 0xC5 0xE8 0xF7
    , darkCharcoal = rgb255 0x2E 0x34 0x36
    , darkGrey = rgb255 0x6A 0x68 0x64
    , grey = rgb255 0xD4 0xD0 0xC8
    , lightBlue = rgb255 0xAF 0xB7 0xF2
    , lightGrey = rgb255 0xE0 0xE0 0xE0
    , lightYellow = rgb255 0xFF 0xFF 0xA6
    , red = rgb255 0xFF 0x00 0x00
    , redRemora = rgb255 0xE8 0x45 0x3C
    , white = rgb255 0xFF 0xFF 0xFF
    }
