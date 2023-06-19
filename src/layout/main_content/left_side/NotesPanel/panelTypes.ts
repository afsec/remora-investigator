import { get, writable } from "svelte/store";

export enum PanelMode {
    NO_NOTE,
    EDIT,
    SAVED,
    IMPOSSSIBLE_STATE
}

export const panelModeStore = writable<PanelMode>(PanelMode.NO_NOTE);

export function togglePanelMode(): void {
    const innerPanelModelStore = get(panelModeStore)
    //*  If possible turn in switch expression 
    if (innerPanelModelStore === PanelMode.NO_NOTE) {
        panelModeStore.set(PanelMode.EDIT)
    } else if (innerPanelModelStore === PanelMode.EDIT) {
        panelModeStore.set(PanelMode.SAVED)
    } else if (innerPanelModelStore === PanelMode.SAVED) {
        panelModeStore.set(PanelMode.EDIT)
    } else {
        panelModeStore.set(PanelMode.IMPOSSSIBLE_STATE)
    }
}