import colors from "../colors";
import * as PIXI from "pixi.js";

export default ({ width, height }) => {
  const graphic = new PIXI.Graphics();
  graphic.beginFill(colors["bg"]);
  graphic.drawRect(0, 0, width, height);
  graphic.endFill();
  graphic.x = 0;
  graphic.y = 0;

  return {
    view: graphic
  };
};
