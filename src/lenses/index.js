import { lensProp, lensPath } from "ramda";

export default {
  cursorX: lensPath(['cursor', 'x']),
  cursorY: lensPath(['cursor', 'y']),

  gameStarted: lensPath(['game', 'started']),

  boardMap: lensPath(['board', 'map']),
  tiles: lensPath(['board', 'tiles']),

  wallMap: lensPath(['board', 'wallMap']),
}
