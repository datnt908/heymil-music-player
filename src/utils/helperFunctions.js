import { Dimensions } from "react-native";

export const hashStringToInteger = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash += Math.pow(str.charCodeAt(i) * 31, str.length - i);
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

export const convertSecondToMMSS = (second_number) => {
  let minutes = Math.floor(second_number / 60);
  let seconds = second_number % 60;
  if(minutes < 10) minutes = "0" + minutes;
  if(seconds < 10) seconds = "0" + seconds;
  return `${minutes}:${seconds}`;
}

export const UI_CONSTANTS = {
  VIEW_HEIGHT: Dimensions.get("window").height - 24,
  VIEW_WIDTH: Dimensions.get("window").width,
  PLAYER_CONTROLLER_HEIGHT: 160,
  HEADER_HEIGHT: 64,
  SCROLL_VIEW_HEIGHT: Dimensions.get("window").height - 272,
  PLAYER_CONTROLLER_TOP: Dimensions.get("window").height - 184,
}