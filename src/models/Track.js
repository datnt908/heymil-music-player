import { UI_CONSTANTS, generateID } from '../utils/helperFunctions'

export const getTrackFromFile = (file) => ({
  id: generateID(),
  url: file.path,
  title: file.name
    .replace(/-/g, " ")
    .replace(/_/g, " ")
    .replace(".mp3", ""),
  artist: "Unknow artist",
  artwork: UI_CONSTANTS.ARTWORK_URI,
  duration: 0,
})

export const getTrackFromSchema = (schema) => ({
  id: schema.id,
  url: schema.url,
  title: schema.title,
  artist: schema.artist,
  artwork: schema.artwork,
  duration: schema.duration,
})