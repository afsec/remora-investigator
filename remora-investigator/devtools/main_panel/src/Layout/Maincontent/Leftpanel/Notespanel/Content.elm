module Layout.Maincontent.Leftpanel.Notespanel.Content exposing (panelNotesContent)

import Element
    exposing
        ( clip
        , el
        , fill
        , height
        , padding
        , scrollbars
        , spacing
        , width
        )
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font
import Element.Input as Input
import Globaltypes
    exposing
        ( DataNoteStatus(..)
        , Model
        , Msg(..)
        , StateNoteEditor(..)
        )
import Html
import Markdown
import Ui.Colors exposing (color)


panelNotesContent : Model -> Element.Element Msg
panelNotesContent model =
    let
        noteContent =
            case model.data_note of
                DataNoteSuccess noteEvent ->
                    noteEvent.note_content

                _ ->
                    ""
    in
    case model.state_note_editor of
        StateNoteEditorNewEdit ->
            el
                [ Border.color color.darkGrey
                , Border.width 1
                , width fill
                , height fill
                , scrollbars
                , Font.family [ Font.monospace ]
                ]
            <|
                Input.multiline
                    [ width fill
                    , height fill
                    , Border.width 0
                    , case model.state_note_editor of
                        StateNoteEditorEdit _ ->
                            Background.color color.lightYellow

                        StateNoteEditorNewEdit ->
                            Background.color color.lightYellow

                        _ ->
                            Background.color color.white
                    , padding 0
                    , spacing 0
                    , clip
                    ]
                    { label = Input.labelHidden ""
                    , onChange = NoteEditorUserTypedContent
                    , placeholder = Nothing
                    , spellcheck = True
                    , text = model.state_note_editor_input
                    }

        StateNoteEditorEdit _ ->
            el
                [ Border.color color.darkGrey
                , Border.width 1
                , width fill
                , height fill
                , scrollbars
                , Font.family [ Font.monospace ]
                ]
            <|
                Input.multiline
                    [ width fill
                    , height fill
                    , Border.width 0
                    , case model.state_note_editor of
                        StateNoteEditorEdit _ ->
                            Background.color color.lightYellow

                        StateNoteEditorNewEdit ->
                            Background.color color.lightYellow

                        _ ->
                            Background.color color.white
                    , padding 0
                    , spacing 0
                    , clip
                    , Input.focusedOnLoad
                    ]
                    { label = Input.labelHidden ""
                    , onChange = NoteEditorUserTypedContent
                    , placeholder = Nothing
                    , spellcheck = True
                    , text = model.state_note_editor_input
                    }

        _ ->
            el
                [ Border.color color.darkGrey
                , Border.width 1
                , width fill
                , height fill
                , scrollbars
                , case model.state_note_editor of
                    StateNoteEditorVoid ->
                        Background.color color.lightGrey

                    _ ->
                        Background.color color.white
                , Font.family [ Font.monospace ]
                ]
            <|
                el
                    [ Border.color color.white
                    , Border.widthEach { bottom = 0, left = 0, right = 0, top = 1 }
                    ]
                <|
                    Element.html <|
                        Html.div [] <|
                            Markdown.toHtml Nothing noteContent
