import React from "react";
import Slider from "@react-native-community/slider"
import styles from "./styles.scss";
import TrackPlayer from "react-native-track-player";

class SeekSlider extends TrackPlayer.ProgressComponent {
  render() {
    return (
      <Slider style={[styles.container]}
        disabled={!this.props.track || !this.props.track.duration}
        thumbTintColor="#bfbfbf"
        minimumTrackTintColor="#bfbfbf"
        maximumTrackTintColor="#404040"
        step={1}
        minimumValue={0}  
        maximumValue={this.props.track ? this.props.track.duration : 0}
        value={Math.floor(this.state.position)}
        onSlidingComplete={this.onSlidingComplete}
      />
    );
  }

  onSlidingComplete = (time) => {
    TrackPlayer.seekTo(time);
  }

}

export default SeekSlider;