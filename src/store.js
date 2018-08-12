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
    x: 7,
    y: 7,
  },

  game: {
    started: false,
    mode: 'build',
  },

  board: {
    width: 40,
    height: 30,
    tiles: undefined,
    wallMap: undefined,
    baseMap: undefined,
    boardMap: undefined,
    castles: undefined,
  },

  build: {
    currentBlock: undefined,
  }
};

export default () => {
  return new Store(initialState).addMiddleware(logger, thunk)
};
