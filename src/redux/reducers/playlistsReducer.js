import {
  PLAYLISTS_CREATE_PLAYLIST,
  PLAYLISTS_DELETE_PLAYLIST,
  PLAYLISTS_DELETE_TRACK,
  PLAYLISTS_ADD_TRACK,
  PLAYLISTS_LOAD_PLAYLISTS
} from "../actions/playlistsActions";
import Playlist from '../../models/Playlist'

const INITIAL_STATE = []

export default (state = INITIAL_STATE, action) => {
  let newPlaylists;
  switch (action.type) {
    case PLAYLISTS_CREATE_PLAYLIST:
      newPlaylists = playlistsCreatePlaylist(state, action.payload);
      if (!newPlaylists)
        return state;
      return newPlaylists;

    case PLAYLISTS_DELETE_PLAYLIST:
      newPlaylists = playlistsDeletePlaylist(state, action.payload);
      return newPlaylists;

    case PLAYLISTS_DELETE_TRACK:
      newPlaylists = playlistsDeleteTrack(state, action.payload.plIndex, action.payload.track);
      return newPlaylists;

    case PLAYLISTS_ADD_TRACK:
      newPlaylists = playlistsAddTrack(state, action.payload.plID, action.payload.track);
      if (!newPlaylists)
        return state;
      return newPlaylists;

    case PLAYLISTS_LOAD_PLAYLISTS:
      newPlaylists = playlistsLoadPlaylists(state, action.payload.yourTracks, action.payload.playlistSchemas);
      return newPlaylists;

    default:
      return state;
  }
}

const playlistsCreatePlaylist = (currentPlaylists, newPlaylist) => {
  const playlists = currentPlaylists.slice();
  let index = -1;
  for (let i = 0; i < playlists.length; ++i)
    if (playlists[i].id === newPlaylist.id) {
      index = i; return null;
    }
  if (index < 0)
    playlists.push(newPlaylist);
  return playlists;
}

const playlistsDeletePlaylist = (currentPlaylists, index) => {
  const playlists = currentPlaylists.slice();
  playlists.splice(index, 1);
  return playlists;
}

const playlistsDeleteTrack = (currentPlaylists, plIndex, delTrack) => {
  const playlist = Object.create(currentPlaylists[plIndex]);
  for (let i = 0; i < playlist.tracks.length; ++i)
    if (playlist.tracks[i].id === delTrack.id) {
      playlist.tracks.splice(i, 1); break;
    }

  const playlists = currentPlaylists.slice();
  playlists[plIndex] = playlist;
  return playlists;
}

const playlistsAddTrack = (currentPlaylists, plID, addTrack) => {
  let plIndex = -1;
  for (let i = 0; i < currentPlaylists.length; ++i)
    if (currentPlaylists[i].id === plID) {
      plIndex = i; break;
    }
  if (plIndex >= 0) {
    let playlist = Object.create(currentPlaylists[plIndex]);
    let trackIndex = -1;
    for (let i = 0; i < playlist.tracks.length; ++i)
      if (playlist.tracks[i].id === addTrack.id) {
        trackIndex = i; break;
      }
    if (trackIndex < 0) {
      playlist.tracks.push(addTrack);
      const playlists = currentPlaylists.slice();
      playlists[plIndex] = playlist;
      return playlists;
    }
  }
  return null;
}

export const playlistsLoadPlaylists = (currentPlaylists, tracks, schemas) => {
  const playlists = [];
  schemas.forEach(schema => {
    const playlist = new Playlist(schema.name);
    playlist.id = schema.id;
    schema.trackIDs.forEach(trackID => {
      for (let i = 0; i < tracks.length; ++i)
        if (tracks[i].id === trackID) {
          playlist.addTrack(tracks[i]); break;
        }
    });
    playlists.push(playlist);
  });
  return playlists;
}