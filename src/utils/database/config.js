export const TRACK_SCHEMA_NAME = "Track";
export const PLAYER_SCHEMA_NAME = "Player";

export const TrackSchema = {
  name: TRACK_SCHEMA_NAME,
  primaryKey: "id",
  properties: {
    id: "string",
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
    trackIDs: "string[]",
    currentIndex: "int",
  }
}

export const dbOptions = {
  schema: [PlayerSchema, TrackSchema],
}