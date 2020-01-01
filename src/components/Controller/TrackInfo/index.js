import React from 'react'
import styles from './styles.scss'
import { connect } from 'react-redux'
import { Text, View } from 'react-native'
import RNTP from 'react-native-track-player'
import { convertSecondToMMSS } from '../../../utils/helperFunctions'

const DEFAULT_TRACK = {
  title: 'No Track To Play',
  duration: 0,
}

class TrackInfo extends RNTP.ProgressComponent {
  render() {
    let currentTrack = this.props.player.tracks[this.props.player.currentIndex];
    if(!currentTrack) currentTrack = DEFAULT_TRACK;
    const positionMMSS = convertSecondToMMSS(Math.floor(this.state.position));
    const durationMMSS = convertSecondToMMSS(currentTrack.duration);

    return (
      <View style={[styles.container]}>
        <Text style={[styles.trackTitle]}>{currentTrack.title}</Text>
        <Text style={[styles.trackProgress]}>
          {`${positionMMSS} / ${durationMMSS}`}
        </Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
})

export default connect(mapStateToProps, null)(TrackInfo)