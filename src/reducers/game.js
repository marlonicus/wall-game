import { set, view, clone, map, always, pipe } from "ramda";
import lenses from "../lenses";

export const startGame = () => state => {
  const boardMap = view(lenses.boardMap, state);
  const emptyWallMap = map(map(always(0)))(boardMap)

  return pipe(
    set(lenses.wallMap, emptyWallMap),
    set(lenses.gameStarted, true)
  )(state)
}
