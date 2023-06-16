import { writable, type Writable } from "svelte/store";

export const currentLauncherState: Writable<number> = writable(0);