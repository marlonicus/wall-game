import { times } from "ramda";

export const generateBoard = ({ width, height }) => {
  return times(y => {
    return times(x => {
      if (y === 0 || y === height - 1 || x === 0 || x === width - 1) {
        return 2;
      }
      return 1;
    }, width);
  })(height);
};
