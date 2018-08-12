import { set, view, clone, map, always, pipe } from "ramda";
import lenses from "../lenses";
import {
  generateBoard,
  generateTiles,
  generateCastles,
  generateBlock
} from "../boards";

export const startGame = () => state => {
  const newBoardMap = generateBoard({
    width: view(lenses.boardWidth, state),
    height: view(lenses.boardHeight, state)
  });

  const emptyTileMap = map(map(always(0)))(newBoardMap);

  return pipe(
    // Board
    set(lenses.tiles, generateTiles()),
    set(lenses.castles, generateCastles()),
    set(lenses.boardMap, newBoardMap),
    set(lenses.wallMap, emptyTileMap),
    set(lenses.baseMap, emptyTileMap),

    // Build
    set(lenses.build.currentBlock, generateBlock()),

    // Game
    set(lenses.gameStarted, true)
  )(state);
};

export const switchMode = () => state => {
  const gameMode = view(lenses.gameMode, state) === "shoot" ? "build" : "shoot";
  return set(lenses.gameMode, gameMode, state);
};
