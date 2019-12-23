export const YOUR_TRACKS_LOAD_DATA = "YourTracksLoadData";
export const YOUR_TRACKS_ADD_TRACKS = "YourTracksAddTracks";
export const YOUR_TRACKS_CREATE_TRACK = "YourTracksCreateTrack";
export const YOUR_TRACKS_UPDATE_TRACK = "YourTracksUpdateTrack";
export const YOUR_TRACKS_DELETE_TRACK = "YourTracksDeleteTrack";

export const yourTracksLoadData = () => (
  { type: YOUR_TRACKS_LOAD_DATA }
);
export const yourTracksAddTracks = (files) => (
  { type: YOUR_TRACKS_ADD_TRACKS, payload: files }
);
export const yourTracksCreateTrack = (track) => (
  { type: YOUR_TRACKS_CREATE_TRACK, payload: track }
);
export const yourTracksUpdateTrack = (track) => (
  { type: YOUR_TRACKS_UPDATE_TRACK, payload: track }
);
export const yourTracksDeleteTrack = (trackID) => (
  { type: YOUR_TRACKS_DELETE_TRACK, payload: trackID }
);