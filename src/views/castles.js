import { map } from "ramda";
import * as PIXI from "pixi.js";
import { drawTileXY } from "../utils/tilesheet";

export default ({ tiles }) => {
  const graphic = new PIXI.Graphics();

  return {
    render: ({ castles }) => {
      map(({ x, y, tileId }) => {
        drawTileXY({ graphic, tiles, x, y, tileId })
      })(castles)
    },
    view: graphic,
  }
}
