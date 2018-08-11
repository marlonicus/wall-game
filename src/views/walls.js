import { clone, addIndex, map, find, propEq, lens } from "ramda";
import colors from "../colors";
import config from "../config";
import * as PIXI from "pixi.js";

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
        tiles
      });

      tile.color && drawTile({
        graphic,
        tile,
        x: columnIndex * tileSize,
        y: rowIndex * tileSize
      });
    })(row)
  );

export default ({ tiles }) => {
  const graphic = new PIXI.Graphics();

  return {
    render: ({ wallMap }) => {
      graphic.clear()
      console.log(tiles)
      drawBoard({ graphic, tiles })(wallMap);
    },
    view: graphic
  }
}
