export const PLAYER_TRACKS_LOAD_DATA = "PlayerTracksLoadData";
export const PLAYER_TRACKS_ADD_TRACK = "PlayerTracksAddTrack";
export const PLAYER_TRACKS_DEL_TRACK = "PlayerTracksDelTrack";

export const playerTracksLoadData = () => (
  { type: PLAYER_TRACKS_LOAD_DATA }
);
export const playerTracksAddTrack = (trackID) => (
  { type: PLAYER_TRACKS_ADD_TRACK, payload: trackID }
);
export const playerTracksDelTrack = (trackID) => (
  { type: PLAYER_TRACKS_DEL_TRACK, payload: trackID }
);