import styles from './styles.scss'
import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { UI_CONSTANTS } from '../../utils/helperFunctions'
import DEFAULT_ARTWORK from '../../assets/images/default-artwork.png'

class Playlist extends Component {

  render() {
    const imgSource0 = getImgSourceFromTrack(this.props.playlist.tracks[0]);
    const imgSource1 = getImgSourceFromTrack(this.props.playlist.tracks[1]);
    const imgSource2 = getImgSourceFromTrack(this.props.playlist.tracks[2]);

    return (
      <View style={[styles.playlist]}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Image style={[styles.image0]} source={imgSource0}/>
          <View style={{ justifyContent: "space-between" }}>
            <Image style={[styles.image1]} source={imgSource1}/>
            <Image style={[styles.image2]} source={imgSource2}/>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={[styles.playlistName]}>
            {this.props.playlist.playlistName}
          </Text>
          <Text style={[styles.tracksCount]}>
            {this.props.playlist.tracks.length}
          </Text>
        </View>
      </View>
    )
  }
}

export default Playlist

const getImgSourceFromTrack = (track) => {
  if (track) {
    const artwork = track.artwork;
    const imgSource = artwork === UI_CONSTANTS.DEFAULT_PLAYLIST ?
      DEFAULT_ARTWORK : { uri: artwork };
    return imgSource;
  }
  return null;
}