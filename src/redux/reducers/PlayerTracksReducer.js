import { PLAYER_TRACKS_STATE_CHANGED } from "../actions/PlayerTracksActions";

const DEFAULT_STATE = { actionType: "PlayerTracksDefaultAction" }

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case PLAYER_TRACKS_STATE_CHANGED:
      return { actionType: PLAYER_TRACKS_STATE_CHANGED };
      
    default:
      return state;
  }
}