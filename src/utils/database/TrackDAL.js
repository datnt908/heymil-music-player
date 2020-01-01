import Realm from 'realm'
import { TRACK_SCHEMA_NAME, dbOptions } from './config'
import { getTrackFromSchema } from '../../models/Track'

export const saveAllTracks = async (tracks) => {
  const realmOpened = await Realm.open(dbOptions);
  realmOpened.write(() => {
    realmOpened.delete(realmOpened.objects(TRACK_SCHEMA_NAME));
    tracks.forEach(track => {
      realmOpened.create(TRACK_SCHEMA_NAME, track);
    });
  });
}

export const loadAllTracks = async () => {
  const tracks = [];
  const realmOpened = await Realm.open(dbOptions);
  realmOpened.objects(TRACK_SCHEMA_NAME).forEach(schema => {
    tracks.push(getTrackFromSchema(schema));
  });
  return tracks;
}