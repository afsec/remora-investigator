import type { EventRequest } from "$entities/EventRequestEntity";
import { writable, type Writable } from "svelte/store";

export const historyPanelContent: Writable<EventRequest[] | null> = writable(null);
