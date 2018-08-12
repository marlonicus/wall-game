import { map, addIndex, when, equals } from "ramda";
import config from "../config";
import * as PIXI from "pixi.js";

const mapIndexed = addIndex(map);

const renderOutline = ({ graphic, x, y, color, thickness = 4 }) => {
  graphic.lineStyle(thickness, color, 2);
  graphic.drawRect(
    x * config.tileSize,
    y * config.tileSize,
    config.tileSize,
    config.tileSize
  );
};

export default () => {
  const graphic = new PIXI.Graphics();

  return {
    view: graphic,
    render: ({ x: centerX, y: centerY, blockOutline = [[]] }) => {
      graphic.clear();

      mapIndexed(
        (column, y) =>
          mapIndexed((tileValue, x) => {
            if (tileValue === 1) {
              renderOutline({
                graphic,
                x: x + centerX - 1,
                y: y + centerY - 1,
                color: config.colors["cursorBlock"]
              })
            }
          })(column),
        blockOutline
      );

      renderOutline({
        graphic,
        x: centerX,
        y: centerY,
        thickness: 2,
        color: config.colors["cursor"]
      });
    }
  };
};
