import { combineReducers } from "redux";
import YourTracksReducer from "./YourTracksReducer";

export default combineReducers({
  yourTracks: YourTracksReducer,
})