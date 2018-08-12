import lenses from "../lenses";
import { view, set, append } from "ramda";

export const debugBuildCastle = () => state => {
  const targetX = view(lenses.cursorX, state);
  const targetY = view(lenses.cursorY, state);

  const newCastles = append(
    { x: targetX, y: targetY, tileId: 4 },
    view(lenses.castles, state)
  );

  return set(lenses.castles, newCastles, state);
};
