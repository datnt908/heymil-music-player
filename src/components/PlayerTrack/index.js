import React from "react";
import styles from "./styles.scss";
import defaultCover from "../../assets/images/logo-small.jpg";
import { convertSecondToMMSS } from "../../utils/helperFunctions";
import { View, Text, Image, TouchableOpacity } from "react-native";
import OverflowMenu from "../OverflowMenu";

const options = [
  "Remove track",
  "Add to playlist"
];

class PlayerTrack extends React.Component {
  render() {
    const imgSource = this.props.track.artwork ?
      { uri: this.props.track.artwork } : defaultCover;
    const durationMMSS = convertSecondToMMSS(this.props.track.duration);

    return (
      <>
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
            <OverflowMenu opts={options} onOptionPress={this.onOptionPress} />
          </View>
        </View>
      </>
    );
  }

  onYourTrackPress = () => {
    console.log("onYourTrackPress");
  }

  onOptionPress = (index) => {
    console.log(options[index]);
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

export default PlayerTrack;