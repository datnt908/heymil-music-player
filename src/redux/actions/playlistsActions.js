export const PLAYLISTS_CREATE_PLAYLIST = "PlaylistsCreatePlaylist";
export const PLAYLISTS_DELETE_PLAYLIST = "PlaylistsDeletePlaylist";
export const PLAYLISTS_DELETE_TRACK = "PlaylistsDeleteTrack";
export const PLAYLISTS_ADD_TRACK = "PlaylistsAddTrack";
export const PLAYLISTS_LOAD_PLAYLISTS = "PlaylistsLoadPlaylists";

export const playlistsCreatePlaylist = (playlist) => ({
  type: PLAYLISTS_CREATE_PLAYLIST, payload: playlist,
});
export const playlistsDeletePlaylist = (index) => ({
  type: PLAYLISTS_DELETE_PLAYLIST, payload: index,
});
export const playlistsDeleteTrack = (plIndex, track) => ({
  type: PLAYLISTS_DELETE_TRACK, payload: { plIndex, track },
});
export const playlistsAddTrack = (plID, track) => ({
  type: PLAYLISTS_ADD_TRACK, payload: { plID, track },
});
export const playlistsLoadPlaylists = (yourTracks, playlistSchemas) => ({
  type: PLAYLISTS_LOAD_PLAYLISTS, payload: { yourTracks, playlistSchemas },
});
