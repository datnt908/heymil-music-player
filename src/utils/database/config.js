export const TRACK_SCHEMA_NAME = "Track";

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

export const dbOptions = {
  schema: [TrackSchema],
}