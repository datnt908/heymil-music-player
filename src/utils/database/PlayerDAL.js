import Realm from "realm";
import { PLAYER_SCHEMA_NAME, dbOptions } from "./config";

export const savePlayer = async (player) => {
  const realmOpened = await Realm.open(dbOptions);
  const trackIDs = [];
  player.tracks.forEach(track => {
    trackIDs.push(track.id);
  });
  realmOpened.write(() => {
    const playerSchema = {
      id: 0,
      trackIDs: trackIDs,
      currentIndex: player.currentIndex,
      isShuffle: player.isShuffle,
      isRepeat: player.isRepeat,
    }
    realmOpened.create(PLAYER_SCHEMA_NAME, playerSchema, true);
  });
}

export const loadPlayerSchema = async () => {
  const realmOpened = await Realm.open(dbOptions);
  const playerSchema = await realmOpened.objectForPrimaryKey(PLAYER_SCHEMA_NAME, 0);
  return playerSchema;
}