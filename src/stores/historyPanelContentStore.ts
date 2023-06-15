import type { EventRequest } from "$entities/EventRequestEntity";
import { writable, type Writable } from "svelte/store";

export enum HistoryPanelStates {
    INITIAL_STATE,
    LOADING,
    RECEIVED_SUCCESS,
    RECEIVED_ERROR,
}

export interface HistoryPanelStore {
    state: HistoryPanelStates;
    data: EventRequest[] | null;
    error: string | Error | null;
}

const initial = <HistoryPanelStore>{
    state: HistoryPanelStates.INITIAL_STATE,
    data: null,
    error: null
}

export const historyPanelContent: Writable<HistoryPanelStore> = writable(initial);
