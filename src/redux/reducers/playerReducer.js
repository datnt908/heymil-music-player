import { PLAYER_UPDATE_QUEUE } from '../actions/playerActions'

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

    default:
      return state;
  }
}