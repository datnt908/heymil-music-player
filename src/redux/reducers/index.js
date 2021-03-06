import { combineReducers } from 'redux'
import playerReducer from './playerReducer'
import yourTracksReducer from './yourTracksReducer'
import playlistsReducer from './playlistsReducer'

export default combineReducers({
  yourTracks: yourTracksReducer,
  player: playerReducer,
  playlists: playlistsReducer,
})