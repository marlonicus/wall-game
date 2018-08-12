import { times, clone } from "ramda";
import config from "../config";
import { randomFromArray, randomOffset } from "../utils/random";

export const generateBoard = ({ width, height }) => {
  return times(y => {
    return times(x => {
      if (y === 0 || y === height - 1 || x === 0 || x === width - 1) {
        return 2;
      }
      return 1;
    }, width);
  })(height);
};

export const generateTiles = () => clone(config.tiles);
export const generateBlock = () => randomFromArray(config.buildableBlocks);

export const generateCastles = () => [
  { x: randomOffset(5), y: randomOffset(4), tileId: 4 },
  { x: randomOffset(15), y: randomOffset(6), tileId: 4 },
  { x: randomOffset(23), y: randomOffset(4), tileId: 4 },
]
