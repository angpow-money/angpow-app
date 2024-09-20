import { atom } from 'nanostores'

export const $state = atom(null);
export const $show_palette = atom(false);
export const $zoom_close = atom(false);
export const $zoom_far = atom(true);
export const $flip_angpao = atom(false);
export const $open_angpao = atom(false);

export const $pan_up = atom(false);
export const $pan_down = atom(false);