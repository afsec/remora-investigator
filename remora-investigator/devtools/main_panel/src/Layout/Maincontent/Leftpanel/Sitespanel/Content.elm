module Layout.Maincontent.Leftpanel.Sitespanel.Content exposing (sitesContent)

import Element
    exposing
        ( alignRight
        , column
        , el
        , fill
        , height
        , mouseOver
        , paddingEach
        , pointer
        , px
        , row
        , text
        , width
        )
import Element.Background as Background
import Element.Border as Border
import Element.Events exposing (onClick)
import Element.Font as Font
import Globaltypes
    exposing
        ( DataSitesStatus(..)
        , Model
        , Msg(..)
        , SiteEntry
        )
import Ui.Colors exposing (color)


sitesContent : Model -> Element.Element Msg
sitesContent model =
    column
        [ Border.color color.darkGrey
        , Border.width 1
        , width fill
        , height fill
        , Background.color color.white
        , Element.scrollbars
        , Font.size 12
        ]
        [ case model.data_sites of
            DataSitesRequestSuccess maybeSitesResponse ->
                case maybeSitesResponse of
                    Just sitesResponse ->
                        renderTableSites sitesResponse.sites model.shared_events_filter_by_site

                    Nothing ->
                        Element.none

            _ ->
                Element.none
        ]


renderTableSites : List SiteEntry -> Maybe String -> Element.Element Msg
renderTableSites sites shared_events_filter_by_site =
    Element.table
        [ width fill
        , Background.color color.white
        , Element.spacing 1
        , Element.padding 2
        ]
        { data = sites
        , columns =
            [ { header = cellTH "Evts"
              , width = px 40
              , view =
                    \row ->
                        el
                            [ backgroundIfFiltered row.site shared_events_filter_by_site

                            -- , mouseOver [ Background.color color.lightGrey ]
                            ]
                        <|
                            el
                                [ alignRight
                                , paddingEach { bottom = 0, top = 0, left = 0, right = 2 }
                                , Font.family [ Font.monospace ]
                                ]
                            <|
                                text <|
                                    String.concat
                                        [ String.fromInt <| row.events
                                        , " "
                                        ]
              }
            , { header = cellTH "Site"
              , width = fill
              , view =
                    \row ->
                        el
                            [ pointer
                            , mouseOver [ Background.color color.lightGrey ]
                            , backgroundIfFiltered row.site shared_events_filter_by_site
                            , onClick <| FilterBySite row.site
                            , Font.family [ Font.monospace ]
                            ]
                        <|
                            text row.site
              }
            ]
        }


cellTH : String -> Element.Element Msg
cellTH labelText =
    Element.el
        [ Border.widthEach { bottom = 1, top = 1, left = 1, right = 1 }
        , Border.rounded 1
        , Border.color color.darkGrey
        ]
    <|
        Element.el
            [ Element.centerX
            ]
            (text labelText)


backgroundIfFiltered : String -> Maybe String -> Element.Attr decorative msg
backgroundIfFiltered site maybeFilter =
    case maybeFilter of
        Just filter ->
            if site == filter then
                Background.color color.lightGrey

            else
                Background.color color.white

        Nothing ->
            Background.color color.white
