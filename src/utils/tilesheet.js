import { addIndex, map } from "ramda";
import config from "../config";

const mapIndexed = addIndex(map);
const { tileSize } = config;

const drawTileGraphic = ({ graphic, tile, x, y }) => {
  graphic.beginFill(tile.color);
  graphic.drawRect(x, y, tileSize, tileSize);
  graphic.endFill();
};

export const drawTileXY = ({ x, y, graphic, tileId, tiles }) => {
  const tile = getTileById({
    id: tileId,
    tiles
  });

  tile && !tile.isHidden && drawTileGraphic({
    graphic,
    tile,
    x: x * tileSize,
    y: y * tileSize
  });
}

const getTileById = ({ id, tiles }) => tiles[id];

export const drawTiles = ({ graphic, tiles }) =>
  mapIndexed((row, rowIndex) =>
    mapIndexed((tileId, columnIndex) => {
      drawTileXY({ x: columnIndex, y: rowIndex, graphic, tileId, tiles })
    })(row)
  );
