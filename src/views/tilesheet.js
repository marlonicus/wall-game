import { drawTiles } from "../utils/tilesheet";
import * as PIXI from "pixi.js";

export default () => {
  const graphic = new PIXI.Graphics();

  return {
    render: ({ tileMap, tiles }) => {
      graphic.clear()
      drawTiles({ graphic, tiles })(tileMap);
    },
    view: graphic
  }
}
