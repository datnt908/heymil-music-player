import { Component } from 'react'
import { UI_CONSTANTS } from '../../utils/helperFunctions'
import defaultArtwork from '../../assets/images/default-artwork.png'

const DEFAULT_TRACK = {
  title: 'ERROR!!! No Track To Show',
  artist: 'ERROR!!! No Track To Show',
  artwork: UI_CONSTANTS.ARTWORK_URI,
  duration: 0,
}

class Track extends Component {
  constructor(props) {
    super(props);
    this._track = props.track ? props.track : DEFAULT_TRACK;
    this._artwork = this._track.artwork === UI_CONSTANTS.ARTWORK_URI ?
      defaultArtwork : { uri: this._track.artwork };
  }
}

export default Track
