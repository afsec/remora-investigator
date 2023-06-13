import { writable, type Writable } from "svelte/store";

export const currentActiveTabLocalStorage: Writable<number> = writable(0);
