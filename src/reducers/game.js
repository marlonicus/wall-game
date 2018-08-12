import { set, view, clone, map, always, pipe } from "ramda";
import lenses from "../lenses";
import { generateBoard } from "../boards";

const randomize = (val, range = 4) => val + Math.ceil(Math.random() * range) - (range/2);

export const startGame = () => state => {
  const newBoardMap = generateBoard({
    width: view(lenses.boardWidth, state),
    height: view(lenses.boardHeight, state)
  });

  const emptyTileMap = map(map(always(0)))(newBoardMap);

  const castles = [
    { x: randomize(5), y: randomize(4), tileId: 4 },
    { x: randomize(15), y: randomize(6), tileId: 4 },
    { x: randomize(23), y: randomize(4), tileId: 4 },
  ]

  return pipe(
    set(lenses.boardMap, newBoardMap),
    set(lenses.castles, castles),
    set(lenses.wallMap, emptyTileMap),
    set(lenses.baseMap, emptyTileMap),
    set(lenses.gameStarted, true)
  )(state);
};

export const switchMode = () => state => {
  const gameMode = view(lenses.gameMode, state) === 'shoot' ? 'build' : 'shoot';
  return set(lenses.gameMode, gameMode, state)
}
