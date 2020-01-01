async function eventHandler(store, action) {
  console.log(action);

  switch (action.type) {
    case "remote-play":

      break;

    case 'remote-pause':

      break;

    case 'remote-stop':

      break;

    case 'remote-seek':

      break;

    case 'remote-next':

      break;

    case 'remote-previous':

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