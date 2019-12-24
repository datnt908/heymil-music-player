import YourTracks from "./YourTracks";
import * as PlayerDAL from "../utils/database/PlayerDAL";
import TrackPlayer from "react-native-track-player";
import { getRandomInt } from "../utils/helperFunctions";

class PlayerTracks {
  constructor() {
    this.trackIDs = [];
    this.currentIndex = 0;
    this.isPlaying = false;
    this.isShuffle = false;
    this.isRepeat = false;
  }

  clearAllTracks = () => {
    console.log("PlayerTracks.clearAllTracks");
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  addTrack = (trackID) => {
    const that = this;
    return new Promise((resolve, reject) => {
      for (let i = 0; i < this.trackIDs.length; i++) {
        if (this.trackIDs[i] === trackID) {
          TrackPlayer.skip(trackID).then(() => {
            that.currentIndex = i;
            resolve();
          }).catch(e => reject(e));
          return;
        }
      }

      const track = YourTracks.getTrackByID(trackID);
      if (track) {
        TrackPlayer.add(track).then(() => {
          that.trackIDs.push(trackID);
          TrackPlayer.skip(trackID).then(() => {
            that.currentIndex = that.trackIDs.length - 1;
            resolve();
          }).catch(e => reject(e));
        }).catch(e => reject(e));
      } else reject("ERROR: Can't add null track")
    });
  }

  delTrack = (trackID) => {
    const that = this;
    return new Promise((resolve, reject) => {
      for (let i = 0; i < this.trackIDs.length; i++) {
        if (this.trackIDs[i] === trackID) {
          if (this.currentIndex < i) {
            TrackPlayer.remove(trackID).then(() => {
              that.trackIDs.splice(i, 1);
              resolve();
            }).catch(e => reject(e));
          } else {
            TrackPlayer.reset().then(() => {
              that.trackIDs.splice(i, 1);
              if (that.trackIDs.length !== 0) {
                const tracks = [];
                that.trackIDs.forEach(trackID => {
                  tracks.push(YourTracks.getTrackByID(trackID));
                });
                TrackPlayer.add(tracks).then(() => {
                  if (that.currentIndex - 1 >= 0) that.currentIndex--;
                  TrackPlayer.skip(that.trackIDs[that.currentIndex])
                    .then(() => resolve()).catch(e => reject(e));
                }).catch(e => reject(e));
              } else resolve();
            }).catch(e => reject(e));
          }
          return;
        }
      }
      reject("ERROR: Can't delete a track not in queue");
    });
  }

  loadDataFromRealm = () => {
    const that = this;
    return new Promise((resolve, reject) => {
      PlayerDAL.loadPlayer().then(result => {
        const tracks = [];
        that.trackIDs = [];
        result.trackIDs.forEach(trackID => {
          const track = YourTracks.getTrackByID(trackID);
          if (track) {
            that.trackIDs.push(trackID);
            tracks.push(track);
          }
        });
        TrackPlayer.add(tracks).then(() => {
          that.currentIndex = result.currentIndex;
          if (that.currentIndex >= that.trackIDs.length)
            that.currentIndex = 0;
          TrackPlayer.skip(that.trackIDs[that.currentIndex])
            .then(() => resolve()).catch(e => reject(e));
        }).catch(e => reject(e));
      }).catch(e => reject(e));
    });
  }

  saveDataIntoRealm = () => {
    const that = this;
    return new Promise((resolve, reject) => {
      resolve();
      PlayerDAL.savePlayer({
        id: 0,
        currentIndex: that.currentIndex,
        trackIDs: that.trackIDs,
        isShuffle: that.isShuffle,
        isRepeat: that.isRepeat,
      }).then(() => resolve()).catch(e => reject(e));
    });
  }

}

export default new PlayerTracks();