import { playerMove, playerBuild } from "./player";

export const keyPress = direction => state => dispatch => {
  switch (direction) {
    case "left":
      return dispatch(playerMove({ x: -1, y: 0 }));
    case "up":
      return dispatch(playerMove({ x: 0, y: -1 }));
    case "right":
      return dispatch(playerMove({ x: 1, y: 0 }));
    case "down":
      return dispatch(playerMove({ x: 0, y: 1 }));

    case "space":
      return dispatch(playerBuild());
  }
};
