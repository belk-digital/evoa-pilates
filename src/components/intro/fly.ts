/* The two easings the site's entrances move on.
   EASE_DOOR is an expo in-out: almost still, a long smooth rush, almost still again (the door, and the arch that grows).
   EASE_OUT is an expo out: it arrives fast and settles gently (text rising into place). */
export const EASE_DOOR: [number, number, number, number] = [0.87, 0, 0.13, 1];
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
