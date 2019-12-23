import {
  PLAYER_TRACKS_LOAD_DATA,
  PLAYER_TRACKS_ADD_TRACK,
  PLAYER_TRACKS_DEL_TRACK,
} from "../actions/PlayerTracksActions";
import PlayerTracks from "../../models/PlayerTracks";

const DEFAULT_STATE = { actionType: "PlayerTracksDefaultAction" }

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case PLAYER_TRACKS_LOAD_DATA:
      return { actionType: action.type };

    case PLAYER_TRACKS_ADD_TRACK:
      PlayerTracks.addTrack(action.payload);
      return { actionType: action.type };

    case PLAYER_TRACKS_DEL_TRACK:
      PlayerTracks.delTrack(action.payload);
      return { actionType: action.type };

    default:
      return state;
  }
}