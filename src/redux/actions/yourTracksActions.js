export const YOUR_TRACKS_ADD_TRACK = "YourTracksAddTrack";
export const YOUR_TRACKS_UPDATE_TRACK = "YourTracksUpdateTrack";
export const YOUR_TRACKS_DELETE_TRACK = "YourTracksDeleteTrack";
export const YOUR_TRACKS_LOAD_TRACKS = "YourTracksLoadTracks";

export const yourTracksAddTrack = (track) => ({
  type: YOUR_TRACKS_ADD_TRACK,
  payload: track,
});
export const yourTracksUpdateTrack = (track) => ({
  type: YOUR_TRACKS_UPDATE_TRACK,
  payload: track,
});
export const yourTracksDeleteTrack = (track) => ({
  type: YOUR_TRACKS_DELETE_TRACK,
  payload: track,
});
export const yourTracksLoadTracks = (tracks) => ({
  type: YOUR_TRACKS_LOAD_TRACKS,
  payload: tracks,
});