import { drawTiles } from "../utils/tilesheet";
import * as PIXI from "pixi.js";

export default ({ tiles }) => {
  const graphic = new PIXI.Graphics();

  return {
    render: ({ tileMap }) => {
      graphic.clear()
      drawTiles({ graphic, tiles })(tileMap);
    },
    view: graphic
  }
}
