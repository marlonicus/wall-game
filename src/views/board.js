import * as PIXI from "pixi.js";
import { clone, addIndex, map, find, propEq } from "ramda";
import colors from "../colors";
import config from "../config";

const mapIndexed = addIndex(map);
const { tileSize } = config;

const drawTile = ({ graphic, tile, x, y }) => {
  graphic.beginFill(tile.color);
  graphic.drawRect(x, y, tileSize, tileSize);
  graphic.endFill();
};

const getTileById = ({ id, tiles }) => tiles[id];

const drawBoard = ({ graphic, tiles }) =>
  mapIndexed((row, rowIndex) =>
    mapIndexed((tileId, columnIndex) => {
      const tile = getTileById({
        id: tileId,
        tiles: tiles
      });

      drawTile({
        graphic,
        tile,
        x: columnIndex * tileSize,
        y: rowIndex * tileSize
      });
    })(row)
  );

export default ({ boardMap, tiles }) => {
  const data = clone([...boardMap]);
  const graphic = new PIXI.Graphics();

  drawBoard({ graphic, tiles })(data);

  return {
    view: graphic
  }
};
