import { generateID, UI_CONSTANTS } from "../utils/helperFunctions";
import DEFAULT_ARTWORK from '../assets/images/default-artwork.png'

export default class Playlist {
  constructor(name) {
    this.id = generateID();
    this.name = name;
    this.tracks = [];
  }

  addTrack = (track) => {
    let index = -1;
    for (let i = 0; i < this.tracks.length; ++i)
      if (this.tracks[i].id === track.id) {
        index = i; break;
      }
    if (index === -1)
      this.tracks.push(track);
  }

  delTrack = (track) => {
    let index = -1;
    for (let i = 0; i < this.tracks.length; ++i)
      if (this.tracks[i].id === track.id) {
        index = i; break;
      }
    if (index !== -1)
      this.tracks.splice(index, 1);
  }

  getTop3ImgSources = () => {
    const imgSources = [];
    for (let i = 0; i < 3; ++i)
      if (this.tracks[i]) {
        const imgSource = this.tracks[i].artwork === UI_CONSTANTS.ARTWORK_URI ?
          DEFAULT_ARTWORK : { uri: this.tracks[i].artwork };
        imgSources.push(imgSource);
      } else {
        imgSources.push(null);
      }
    return imgSources;
  }
}

