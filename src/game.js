import Store from "./store";
import { keyPress } from "./reducers/keyboard";
import { startGame } from "./reducers/game";
import Keyboard from "./utils/keyboard";
import { view, length, prop, head } from "ramda";
import lenses from "./lenses";
import config from "./config";

import Cursor from "./views/cursor";
import Walls from "./views/walls";
import Background from "./views/background";
import Board from "./views/board";
import Castles from "./views/castles";
import Base from "./views/base";

const initGameObjects = ({ state, pixiApp }) => {
  const boardMap = view(lenses.boardMap, state);
  const tiles = view(lenses.tiles, state);

  const background = Background(pixiApp.renderer);
  const board = Board({ tiles, boardMap });
  const castles = Castles({ tiles });
  const base = Base({ tiles });

  const walls = Walls({
    width: length(head(boardMap)),
    height: length(boardMap),
    tiles
  });

  const cursor = Cursor();

  return {
    background,
    board,
    walls,
    cursor,
    castles,
    base
  };
};

export default ({ pixiApp }) => {
  const store = Store();
  const initialState = store.getState();
  const gameObjects = initGameObjects({ state: initialState, pixiApp });

  const render = state => {
    gameObjects.base.render({
      baseMap: view(lenses.baseMap, state)
    });

    gameObjects.walls.render({
      wallMap: view(lenses.wallMap, state)
    });

    gameObjects.castles.render({
      castles: view(lenses.castles, state)
    });

    gameObjects.cursor.render({
      x: view(lenses.cursorX, state),
      y: view(lenses.cursorY, state)
    });
  };

  pixiApp.stage.addChild(gameObjects.background.view);
  pixiApp.stage.addChild(gameObjects.board.view);
  pixiApp.stage.addChild(gameObjects.walls.view);
  pixiApp.stage.addChild(gameObjects.base.view);
  pixiApp.stage.addChild(gameObjects.castles.view);
  pixiApp.stage.addChild(gameObjects.cursor.view);

  Keyboard.left.press = () => store.dispatch(keyPress("left"));
  Keyboard.right.press = () => store.dispatch(keyPress("right"));
  Keyboard.up.press = () => store.dispatch(keyPress("up"));
  Keyboard.down.press = () => store.dispatch(keyPress("down"));
  Keyboard.space.press = () => store.dispatch(keyPress("space"));
  Keyboard.c.press = () => store.dispatch(keyPress("c"));

  store.subscribe(() => render(store.getState()));

  store.dispatch(startGame());
};
