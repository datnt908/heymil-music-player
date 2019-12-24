import { hashStringToInteger } from "../utils/helperFunctions";

export default class Track {
  constructor() {
    this.id = null;
    this.url = null;
    this.title = null;
    this.artist = null;
    this.artwork = null;
    this.duration = null;
  }

  loadDataFromFile = (file) => {
    this.id = hashStringToInteger(file.filePath);
    this.url = file.filePath;
    this.title = file.fileName
      .replace(/-/g, " ")
      .replace(/_/g, " ")
      .replace(".mp3", "");
    this.artist = "Unknow artist";
    this.artwork = "https://i.ibb.co/F5QwTxZ/logo-small.jpg";
    this.duration = 0;
  }

  loadDataFromSchema = (schema) => {
    this.id = schema.id;
    this.url = schema.url;
    this.title = schema.title;
    this.artist = schema.artist;
    this.artwork = schema.artwork;
    this.duration = schema.duration;
  }
}