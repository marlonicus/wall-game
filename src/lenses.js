import { lensProp, lensPath } from "ramda";

export default {
  cursorX: lensPath(['cursor', 'x']),
  cursorY: lensPath(['cursor', 'y']),

  gameStarted: lensPath(['game', 'started']),
  gameMode: lensPath(['game', 'mode']),

  boardWidth: lensPath(['board', 'width']),
  boardHeight: lensPath(['board', 'height']),
  tiles: lensPath(['board', 'tiles']),
  wallMap: lensPath(['board', 'wallMap']),
  boardMap: lensPath(['board', 'boardMap']),
  baseMap: lensPath(['board', 'baseMap']),
  castles: lensPath(['board', 'castles']),

  build: {
    currentBlock: lensPath(['build', 'currentBlock']),
  },
}
