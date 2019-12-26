import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { convertSecondToMMSS } from '../../../utils/helperFunctions'
import styles from './styles.scss'

const DEFAULT_TRACK = {
  title: 'No Track To Play',
  duration: 0,
}

class TrackInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      track: props.track ? props.track : DEFAULT_TRACK,
      position: 0,
    }
  }

  render() {
    const positionMMSS = convertSecondToMMSS(this.state.position);
    const durationMMSS = convertSecondToMMSS(this.state.track.duration);

    return (
      <View style={[styles.container]}>
        <Text style={[styles.trackTitle]}>{this.state.track.title}</Text>
        <Text style={[styles.trackProgress]}>
          {`${positionMMSS} / ${durationMMSS}`}
        </Text>
      </View>
    )
  }
}

export default TrackInfo
