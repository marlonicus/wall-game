import { map } from "ramda";
import * as PIXI from "pixi.js";
import { drawTileXY } from "../utils/tilesheet";

export default () => {
  const graphic = new PIXI.Graphics();

  return {
    render: ({ castles, tiles }) => {
      graphic.clear();
      map(({ x, y, tileId }) => {
        drawTileXY({ graphic, tiles, x, y, tileId })
      })(castles)
    },
    view: graphic,
  }
}
