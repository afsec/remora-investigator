module Layout.Maincontent.Leftpanel.Sitespanel.Toolbar exposing (sitesPanelToolbar)

import Element
    exposing
        ( el
        , fill
        , height
        , paddingEach
        , px
        , row
        , spacingXY
        , text
        , width
        )
import Element.Border as Border
import Element.Font as Font
import Globaltypes
    exposing
        ( DataSitesStatus(..)
        , Model
        , Msg(..)
        )
import Monoicons.Gif exposing (monoIconsGif)
import Monoicons.Png exposing (monoIcons)
import Ui.Colors exposing (color)
import Ui.Widgets
    exposing
        ( toolbarButton
        )


sitesPanelToolbar : Model -> Element.Element Msg
sitesPanelToolbar model =
    row
        [ width fill
        , height <| px 28
        , Border.color color.darkGrey
        , Border.widthEach { bottom = 0, top = 0, left = 0, right = 1 }
        ]
        [ el
            [ paddingEach { bottom = 5, top = 5, left = 5, right = 5 }
            , Font.size 16
            , Font.center
            ]
            (text "Sites:")
        , case model.data_sites of
            DataSitesRequestSuccess maybeData ->
                case maybeData of
                    Just data ->
                        el [ Element.alignLeft ] <|
                            text <|
                                String.concat
                                    [ String.fromInt <| data.total_sites
                                    , " (Total events: "
                                    , String.fromInt <| data.total_events
                                    , ")"
                                    ]

                    Nothing ->
                        Element.none

            _ ->
                Element.none
        , el [ Element.alignRight ] <| sitesPanelToolbarRightToolbar model.data_sites
        ]


sitesPanelToolbarRightToolbar : DataSitesStatus -> Element.Element Msg
sitesPanelToolbarRightToolbar sitesStatus =
    row
        [ spacingXY 1 0
        , paddingEach { bottom = 0, top = 0, left = 0, right = 0 }
        , width fill
        ]
        [ case sitesStatus of
            DataSitesRequestPending ->
                toolbarButton monoIconsGif.refresh Nothing

            _ ->
                toolbarButton monoIcons.refresh <| Just GetDataSites
        ]
