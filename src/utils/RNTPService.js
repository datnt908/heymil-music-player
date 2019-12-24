import TrackPlayer from 'react-native-track-player';
import PlayerTracks from '../models/PlayerTracks';

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
