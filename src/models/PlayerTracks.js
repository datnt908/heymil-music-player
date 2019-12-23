import YourTracks from "./YourTracks";
import * as PlayerDAL from "../utils/database/PlayerDAL";

class PlayerTracks {
  constructor() {
    this.id = 0;
    this.trackIDs = [];
    this.currentIndex = 0;
  }

  loadDataFromRealm = () => {
    const that = this;
    return new Promise((resolve, reject) => {
      PlayerDAL.loadPlayer().then(result => {
        if (result != undefined) {
          that.currentIndex = result.currentIndex;
          that.trackIDs = [];
          result.trackIDs.forEach(id => {
            that.trackIDs.push(id);
          });
        }
        resolve(that);
      }).catch(e => reject(e));
    });
  }

  saveDataIntoRealm = () => {
    const that = this;
    return new Promise((resolve, reject) => {
      PlayerDAL.savePlayer(that).then(result => {
        resolve(result);
      }).catch(e => reject(e));
    });
  }

  addTrack = (trackID) => {
    for (let i = 0; i < this.trackIDs.length; i++)
      if(this.trackIDs[i] === trackID)
        return;
    for (let i = 0; i < YourTracks.tracks.length; i++)
      if (YourTracks.tracks[i].id === trackID) {
        this.trackIDs.push(trackID);
        break;
      }
  }


  getTrack = (index) => {
    for (let i = 0; i < YourTracks.tracks.length; i++)
      if (YourTracks.tracks[i].id === this.trackIDs[index])
        return YourTracks.tracks[i];
    return null;
  }

  delTrack = (trackID) => {
    for (let i = 0; i < this.trackIDs.length; i++)
      if (this.trackIDs[i] === trackID) {
        this.trackIDs.splice(i, 1);
        if (this.currentIndex === i) this.currentIndex = i - 1;
      }
  }

  getCurrentTrack = () => {
    for (let i = 0; i < YourTracks.tracks.length; i++)
      if (YourTracks.tracks[i].id === this.trackIDs[this.currentIndex])
        return YourTracks.tracks[i];
    return null;
  }
}

export default new PlayerTracks();