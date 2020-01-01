export const PLAYER_UPDATE_QUEUE = "PlayerUpdateQueue";
export const PLAYER_PLAY_PAUSE = "PlayerPlayPause";
export const PLAYER_SKIP_TRACK = "PlayerSkipTrack";
export const PLAYER_SET_SHUFFLE = "PlayerSetShuffle";
export const PLAYER_SET_REPEAT = "PlayerSetRepeat";

export const playerUpdateQueue = (queue) => ({
  type: PLAYER_UPDATE_QUEUE,
  payload: queue,
});
export const playerPlayPause = (isPlaying) => ({
  type: PLAYER_PLAY_PAUSE,
  payload: isPlaying,
});
export const playerSkipTrack = (newIndex) => ({
  type: PLAYER_SKIP_TRACK,
  payload: newIndex,
});
export const playerSetShuffle = (isShuffle) => ({
  type: PLAYER_SET_SHUFFLE,
  payload: isShuffle,
});
export const playerSetRepeat = (isRepeat) => ({
  type: PLAYER_SET_REPEAT,
  payload: isRepeat,
});