import React from "react";
import Slider from "@react-native-community/slider"
import styles from "./styles.scss";

class SeekSlider extends React.Component {
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
        value={this.props.position}
        onSlidingStart={this.props.onSlidingStart}
        onSlidingComplete={this.props.onSlidingComplete}
      />
    );
  }
}

export default SeekSlider;