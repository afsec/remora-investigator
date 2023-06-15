import { writable, type Writable } from "svelte/store";

export const currentActiveTab: Writable<number> = writable(0);
