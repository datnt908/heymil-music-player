import Track from "./Track";
import * as TrackDAL from "../utils/database/TrackDAL";

class YourTracks {
  constructor() {
    this.tracks = [];
  }

  loadDataFromRealm = () => {
    const that = this;
    return new Promise((resolve, reject) => {
      TrackDAL.loadAllTracks().then(tracks => {
        that.tracks = tracks;
        resolve(tracks);
      }).catch(e => reject(e));
    });
  }

  saveDataIntoRealm = () => {
    const that = this;
    return new Promise((resolve, reject) => {
      TrackDAL.saveAllTracks(that.tracks).then(results => {
        resolve(results);
      }).catch(e => reject(e));
    });
  }

  addTracksFromFiles = (files) => {
    files.forEach(file => {
      const track = new Track();
      track.loadDataFromFile(file);
      this.createTrack(track);
    });
  }

  createTrack = (newTrack) => {
    let isDuplicated = false;
    for(let i = 0; i < this.tracks.length; i++)
      if(this.tracks[i].id === newTrack.id) {
        isDuplicated = true;
        break;
      }
    if(!isDuplicated) this.tracks.push(newTrack);
  }

  updateTrack = (newTrack) => {
    for(let i = 0; i < this.tracks.length; i++)
      if(this.tracks[i].id === newTrack.id) {
        this.tracks[i] = newTrack;
        break;
      }
  }

  deleteTrack = (trackID) => {
    for(let i = 0; i < this.tracks.length; i++)
      if(this.tracks[i].id === trackID) {
        this.tracks.splice(i, 1);
        break;
      }
  }
}

export default new YourTracks();