import Store from "./store";
import { keyPress } from "./reducers/keyboard";
import { startGame } from "./reducers/game";
import Keyboard from "./utils/keyboard";
import { view, length, prop, head } from "ramda";
import lenses from "./lenses";
import config from "./config";

import Cursor from "./views/cursor";
import Background from "./views/background";
import Castles from "./views/castles";
import Tilesheet from "./views/tilesheet";
import Debug from "./views/debug";

const initGameObjects = ({ state, pixiApp }) => {
  const boardMap = view(lenses.boardMap, state);
  const tiles = view(lenses.tiles, state);

  const background = Background(pixiApp.renderer);
  const board = Tilesheet({ tiles });
  const castles = Castles({ tiles });
  const base = Tilesheet({ tiles });
  const walls = Tilesheet({ tiles });
  const cursor = Cursor();
  const debug = Debug();

  return {
    background,
    board,
    walls,
    cursor,
    castles,
    base,
    debug
  };
};

export default ({ pixiApp }) => {
  const store = Store();
  const initialState = store.getState();
  const gameObjects = initGameObjects({ state: initialState, pixiApp });

  const render = state => {
    gameObjects.board.render({
      tileMap: view(lenses.boardMap, state)
    });

    gameObjects.base.render({
      tileMap: view(lenses.baseMap, state)
    });

    gameObjects.walls.render({
      tileMap: view(lenses.wallMap, state)
    });

    gameObjects.castles.render({
      castles: view(lenses.castles, state)
    });

    gameObjects.cursor.render({
      x: view(lenses.cursorX, state),
      y: view(lenses.cursorY, state)
    });

    gameObjects.debug.render(state)
  };

  pixiApp.stage.addChild(gameObjects.background.view);
  pixiApp.stage.addChild(gameObjects.board.view);
  pixiApp.stage.addChild(gameObjects.walls.view);
  pixiApp.stage.addChild(gameObjects.base.view);
  pixiApp.stage.addChild(gameObjects.castles.view);
  pixiApp.stage.addChild(gameObjects.cursor.view);
  pixiApp.stage.addChild(gameObjects.debug.view);

  Keyboard.left.press = () => store.dispatch(keyPress("left"));
  Keyboard.right.press = () => store.dispatch(keyPress("right"));
  Keyboard.up.press = () => store.dispatch(keyPress("up"));
  Keyboard.down.press = () => store.dispatch(keyPress("down"));
  Keyboard.space.press = () => store.dispatch(keyPress("space"));
  Keyboard.c.press = () => store.dispatch(keyPress("c"));
  Keyboard.n.press = () => store.dispatch(keyPress("n"));
  Keyboard.enter.press = () => store.dispatch(keyPress("enter"));

  store.subscribe(() => render(store.getState()));

  store.dispatch(startGame());
};
