import { combineReducers } from 'redux'
import playerReducer from './playerReducer'
import yourTracksReducer from './yourTracksReducer'

export default combineReducers({
  yourTracks: yourTracksReducer,
  player: playerReducer,
})