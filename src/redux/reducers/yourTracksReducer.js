import {
  YOUR_TRACKS_ADD_TRACK,
  YOUR_TRACKS_DELETE_TRACK,
  YOUR_TRACKS_UPDATE_TRACK,
  YOUR_TRACKS_LOAD_TRACKS
} from '../actions/yourTracksActions'

const INITIAL_STATE = []

export default (state = INITIAL_STATE, action) => {
  let newTracks;
  switch (action.type) {
    case YOUR_TRACKS_ADD_TRACK:
      newTracks = yourTracksAddTrack(state, action.payload);
      if (newTracks.length === state.length)
        return state;
      return newTracks;

    case YOUR_TRACKS_DELETE_TRACK:
      newTracks = yourTracksDeleteTrack(state, action.payload);
      if (newTracks.length === state.length)
        return state;
      return newTracks;

    case YOUR_TRACKS_UPDATE_TRACK:
      newTracks = yourTracksUpdateTrack(state, action.payload);
      return newTracks;

    case YOUR_TRACKS_LOAD_TRACKS:
      newTracks = yourTracksLoadTracks(state, action.payload);
      return newTracks;

    default:
      return state;
  }
}

const yourTracksAddTrack = (currentTracks, newTrack) => {
  const tracks = currentTracks.slice();
  let index = -1;
  for (let i = 0; i < tracks.length; ++i) {
    const equalTitle = tracks[i].title === newTrack.title;
    const equalID = tracks[i].id === newTrack.id;
    if (equalTitle || equalID) {
      index = i; break;
    }
  }
  if (index < 0)
    tracks.push(newTrack);
  return tracks;
}

const yourTracksUpdateTrack = (currentTracks, track) => {
  const tracks = currentTracks.slice();
  let index = -1;
  for (let i = 0; i < tracks.length; i++)
    if (tracks[i].id === track.id) {
      index = i; break;
    }
  if (index >= 0)
    tracks[index] = track;
  return tracks;
}

const yourTracksDeleteTrack = (currentTracks, track) => {
  const tracks = currentTracks.slice();
  let index = -1;
  for (let i = 0; i < tracks.length; i++)
    if (tracks[i].id === track.id) {
      index = i; break;
    }
  if (index >= 0)
    tracks.splice(index, 1);
  return tracks;
}

const yourTracksLoadTracks = (currentTracks, newTracks) => {
  return newTracks;
}