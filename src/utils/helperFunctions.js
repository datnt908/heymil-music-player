import { Dimensions } from 'react-native'

const ID_LENGTH = 8;

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
  ARTWORK_URI: 'https://i.ibb.co/F5QwTxZ/logo-small.jpg',
  MOREOPTS_HEIGHT: 60,
}

export const generateID = () => {
  let timestamp = (+new Date).toString();
  let parts = timestamp.split("").reverse();
  let id = "";
  for (let i = 0; i < ID_LENGTH; ++i)
    id += parts[getRandomInt(0, parts.length)];
  return id.toString();
}

export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}