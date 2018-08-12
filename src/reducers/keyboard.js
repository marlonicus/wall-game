import { view } from "ramda";
import { playerMove, playerBuild, playerRotate } from "./player";
import { debugBuildCastle } from "./debug"
import { startGame, switchMode } from "./game"
import lenses from "../lenses";

export const keyPress = input => state => dispatch => {
  const gameMode = view(lenses.gameMode, state);

  // Universal controls
  switch (input) {
    case "left":
      return dispatch(playerMove({ x: -1, y: 0 }));
    case "up":
      return dispatch(playerMove({ x: 0, y: -1 }));
    case "right":
      return dispatch(playerMove({ x: 1, y: 0 }));
    case "down":
      return dispatch(playerMove({ x: 0, y: 1 }));
  }

  // Game mode specific controls
  switch (gameMode) {
    case "build":
      switch (input) {
        case "c":
          return dispatch(debugBuildCastle());

        case "n":
          return dispatch(startGame());

        case "enter":
          return dispatch(switchMode());

        case "z":
          return dispatch(playerBuild());

        case "x":
          return dispatch(playerRotate());
      }
      return;

    case "shoot":
      switch (input) {
        case "x":
          console.log('shoot')
      }
      return;

  }

};
