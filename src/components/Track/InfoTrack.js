import React from 'react'
import Track from './Track'
import styles from './styles.scss'
import { Text, View, Image } from 'react-native'
import { convertSecondToMMSS } from '../../utils/helperFunctions'

class InfoTrack extends Track {
  render() {
    const durationMMSS = convertSecondToMMSS(this._track.duration);

    return (
      <View style={[styles.container]}>
        <View
          style={{ flexDirection: "row", alignItems: "center" }}>
          <Image style={[styles.image]} source={this._artwork} />
          <View style={{ marginLeft: 12 }}>
            <Text style={[styles.musicTitle, styles.lightColor]}>
              {this._track.title}</Text>
            <Text style={[styles.musicArtist, styles.lightColor]}>
              {this._track.artist}</Text>
          </View>
        </View>
        <View style={{ marginRight: 11 }}>
          <Text style={[styles.musicDuration, styles.lightColor]}>
            {durationMMSS}</Text>
        </View>
      </View>
    )
  }
}

export default InfoTrack
