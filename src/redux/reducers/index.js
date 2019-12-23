import { combineReducers } from "redux";
import YourTracksReducer from "./YourTracksReducer";
import PlayerTracksReducer from "./PlayerTracksReducer";

export default combineReducers({
  yourTracks: YourTracksReducer,
  playerTracks: PlayerTracksReducer,
})