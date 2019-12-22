import Realm from "realm";
import { PLAYER_SCHEMA_NAME, dbOptions } from "./config";

export const savePlayer = (player) => {
  return new Promise((resolve, reject) => {
    Realm.open(dbOptions).then(realm => {
      try {
        realm.write(() => {
          realm.create(PLAYER_SCHEMA_NAME, player, true);
        });
        resolve(player);
      } catch (e) { reject(e); }
    }).catch(e => reject(e));
  });
}

export const loadPlayer = () => {
  return new Promise((resolve, reject) => {
    Realm.open(dbOptions).then(realm => {
      resolve(realm.objectForPrimaryKey(PLAYER_SCHEMA_NAME, 0));
    }).catch(e => reject(e));
  });
}