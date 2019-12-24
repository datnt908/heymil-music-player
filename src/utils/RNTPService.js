import { Alert } from 'react-native';
import TrackPlayer from 'react-native-track-player';

async function eventHandler(store, action) {
  switch (action.type) {
    case "remote-play":
      break;
    case 'remote-pause':
      break;
    case 'remote-stop':
      break;
    case 'remote-next':
      break;
    case 'remote-previous':
      break;
    default:
      break;
  }
};

module.exports = function (store) {
  return eventHandler.bind(null, store);
};

export const RNTPOptions = {
  stopWithApp: true,
  capabilities: [
    TrackPlayer.CAPABILITY_STOP,
    TrackPlayer.CAPABILITY_PLAY,
    TrackPlayer.CAPABILITY_PAUSE,
    TrackPlayer.CAPABILITY_SEEK_TO,
    TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
    TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
  ],
  notificationCapabilities: [
    TrackPlayer.CAPABILITY_STOP,
    TrackPlayer.CAPABILITY_PLAY,
    TrackPlayer.CAPABILITY_PAUSE,
    TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
    TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
  ],
  compactCapabilities: [
    TrackPlayer.CAPABILITY_PLAY,
    TrackPlayer.CAPABILITY_PAUSE,
    TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
    TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
  ]
};