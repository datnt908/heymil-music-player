import Realm from 'realm'
import { dbOptions, PLAYLIST_SCHEMA_NAME } from './config'

export const saveAllPlaylists = async (playlists) => {
  const playlistSchemas = [];
  playlists.forEach(playlist => {
    const trackIDs = [];
    playlist.tracks.forEach(track => {
      trackIDs.push(track.id);
    });
    const playlistSchema = {
      id: playlist.id,
      name: playlist.name,
      trackIDs: trackIDs,
    }
    playlistSchemas.push(playlistSchema);
  });

  const realmOpened = await Realm.open(dbOptions);
  realmOpened.write(() => {
    realmOpened.delete(realmOpened.objects(PLAYLIST_SCHEMA_NAME));
    playlistSchemas.forEach(playlistSchema => {
      realmOpened.create(PLAYLIST_SCHEMA_NAME, playlistSchema);
    });
  });
}

export const loadAllPlaylistSchemas = async () => {
  const realmOpened = await Realm.open(dbOptions);
  const playlistSchemas = realmOpened.objects(PLAYLIST_SCHEMA_NAME);
  return playlistSchemas;
}