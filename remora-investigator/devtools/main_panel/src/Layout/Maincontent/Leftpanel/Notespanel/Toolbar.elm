module Layout.Maincontent.Leftpanel.Notespanel.Toolbar exposing (panelNotesToolbar)

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
        ( DataEventStatus(..)
        , DataNoteStatus(..)
        , Model
        , Msg(..)
        , StateNoteEditor(..)
        )
import Helpers exposing (humanReadableBytes)
import Monoicons.Png exposing (monoIcons)
import Ui.Colors exposing (color)
import Ui.Widgets exposing (toolbarButton, toolbarSeparatorX, toolbarVoidButton)


panelNotesToolbar : Model -> Element.Element Msg
panelNotesToolbar model =
    row
        [ width fill
        , height <| px 28
        , Border.color color.darkGrey
        , Border.widthEach { bottom = 0, top = 1, left = 0, right = 1 }
        , Font.family [ Font.monospace ]
        ]
        [ toolbarLabel
        , row [ width fill ]
            [ toolbarEventId model
            , toolbarSeparatorX
            , toolbarNoteSize model
            , toolbarNoteActionsToolbar model
            ]
        ]


toolbarLabel : Element.Element msg
toolbarLabel =
    el
        [ paddingEach { bottom = 5, top = 5, left = 5, right = 1 }
        , Font.size 16
        , Font.center
        , Font.family [ Font.sansSerif ]
        ]
        (text "Notes")


toolbarEventId : Model -> Element.Element msg
toolbarEventId model =
    case model.data_event of
        DataEventRequestSuccess event ->
            el [ Element.alignLeft, Font.bold ] <|
                text <|
                    String.concat
                        [ " "
                        , "id:"
                        , String.fromInt event.id
                        , " "
                        ]

        _ ->
            Element.none


toolbarNoteSize : Model -> Element.Element msg
toolbarNoteSize model =
    case model.data_note of
        DataNoteSuccess noteEvent ->
            row [ Element.alignLeft ]
                [ el [] <| text " Size: "
                , el [] <|
                    text <|
                        humanReadableBytes <|
                            Just <|
                                String.length noteEvent.note_content
                , el [] <| text <| ""
                ]

        _ ->
            Element.none


toolbarNoteActionsToolbar : Model -> Element.Element Msg
toolbarNoteActionsToolbar model =
    case model.data_event of
        DataEventRequestSuccess _ ->
            el [ Element.alignRight ] <|
                row
                    [ spacingXY 1 0
                    , paddingEach { bottom = 0, top = 0, left = 0, right = 0 }
                    , width fill
                    ]
                    [ renderButtonNew model
                    , renderButtonEdit model
                    , renderButtonSave model
                    ]

        _ ->
            Element.none


renderButtonNew : Model -> Element.Element Msg
renderButtonNew model =
    el [] <|
        case model.state_note_editor of
            StateNoteEditorVoid ->
                toolbarButton monoIcons.add (Just (ShowNoteEditor StateNoteEditorNewEdit))

            _ ->
                toolbarVoidButton


renderButtonEdit : Model -> Element.Element Msg
renderButtonEdit model =
    el [] <|
        case model.state_note_editor of
            StateNoteEditorShow noteId ->
                toolbarButton monoIcons.edit (Just (ShowNoteEditor (StateNoteEditorEdit noteId)))

            _ ->
                toolbarVoidButton


renderButtonSave : Model -> Element.Element Msg
renderButtonSave model =
    el [] <|
        case model.state_note_editor of
            StateNoteEditorNewEdit ->
                toolbarButton monoIcons.save (Just (ShowNoteEditor StateNoteEditorNewSave))

            StateNoteEditorEdit noteId ->
                toolbarButton monoIcons.save (Just (ShowNoteEditor (StateNoteEditorSaveEdit noteId)))

            _ ->
                toolbarVoidButton
