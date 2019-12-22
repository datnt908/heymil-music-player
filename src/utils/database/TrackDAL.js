import Realm from "realm";
import { TRACK_SCHEMA_NAME, dbOptions } from "./config";
import Track from "../../models/Track";

export const saveAllTracks = (tracks) => {
  return new Promise((resolve, reject) => {
    Realm.open(dbOptions).then(realm => {
      try {
        realm.write(() => {
          realm.delete(realm.objects(TRACK_SCHEMA_NAME));
          tracks.forEach(track => {
            realm.create(TRACK_SCHEMA_NAME, track);
          });
        });
        resolve(tracks);
      } catch (e) { reject(e); }
    }).catch(e => reject(e));
  });
}

export const loadAllTracks = () => {
  return new Promise((resolve, reject) => {
    Realm.open(dbOptions).then(realm => {
      const tracks = [];
      realm.objects(TRACK_SCHEMA_NAME).forEach(schema => {
        const track = new Track(); 
        track.loadDataFromSchema(schema);
        tracks.push(track);
      });
      resolve(tracks);
    }).catch(e => reject(e));
  });
}