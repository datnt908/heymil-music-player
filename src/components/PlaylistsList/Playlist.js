import styles from './styles.scss'
import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { UI_CONSTANTS } from '../../utils/helperFunctions'
import DEFAULT_ARTWORK from '../../assets/images/default-artwork.png'

class Playlist extends Component {

  render() {
    const imgSources = this.props.playlist.getTop3ImgSources();

    return (
      <View style={[styles.playlist]}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Image style={[styles.image0]} source={imgSources[0]}/>
          <View style={{ justifyContent: "space-between" }}>
            <Image style={[styles.image1]} source={imgSources[1]}/>
            <Image style={[styles.image2]} source={imgSources[2]}/>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={[styles.playlistName]}>
            {this.props.playlist.name}
          </Text>
          <Text style={[styles.tracksCount]}>
            {this.props.playlist.tracks.length} track(s)
          </Text>
        </View>
      </View>
    )
  }
}

export default Playlist