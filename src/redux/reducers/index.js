import { combineReducers} from 'redux'
import yourTracksReducer from './yourTracksReducer'

export default combineReducers({
  yourTracks: yourTracksReducer,
})