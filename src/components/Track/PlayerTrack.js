import React from 'react'
import Track from './Track'
import styles from './styles.scss'
import { EllipsisHSolidSVGR } from '../../assets/icons'
import { convertSecondToMMSS } from '../../utils/helperFunctions'
import { Text, View, TouchableOpacity, Image } from 'react-native'

class PlayerTrack extends Track {
  render() {
    const durationMMSS = convertSecondToMMSS(this._track.duration);
    const containerStyle = [styles.container];
    if (this.props.isRunning) containerStyle.push(styles.running);

    return (
      <View style={containerStyle}>
        <TouchableOpacity onPress={this.onTrackPress}
          style={{ flexDirection: "row", alignItems: "center" }}>
          <Image style={[styles.image]} source={this._artwork} />
          <View style={{ marginLeft: 12 }}>
            <Text style={[styles.musicTitle, styles.lightColor]}>
              {this._track.title}</Text>
            <Text style={[styles.musicArtist, styles.lightColor]}>
              {this._track.artist}</Text>
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={[styles.musicDuration, styles.lightColor]}>
            {durationMMSS}</Text>
          <TouchableOpacity style={[styles.iconContainer]}
            onPress={() => this.props.onClickMoreOpts(this._track)}>
            <EllipsisHSolidSVGR width="12" height="12" fill="#f2f2f2" />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  onTrackPress = () => {
    console.log('PlayerTrack.onTrackPress');
  }

}

export default PlayerTrack
