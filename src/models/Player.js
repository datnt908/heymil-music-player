import RNTP from 'react-native-track-player'
import { getRandomInt } from '../utils/helperFunctions';
import { loadPlayerSchema } from '../utils/database/PlayerDAL';

export const RNTPOptions = {
  stopWithApp: true,
  capabilities: [
    RNTP.CAPABILITY_STOP,
    RNTP.CAPABILITY_PLAY,
    RNTP.CAPABILITY_PAUSE,
    RNTP.CAPABILITY_SEEK_TO,
    RNTP.CAPABILITY_SKIP_TO_NEXT,
    RNTP.CAPABILITY_SKIP_TO_PREVIOUS,
  ],
  compactCapabilities: [
    RNTP.CAPABILITY_PLAY,
    RNTP.CAPABILITY_PAUSE,
    RNTP.CAPABILITY_SKIP_TO_NEXT,
    RNTP.CAPABILITY_SKIP_TO_PREVIOUS,
  ]
};

export const getPlayerQueue = async () => {
  const tracks = await RNTP.getQueue();
  const currentTrackID = await RNTP.getCurrentTrack();
  let currentTrackIndex = -1;
  for (let i = 0; i < tracks.length; i++)
    if (tracks[i].id === currentTrackID) {
      currentTrackIndex = i; break;
    }
  return { tracks: tracks, currentIndex: currentTrackIndex };
}

export const addTrack = async (track) => {
  const tracks = await RNTP.getQueue();
  for (let i = 0; i < tracks.length; i++)
    if (tracks[i].id === track.id) {
      await RNTP.skip(track.id);
      return;
    }
  await RNTP.add(track);
  await RNTP.skip(track.id);
}

export const delTrack = async (track) => {
  const queue = await getPlayerQueue();
  for (let i = 0; i < queue.tracks.length; i++)
    if (queue.tracks[i].id === track.id) {
      const tracks = queue.tracks.slice();
      tracks.splice(i, 1);
      if (i > queue.currentIndex) {
        await RNTP.remove(track.id);
      } else {
        await RNTP.stop();
        await RNTP.reset();
        await RNTP.add(tracks);
        if (queue.currentIndex > 1)
          await RNTP.skip(tracks[queue.currentIndex - 1].id);
      }
      return;
    }
}

export const skipToNext = async (isShuffle) => {
  const tracks = await RNTP.getQueue();
  if (isShuffle) {
    const newIndex = getRandomInt(0, tracks.length);
    await RNTP.skip(tracks[newIndex].id);
  } else {
    await RNTP.skipToNext();
  }
}

export const loadFromSchema = async (yourTracks) => {
  const playerSchema = await loadPlayerSchema();
  const currentTrackID = playerSchema.trackIDs[playerSchema.currentIndex];
  const tracks = [];
  for(let i = 0; i < playerSchema.trackIDs.length; i++) 
    for(let j = 0; j < yourTracks.length; j++)
      if(playerSchema.trackIDs[i] === yourTracks[j].id) {
        tracks.push(yourTracks[j]); break;
      }
  
  if (tracks.length > 0) {
    await RNTP.add(tracks);
    await RNTP.skip(currentTrackID);
  }
}