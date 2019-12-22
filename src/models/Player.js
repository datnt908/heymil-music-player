import * as PlayerDAL from "../utils/database/PlayerDAL";

class Player {
  constructor() {
    this.id = 0;
    this.trackIDs = [];
    this.currentIndex = 0;
  }

  loadDataFromRealm = () => {
    const that = this;
    return new Promise((resolve, reject) => {
      PlayerDAL.loadPlayer().then(result => {
        if(result != undefined) {
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
}

export default new Player();