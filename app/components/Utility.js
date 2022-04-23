import { Dimensions } from "react-native";

export const width = Dimensions.get("screen").width;
export const height = Dimensions.get("screen").height;

export function randomHSL() {
  return `hsla(${~~(360 * Math.random())},80%,90%,0.8)`;
}
