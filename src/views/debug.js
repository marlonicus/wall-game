import config from "../config";
import lenses from "../lenses";
import { view } from "ramda";
import * as PIXI from "pixi.js";

export default () => {
  const style = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 20,
    fill: "white",
    stroke: '#000000',
    strokeThickness: 4,
  });

  const text = new PIXI.Text("Hello Pixi!", style);

  return {
    view: text,
    render: (state) => {
      text.text = view(lenses.gameMode, state)
    }
  };
};
