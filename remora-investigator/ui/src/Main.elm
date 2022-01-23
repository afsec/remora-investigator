module Main exposing (..)
import Color as Color
import Element exposing (Element, el, text, column, row, px, alignTop, alignBottom, alignRight, fill, width, height, rgb255, spacing)
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font
import Element.Input as Input

main = 
    Element.layout [ Background.color Color.grey, Font.size 16 ]
        mainFrame


-- mainFrame
mainFrame : Element msg
mainFrame =
    column [ width fill, height fill ]
        [ menubar
        , mainPanel
        , statusBar
        ]


-- menuBar
menubar =
    row [ width fill
        , alignTop
        , spacing 5
        , Border.color Color.darkGrey
        , Border.widthEach { left = 0, top = 0, right = 0, bottom = 1}
        ]
        [ myElementMenubar
        , el [ alignRight ] myElementMenubar
        ]

myElementMenubar =
    Input.button
        [ Background.color Color.grey
        , Border.color Color.white
        , Border.width 1
        , Element.mouseDown
            [ Background.color Color.darkGrey ]
        , Element.mouseOver
            [ Background.color Color.white ]
        , Element.focused
            [ Background.color Color.grey ]
        ]
        { 
          onPress = Nothing
        , label = text "Item"
        }

-- mainPanel

mainPanel =
    column [ width fill, height fill, spacing 5, Border.color Color.white, Border.widthEach { left = 0, top = 0, right = 0, bottom = 1} ]
        [ httpPanel
        , historyPanel
        ]


-- httpPanel
httpPanel =
  row [ width fill, height fill, Background.color Color.grey ]
      [ sitesPanel
      , reqResPanel
      ]

sitesPanel =
  column  [ width (px 250)
          , height fill
          , Background.color Color.white
          , Border.color Color.darkGrey
          , Border.widthEach { left = 0, top = 0, right = 1, bottom = 0}
          ]
          [ el [] (text "sitesPanel" )
          ]

reqResPanel =
  row [ width fill, height fill, Border.color Color.black, Border.widthEach { left = 1, top = 0, right = 0, bottom = 0} ]
      [ requestPanel
      , responsePanel
      ]

requestPanel =
  column  [ width fill
          , height fill
          , Background.color Color.grey
          , Border.color Color.darkGrey, Border.widthEach { left = 0, top = 0, right = 2, bottom = 0}
          ]
          [ requestHeadersPanel
          , requestBodyPanel
          ]

requestHeadersPanel =
  row   [ width fill
        , height fill
        , Border.color Color.darkGrey, Border.widthEach { left = 0, top = 0, right = 0, bottom = 1}
        ]
        [ el [] (text "requestHeadersPanel" )
        ]

requestBodyPanel =
  row   [ width fill
        , height fill
        , Border.color Color.grey, Border.widthEach { left = 0, top = 1, right = 0, bottom = 0}
        ]
        [ el [] (text "requestBodyPanel" )
        ]


responsePanel =
  column  [ width fill
          , height fill
          , Border.color Color.darkGrey, Border.widthEach { left = 0, top = 0, right = 2, bottom = 0}
          ]
          [ responseHeadersPanel
          , responseBodyPanel
          ]

responseHeadersPanel =
  row   [ width fill
        , height fill
        , Border.color Color.darkGrey, Border.widthEach { left = 0, top = 0, right = 0, bottom = 1}
        ]
        [ el [] (text "responseHeadersPanel" )
        ]

responseBodyPanel =
  row   [ width fill
        , height fill
        , Border.color Color.grey, Border.widthEach { left = 0, top = 1, right = 0, bottom = 0}
        ]
        [ el [] (text "responseBodyPanel" )
        ]

-- historyPanel
historyPanel =
  row [ width fill, alignBottom, height (px 200), Background.color Color.red ]
      [ el [] (text "historyPanel" )
      ]

-- mainPanelButton =
--     Input.button
--         [ Background.color Color.grey
--         , Element.mouseDown
--             [ Background.color Color.darkGrey ]
--         , Element.mouseOver
--             [ Background.color Color.white ]
--         , Element.focused
--             [ Background.color Color.grey ]
--         ]
--         { 
--           onPress = Nothing
--         , label = text "My Button"
--         }




-- statusBar
statusBar =
    row [ width fill, alignBottom, spacing 30, Border.color Color.darkGrey, Border.widthEach { left = 0, top = 1, right = 0, bottom = 0 } ]
        [ myElementStatusbar
        , el [ alignRight ] myElementStatusbar
        ]


myElementStatusbar =
    el
        [ Background.color Color.grey
        -- , Font.color (rgb255 255 255 255)
        -- , Border.rounded 3
        , Border.color Color.grey
        -- , padding 30
        ]
        (text "statusbar message" )


