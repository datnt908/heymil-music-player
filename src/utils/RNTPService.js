import TrackPlayer from 'react-native-track-player';
import PlayerTracks from '../models/PlayerTracks';
import { yourTracksUpdateTrack } from "../redux/actions/YourTracksActions";
import YourTracks from '../models/YourTracks';

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

    case 'playback-track-changed':
      TrackPlayer.getCurrentTrack().then(trackID => {
        TrackPlayer.getDuration().then(duration => {
          const track = YourTracks.getTrackByID(trackID);
          if (track) {
            track.duration = Math.floor(duration);
            store.dispatch(yourTracksUpdateTrack(track));
          }
        }).catch(e => console.log(e));
      }).catch(e => console.log(e));

      break;
    default:
      break;
  }
};

module.exports = function (store) {
  return eventHandler.bind(null, store);
};
