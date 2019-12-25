import TrackPlayer from 'react-native-track-player';
import PlayerTracks from '../models/PlayerTracks';
import { yourTracksUpdateTrack } from "../redux/actions/YourTracksActions";
import { playerTracksStateChanged } from "../redux/actions/PlayerTracksActions";
import YourTracks from '../models/YourTracks';

async function eventHandler(store, action) {
  switch (action.type) {
    case "remote-play":
      TrackPlayer.play().then(() => {
        PlayerTracks.isPlaying = true;
        store.dispatch(playerTracksStateChanged());
      }).catch(e => console.log(e));
      break;

    case 'remote-pause':
      TrackPlayer.pause().then(() => {
        PlayerTracks.isPlaying = false;
        store.dispatch(playerTracksStateChanged());
      }).catch(e => console.log(e));
      break;

    case 'remote-stop':
      TrackPlayer.stop().then(()=> {
        PlayerTracks.isPlaying = false;
        PlayerTracks.currentIndex = 0;
        store.dispatch(playerTracksStateChanged());
      }).catch(e => console.log(e));
      break;

    case 'remote-seek':
      TrackPlayer.seekTo(Math.floor(action.position))
      .then(()=>{}).catch(e => console.log(e));
      break;

    case 'remote-next':
      PlayerTracks.skipToNext().then(() => {
        store.dispatch(playerTracksStateChanged());
      }).catch(e => console.log(e));
      break;

    case 'remote-previous':
      PlayerTracks.skipToPrev().then(() => {
        store.dispatch(playerTracksStateChanged());
      }).catch(e => console.log(e));
      break;

    case 'playback-track-changed':
      TrackPlayer.getCurrentTrack().then(trackID => {
        TrackPlayer.getDuration().then(duration => {
          const track = YourTracks.getTrackByID(trackID);
          if (track) {
            PlayerTracks.onTrackEnd(action.track, action.position);
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
