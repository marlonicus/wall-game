import config from "../config";
import * as PIXI from "pixi.js";

const render = ({ graphic, x, y }) => {
  graphic.clear();
  graphic.lineStyle(4, config.colors["cursor"], 2);
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
    render: ({ x, y }) => render({ graphic, x, y })
  };
};
