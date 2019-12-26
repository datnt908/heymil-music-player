import React, { Component } from 'react'
import styles from './styles.scss'
import Slider from '@react-native-community/slider'

const DEFAULT_TRACK = {
  duration: 0,
}

class SeekSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      track: props.track ? props.track : DEFAULT_TRACK,
      position: 0,
    }
  }

  render() {
    return (
      <Slider style={[styles.container]}
        disabled={!this.state.track.duration}
        thumbTintColor="#bfbfbf"
        minimumTrackTintColor="#bfbfbf"
        maximumTrackTintColor="#404040"
        step={1}
        minimumValue={0}  
        maximumValue={this.state.track.duration}
        value={Math.floor(this.state.position)}
        onSlidingComplete={this.onSlidingComplete}
      />
    )
  }

  onSlidingComplete = (time) => {
    console.log("SeekSlider.onSlidingComplete", time);
  }
}

export default SeekSlider
