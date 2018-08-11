import "babel-polyfill";
import * as PIXI from "pixi.js";
import Game from "./game";

window.PIXI = PIXI;
PIXI.utils.sayHello();

const init = () => {
  const app = new PIXI.Application({});
  const canvas = document.querySelector("canvas");
  canvas && document.body.removeChild(canvas);
  document.body.appendChild(app.view);

  const game = Game({ pixiApp: app })
};

init()
