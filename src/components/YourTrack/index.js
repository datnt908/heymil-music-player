import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import styles from "./styles.scss";
import { CaretDownSolidSVGR } from "../../assets/icons";
import defaultCover from "../../assets/images/logo-small.jpg";
import { convertSecondToMMSS } from "../../utils/helperFunctions";

class YourTrack extends React.Component {
  render() {
    const imgSource = this.props.track.artwork ?
      { uri: this.props.track.artwork } : defaultCover;
    const durationMMSS = convertSecondToMMSS(this.props.track.duration);

    return (
      <View style={[styles.container]}>
        <TouchableOpacity onPress={this.onYourTrackPress}
          style={{ flexDirection: "row", alignItems: "center" }}>
          <Image style={[styles.image]} source={imgSource} />
          <View style={{ marginLeft: 12 }}>
            <Text style={[styles.musicTitle]}>{this.props.track.title}</Text>
            <Text style={[styles.musicArtist]}>{this.props.track.artist}</Text>
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={[styles.musicDuration]}>{durationMMSS}</Text>
          <TouchableOpacity onPress={this.onMoreOptionsPress}
            style={[styles.moreOptsContainer]}>
            <CaretDownSolidSVGR width="16" height="16" fill="#404040" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  onYourTrackPress = () => {
    console.log("onYourTrackPress");
  }

  onMoreOptionsPress = () => {
    console.log("onMoreOptionsPress");
  }
}

export default YourTrack;