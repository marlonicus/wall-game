import { min, reduce, max, set, view, pipe, clone, when, map, equals, always } from "ramda";
import lenses from "../lenses";
import floodFill from "../utils/flood-fill";

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

const withBuildWall = ({ x, y }) => state => {
  const wallMap = clone(view(lenses.wallMap, state));
  wallMap[y][x] = 3;
  return set(lenses.wallMap, wallMap)(state);
};



const tileMapMappedWithCastles = ({ tileMap, castles }) => {
  return reduce((prev, { x, y }) => {
    const walls = clone(prev)
    walls[y][x] = 'c'
    return walls;
  }, tileMap, castles)
}

const withBasesFilled = state => {
  const castles = view(lenses.castles, state)
  const walls = clone(view(lenses.wallMap, state));
  // const wallsWithCastles = tileMapMappedWithCastles({ tileMap: walls, castles })
  const filledWalls = floodFill(walls, 0, 0, 6)
  const flipBaseTiles = map(map(when(equals(0), always(5))))

  return set(lenses.baseMap, flipBaseTiles(filledWalls), state)
}

export const playerBuild = () => state => {
  const targetX = view(lenses.cursorX, state);
  const targetY = view(lenses.cursorY, state);

  return pipe(
    withBuildWall({ x: targetX, y: targetY }),
    withBasesFilled,
  )(state);
};
