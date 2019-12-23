import React from "react";
import styles from "./styles.scss";
import { View, Text } from "react-native";
import { convertSecondToMMSS } from "../../../utils/helperFunctions";
import Track from "../../../models/Track";

const DEFAULT_TRACK = new Track();
DEFAULT_TRACK.title = "No Track To Play";

class TrackInfo extends React.Component {
  render() {
    const track = this.props.track ? this.props.track : DEFAULT_TRACK;
    const positionMMSS = convertSecondToMMSS(this.props.position);
    const durationMMSS = convertSecondToMMSS(track.duration);
    return (
      <View style={[styles.container]}>
        <Text style={[styles.trackTitle]}>{track.title}</Text>
        <Text style={[styles.trackProgress]}>
          {`${positionMMSS} / ${durationMMSS}`}
        </Text>
      </View>
    );
  }
}

export default TrackInfo;