import Realm from "realm";
import { PLAYER_SCHEMA_NAME, dbOptions } from "./config";

export const savePlayer = (player) => {
  return new Promise((resolve, reject) => {
    Realm.open(dbOptions).then(realm => {
      try {
        realm.write(() => { realm.create(PLAYER_SCHEMA_NAME, player, true); });
        resolve();
      } catch (e) { reject(e); }
    }).catch(e => reject(e));
  });
}

export const loadPlayer = () => {
  return new Promise((resolve, reject) => {
    Realm.open(dbOptions).then(realm => {
      const playerModal = {
        trackIDs: [],
        currentIndex: 0,
        isShuffle: false,
        isRepeat: false,
      };
      const playerSchema = realm.objectForPrimaryKey(PLAYER_SCHEMA_NAME, 0);
      if (playerSchema != undefined) {
        playerModal.trackIDs = playerSchema.trackIDs;
        playerModal.currentIndex = playerSchema.currentIndex;
        playerModal.isShuffle = playerSchema.isShuffle;
        playerModal.isRepeat = playerSchema.isRepeat;
      }
      resolve(playerModal);
    }).catch(e => reject(e));
  });
}