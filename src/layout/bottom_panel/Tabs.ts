import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';

export const currentActiveTabLocalStorage: Writable<number> = localStorageStore('currentIndexActiveTab', 0);

