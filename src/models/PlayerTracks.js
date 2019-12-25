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
    const that = this;
    return new Promise((resolve, reject) => {
      that.trackIDs = [];
      that.currentIndex = 0;
      TrackPlayer.stop().then(() => {
        TrackPlayer.reset()
          .then(() => resolve()).catch(e => reject(e));
      }).catch(e => reject(e));
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
            resolve(track);
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
            TrackPlayer.stop().then(() => {
              TrackPlayer.reset().then(() => {
                that.trackIDs.splice(i, 1);
                if (that.trackIDs.length !== 0) {
                  const tracks = [];
                  that.trackIDs.forEach(trackID => {
                    const track = YourTracks.getTrackByID(trackID);
                    if (track) tracks.push(track);
                  });
                  if (tracks.length > 0) {
                    TrackPlayer.add(tracks).then(() => {
                      if (that.currentIndex - 1 >= 0) that.currentIndex--;
                      TrackPlayer.skip(that.trackIDs[that.currentIndex])
                        .then(() => resolve()).catch(e => reject(e));
                    }).catch(e => reject(e));
                  } else resolve();
                } else resolve();
              }).catch(e => reject(e));
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
        that.isShuffle = result.isShuffle;
        that.isRepeat = result.isRepeat;
        result.trackIDs.forEach(trackID => {
          const track = YourTracks.getTrackByID(trackID);
          if (track) {
            that.trackIDs.push(trackID);
            tracks.push(track);
          }
        });
        if (tracks.length > 0) {
          TrackPlayer.add(tracks).then(() => {
            that.currentIndex = result.currentIndex;
            if (that.currentIndex >= that.trackIDs.length)
              that.currentIndex = 0;
            TrackPlayer.skip(that.trackIDs[that.currentIndex])
              .then(() => resolve()).catch(e => reject(e));
          }).catch(e => reject(e));
        } else resolve();
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

  skipToNext = () => {
    const that = this;
    return new Promise((resolve, reject) => {
      if (that.isShuffle) {
        const newID = that.trackIDs[getRandomInt(that.trackIDs.length)];
        TrackPlayer.skip(newID).then(() => {
          that.currentIndex = that.trackIDs.indexOf(newID)
          resolve();
        }).catch(e => reject(e));
      } else {
        TrackPlayer.skipToNext().then(() => {
          TrackPlayer.getCurrentTrack().then(trackID => {
            that.currentIndex = that.trackIDs.indexOf(trackID);
            resolve();
          }).catch(e => reject(e));
        }).catch(e => reject(e));
      }
    });
  }

  skipToPrev = () => {
    const that = this;
    return new Promise((resolve, reject) => {
      TrackPlayer.skipToPrevious().then(() => {
        TrackPlayer.getCurrentTrack().then(trackID => {
          that.currentIndex = that.trackIDs.indexOf(trackID);
          resolve();
        }).catch(e => reject(e));
      }).catch(e => reject(e));
    });
  }

  onTrackEnd = (trackID, position) => {
    const track = YourTracks.getTrackByID(trackID);
    if (track) {
      if (track.duration == Math.floor(position)) {
        if (this.isRepeat) {
          TrackPlayer.skipToPrevious();
        } else {
          TrackPlayer.skipToPrevious().then(() =>{
            this.skipToNext();
          });
        }
      }
    }
  }
}

export default new PlayerTracks();