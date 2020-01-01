import {
  playerPlayPause,
  playerSkipTrack,
} from '../redux/actions/playerActions';
import RNTP from 'react-native-track-player'
import { getPlayerQueue, skipToNext } from '../models/Player';

async function eventHandler(store, action) {
  console.log(action);
  const { isShuffle, isRepeat } = store.getState().player;

  switch (action.type) {
    case "remote-play":
      try {
        await RNTP.play();
        store.dispatch(playerPlayPause(true));
      } catch (e) { console.log(e); }
      break;

    case 'remote-pause':
      try {
        await RNTP.pause();
        store.dispatch(playerPlayPause(false));
      } catch (e) { console.log(e); }
      break;

    case 'remote-stop':
      try {
        await RNTP.stop();
        store.dispatch(playerPlayPause(false));
        const playerQueue = await getPlayerQueue();
        store.dispatch(playerSkipTrack(playerQueue.currentIndex));
      } catch (e) { console.log(e); }
      break;

    case 'remote-seek':

      break;

    case 'remote-next':
      try {
        await skipToNext(isShuffle);
        const playerQueue = await getPlayerQueue();
        store.dispatch(playerSkipTrack(playerQueue.currentIndex));
      } catch (e) { console.log(e); }
      break;

    case 'remote-previous':
      try {
        await RNTP.skipToPrevious();
        const playerQueue = await getPlayerQueue();
        store.dispatch(playerSkipTrack(playerQueue.currentIndex));
      } catch (e) { console.log(e); }
      break;

    case 'playback-track-changed':

      break;

    case 'playback-queue-ended':

      break;

    default:
      break;
  }
}

export default (store) => {
  return eventHandler.bind(null, store);
}