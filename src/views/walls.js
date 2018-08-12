import { drawTiles } from "../utils/tilesheet";
import * as PIXI from "pixi.js";

export default ({ tiles }) => {
  const graphic = new PIXI.Graphics();

  return {
    render: ({ wallMap }) => {
      graphic.clear()
      drawTiles({ graphic, tiles })(wallMap);
    },
    view: graphic
  }
}
