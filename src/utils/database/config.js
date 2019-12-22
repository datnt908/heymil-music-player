export const TRACK_SCHEMA_NAME = "Track";
export const PLAYER_SCHEMA_NAME = "Player";

export const TrackSchema = {
  name: TRACK_SCHEMA_NAME,
  primaryKey: "id",
  properties: {
    id: "int",
    url: "string",
    title: "string",
    artist: "string",
    artwork: "string",
    duration: "int",
  }
}

export const PlayerSchema = {
  name: PLAYER_SCHEMA_NAME,
  primaryKey: "id",
  properties: {
    id: "int",
    trackIDs: "int[]",
    currentIndex: "int",
  }
}

export const dbOptions = {
  schema: [PlayerSchema, TrackSchema],
}