import {
  min,
  reduce,
  max,
  set,
  view,
  pipe,
  clone,
  when,
  map,
  equals,
  always,
  all,
  addIndex,
  propEq,
  not,
  or
} from "ramda";
import lenses from "../lenses";
import { rotateMatrix } from "../utils/matrix";
import floodFill from "../utils/flood-fill";

import { generateBlock } from "../boards";

const allIndexed = addIndex(all);
const reduceIndexed = addIndex(reduce);

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

const getTileFromTileMap = ({ x, y, tiles, tileMap }) => {
  return tiles[tileMap[y][x]];
};

const tileMapMappedWithCastles = ({ tileMap, castles, castleTileId = "c" }) => {
  return reduce(
    (prev, { x, y }) => {
      const walls = clone(prev);
      walls[y][x] = castleTileId;
      return walls;
    },
    tileMap,
    castles
  );
};

const withNewBuildingBlock = state =>
  set(lenses.build.currentBlock, generateBlock(), state);

const withBuildWallAtCursor = state => {
  const tiles = view(lenses.tiles, state);

  const boundaryMap = clone(view(lenses.boardMap, state));
  const wallMap = clone(view(lenses.wallMap, state));
  const castles = clone(view(lenses.castles, state));

  const cursorX = view(lenses.cursorX, state);
  const cursorY = view(lenses.cursorY, state);

  const blockToBeBuilt = view(lenses.build.currentBlock, state);

  const checkFreeToBuild = (row, y) => (tileValue, x) => {
    const isBlockedByCastles = false;

    if (tileValue === 0) {
      return true;
    }

    const tx = x + cursorX - 1;
    const ty = y + cursorY - 1;

    const wallsWithCastles = tileMapMappedWithCastles({
      tileMap: wallMap,
      castles,
      castleTileId: 3
    });

    const isBlockedByOtherTiles = not(
      all(propEq("isBuildable", true), [
        getTileFromTileMap({ x: tx, y: ty, tiles, tileMap: wallsWithCastles }),
        getTileFromTileMap({ x: tx, y: ty, tiles, tileMap: boundaryMap })
      ])
    );

    return not(or(isBlockedByOtherTiles, isBlockedByCastles));
  };

  const checkRowFreeToBuild = (row, y) =>
    allIndexed(checkFreeToBuild(row, y), row);
  const isFreeToBuild = allIndexed(checkRowFreeToBuild, blockToBeBuilt);

  const wallMapWithBuiltBlocks = isFreeToBuild
    ? (() => {
        const clonedMap = clone(wallMap);

        for (let y = 0; y < blockToBeBuilt.length; y++) {
          for (let x = 0; x < blockToBeBuilt[y].length; x++) {
            const tileValue = blockToBeBuilt[y][x];
            const tx = x + cursorX - 1;
            const ty = y + cursorY - 1;
            if (tileValue !== 0) {
              clonedMap[ty][tx] = 3;
            }
          }
        }

        return clonedMap;
      })()
    : wallMap;

  return pipe(
    set(lenses.wallMap, wallMapWithBuiltBlocks),
    when(always(isFreeToBuild), withNewBuildingBlock),
  )(state);
};

const withBasesFilled = state => {
  const castles = view(lenses.castles, state);
  const walls = clone(view(lenses.wallMap, state));
  const filledWalls = floodFill(walls, 0, 0, 6);
  const flipBaseTiles = map(map(when(equals(0), always(5))));

  return set(lenses.baseMap, flipBaseTiles(filledWalls), state);
};

export const playerBuild = () => state => {
  return pipe(
    withBuildWallAtCursor,
    withBasesFilled,
  )(state);
};

export const playerRotate = () => state => {
  return set(
    lenses.build.currentBlock,
    rotateMatrix(view(lenses.build.currentBlock, state)),
    state
  );
};
