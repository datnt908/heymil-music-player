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
    if (this._track.title.length > MAX_LENGTH_STRING)
      this._track.title = this._track.title.substring(0, MAX_LENGTH_STRING) + '...';
    if (this._track.artist.length > MAX_LENGTH_STRING)
      this._track.artist = this._track.artist.substring(0, MAX_LENGTH_STRING) + '...';
  }

  baseUpdateData = () => {
    this._track = this.props.track;
    this._artwork = this._track.artwork === UI_CONSTANTS.ARTWORK_URI ?
      defaultArtwork : { uri: this._track.artwork };
    if (this._track.title.length > MAX_LENGTH_STRING)
      this._track.title = this._track.title.substring(0, MAX_LENGTH_STRING) + '...';
    if (this._track.artist.length > MAX_LENGTH_STRING)
      this._track.artist = this._track.artist.substring(0, MAX_LENGTH_STRING) + '...';
  }
}

export default Track
