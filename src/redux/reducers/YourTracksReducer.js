import {
  YOUR_TRACKS_LOAD_DATA,
  YOUR_TRACKS_ADD_TRACKS,
  YOUR_TRACKS_CREATE_TRACK,
  YOUR_TRACKS_UPDATE_TRACK,
  YOUR_TRACKS_DELETE_TRACK,
} from "../actions/YourTracksActions";

import YourTracks from "../../models/YourTracks";
const DEFAULT_STATE = { actionType: "YourTracksDefaultAction" }

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case YOUR_TRACKS_LOAD_DATA:
      return { actionType: action.type };

    case YOUR_TRACKS_ADD_TRACKS:
      YourTracks.addTracksFromFiles(action.payload);
      return { actionType: action.type };

    case YOUR_TRACKS_CREATE_TRACK:
      return { actionType: action.type };

    case YOUR_TRACKS_UPDATE_TRACK:
      return { actionType: action.type };

    case YOUR_TRACKS_DELETE_TRACK:
      return { actionType: action.type };

    default:
      return state;
  }
}