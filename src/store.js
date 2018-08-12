import Store, { thunk } from "repatch";
import config from "./config";

const logger = store => next => reducer => {
  const state = store.getState()
  const nextState = reducer(state)
  console.log('---')
  console.log(`[Before]: `, state)
  console.log(`[After]: `, nextState)
  console.log('---')
  return next(_ => nextState)
}

const initialState = {
  cursor: {
    x: 2,
    y: 2,
  },

  game: {
    started: false
  },

  board: {
    tiles: [
      {
        // 0
        name: 'transparent',
        isHidden: true,
      },
      {
        // 1
        name: "free-tile",
        isBuildable: true,
        color: config.colors["freeTile"]
      },
      {
        // 2
        name: "boundary",
        isCursorBlocker: true,
        isBuildable: false,
        color: config.colors["boundaryTile"]
      },
      {
        // 3
        name: "wall",
        isBuildable: false,
        color: config.colors["wall"]
      },
      {
        // 4
        name: "castle",
        isBuildable: false,
        color: config.colors["castle"]
      },
      {
        // 5
        name: "base",
        isBuildable: true,
        color: config.colors["base"]
      },
      {
        // 6
        name: "no-base",
        isBuildable: true,
        isHidden: true,
      },
    ],

    wallMap: undefined,
    baseMap: undefined,

    boardMap: [
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
      [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
      [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
      [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
      [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
      [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
      [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
      [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
      [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
      [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
      [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
      [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
      [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
    ],

    castles: []
  }
};

export default () => {
  return new Store(initialState).addMiddleware(logger, thunk)
};
