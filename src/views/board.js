import { clone } from "ramda";
import { drawTiles } from "../utils/tilesheet";
import * as PIXI from "pixi.js";

export default ({ boardMap, tiles }) => {
  const data = clone(boardMap);
  const graphic = new PIXI.Graphics();

  drawTiles({ graphic, tiles })(data);

  return {
    view: graphic
  }
};
