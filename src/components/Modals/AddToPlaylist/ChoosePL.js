import styles from './styles.scss'
import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import DEFAULT_ARTWORK from '../../../assets/images/default-artwork.png'
import { UI_CONSTANTS } from '../../../utils/helperFunctions'

const DEFAULT_PLAYLIST = {
  name: "Playlist name",
  firstTrackArtwork: UI_CONSTANTS.ARTWORK_URI,
}

const DEFAULT_PLAYLISTS = [DEFAULT_PLAYLIST, DEFAULT_PLAYLIST, DEFAULT_PLAYLIST, DEFAULT_PLAYLIST];


class ChoosePL extends Component {
  render() {
    return (
      <>
        <Text style={[styles.optionTitle]}>Choose existed Playlist</Text>
        {
          DEFAULT_PLAYLISTS.map((value, index) => {
            return(
              <Playlist key={index} playlist={value}/>
            )
          })
        }
        <View style={[styles.separatedLine]} />
      </>
    )
  }
}

export default ChoosePL

class Playlist extends Component {
  constructor(props) {
    super(props);
    this._artwork = props.playlist.firstTrackArtwork === UI_CONSTANTS.ARTWORK_URI ?
      DEFAULT_ARTWORK : { uri: props.playlist.firstTrackArtwork };
  }

  render() {
    return (
      <View style={[styles.plContainer]}>
        <Image style={[styles.image]} source={this._artwork}/>
        <Text style={[styles.plName]}>{this.props.playlist.name}</Text>
      </View>
    )
  }
}
