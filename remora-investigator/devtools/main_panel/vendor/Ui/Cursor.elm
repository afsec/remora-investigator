module Ui.Cursor exposing (cursor, Cursor(..))

import Element exposing (Attribute, htmlAttribute)
import Html.Attributes

-- * Reference: https://gist.github.com/opsb/ed3decbd7fda3921749d9ac56a852a5c
cursor : Cursor -> Attribute msg
cursor cursor_ =
    htmlAttribute <| Html.Attributes.style "cursor" (cursorName cursor_)


type Cursor
    = Alias
    | AllScroll
    | Auto
    | Cell
    | ContextMenu
    | ColResize
    | Copy
    | Crosshair
    | Default
    | EResize
    | EwResize
    | Grab
    | Grabbing
    | Help
    | Move
    | NResize
    | NeResize
    | NeswResize
    | NsResize
    | NwResize
    | NwseResize
    | NoDrop
    | None
    | NotAllowed
    | Pointer
    | Progress
    | RowResize
    | SResize
    | SeResize
    | SwResize
    | Text
    | Url
    | WResize
    | Wait
    | ZoomIn
    | ZoomOut


cursorName : Cursor -> String
cursorName cursor_ =
    case cursor_ of
        Alias ->
            "alias"

        AllScroll ->
            "all-scroll"

        Auto ->
            "auto"

        Cell ->
            "cell"

        ContextMenu ->
            "context-menu"

        ColResize ->
            "col-resize"

        Copy ->
            "copy"

        Crosshair ->
            "crosshair"

        Default ->
            "default"

        EResize ->
            "e-resize"

        EwResize ->
            "ew-resize"

        Grab ->
            "grab"

        Grabbing ->
            "grabbing"

        Help ->
            "help"

        Move ->
            "move"

        NResize ->
            "n-resize"

        NeResize ->
            "ne-resize"

        NeswResize ->
            "nesw-resize"

        NsResize ->
            "ns-resize"

        NwResize ->
            "nw-resize"

        NwseResize ->
            "nwse-resize"

        NoDrop ->
            "no-drop"

        None ->
            "none"

        NotAllowed ->
            "not-allowed"

        Pointer ->
            "pointer"

        Progress ->
            "progress"

        RowResize ->
            "row-resize"

        SResize ->
            "s-resize"

        SeResize ->
            "se-resize"

        SwResize ->
            "sw-resize"

        Text ->
            "text"

        Url ->
            "url"

        WResize ->
            "w-resize"

        Wait ->
            "wait"

        ZoomIn ->
            "zoom-in"

        ZoomOut ->
            "zoom-out"

