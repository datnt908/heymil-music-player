import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import styles from './styles.scss'
import { convertSecondToMMSS } from '../../utils/helperFunctions';
import Track from './Track';
import MoreOpts from '../MoreOpts';

const options = [
  'Remove track',
  'Add to playlist'
];

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
          <MoreOpts opts={options} onOptionPress={this.onOptionPress} />
        </View>
      </View>
    )
  }

  onTrackPress = () => {
    console.log('PlayerTrack.onTrackPress');
  }

  onOptionPress = (index) => {
    console.log('PlayerTrack.onOptionPress', index);
    switch (index) {
      case 0:
        break;

      case 1:
        break;

      default:
        break;
    }
  }

}

export default PlayerTrack
