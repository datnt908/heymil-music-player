import { Component } from 'react'
import { UI_CONSTANTS } from '../../utils/helperFunctions'
import defaultArtwork from '../../assets/images/default-artwork.png'

const MAX_LENGTH_STRING = 32;

class Track extends Component {
  constructor(props) {
    super(props);
    this._track = props.track;
    this._artwork = this._track.artwork === UI_CONSTANTS.ARTWORK_URI ?
      defaultArtwork : { uri: this._track.artwork };
  }

  baseUpdateData = () => {
    this._track = this.props.track;
    this._artwork = this._track.artwork === UI_CONSTANTS.ARTWORK_URI ?
      defaultArtwork : { uri: this._track.artwork };
  }
}

export default Track
