import { min, max, set, view, pipe } from "ramda";
import lenses from "../lenses";

const isValidTile = ({ state, x, y }) => {
  const boardMap = view(lenses.boardMap, state);
  const tiles = view(lenses.tiles, state);

  const targetTile = tiles[boardMap[y][x]];
  return !targetTile.isCursorBlocker;
};

export const playerMove = ({ x, y }) => state => {
  const boardMap = view(lenses.boardMap, state);

  const newX = min(boardMap[0].length, max(0, view(lenses.cursorX, state) + x));
  const newY = min(boardMap.length, max(0, view(lenses.cursorY, state) + y));

  if (isValidTile({ x: newX, y: newY, state })) {
    return pipe(
      set(lenses.cursorX, newX),
      set(lenses.cursorY, newY)
    )(state);
  }

  return state;
};

export const playerBuild = () => state => {
  const targetX = view(lenses.cursorX, state);
  const targetY = view(lenses.cursorY, state);
  const wallMap = view(lenses.wallMap, state);
  wallMap[targetY][targetX] = 3;

  return set(lenses.wallMap, wallMap)(state);
};
