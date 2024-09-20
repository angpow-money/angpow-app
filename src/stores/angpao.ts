import { atom } from 'nanostores'

export const $state = atom(null);
export const $show_palette = atom(false);
export const $zoom_close = atom(false);
export const $zoom_far = atom(true);
export const $flip_for_message = atom(false);