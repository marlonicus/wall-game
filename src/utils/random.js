import { length } from "ramda";

export const randomFromArray = array =>
  array[Math.floor(Math.random() * length(array))];

export const randomOffset = (val, range = 4) =>
  val + Math.ceil(Math.random() * range) - range / 2;
