import {
  PLAYER_UPDATE_QUEUE,
  PLAYER_PLAY_PAUSE,
  PLAYER_SKIP_TRACK,
  PLAYER_SET_SHUFFLE,
  PLAYER_SET_REPEAT,
} from '../actions/playerActions'

const INITIAL_STATE = {
  tracks: [],
  currentIndex: -1,
  isPlaying: false,
  isShuffle: false,
  isRepeat: false,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PLAYER_UPDATE_QUEUE:
      return {
        ...state,
        tracks: action.payload.tracks,
        currentIndex: action.payload.currentIndex,
      };
    case PLAYER_PLAY_PAUSE:
      return { ...state, isPlaying: action.payload };

    case PLAYER_SKIP_TRACK:
      return { ...state, currentIndex: action.payload };

    case PLAYER_SET_SHUFFLE:
      return { ...state, isShuffle: action.payload };

    case PLAYER_SET_REPEAT:
      return { ...state, isRepeat: action.payload };

    default:
      return state;
  }
}