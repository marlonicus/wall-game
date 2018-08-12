import { clone } from "ramda";

export default (data, x, y, newValue) => {
  const dataCloned = clone(data);
  const target = dataCloned[x][y];

  const flow = (x, y) => {
    // bounds check what we were passed
    if (x >= 0 && x < dataCloned.length && y >= 0 && y < dataCloned[x].length) {
      if (dataCloned[x][y] === target) {
        dataCloned[x][y] = newValue;
        flow(x - 1,y);
        flow(x + 1,y);
        flow(x,y - 1);
        flow(x, y + 1);
      }
    }
  };

  flow(x,y);
  return dataCloned;
};
