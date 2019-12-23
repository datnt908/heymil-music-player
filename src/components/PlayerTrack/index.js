import React from "react";
import styles from "./styles.scss";
import { connect } from "react-redux";
import { bindActionCreators} from "redux";
import OverflowMenu from "../OverflowMenu";
import defaultCover from "../../assets/images/logo-small.jpg";
import { convertSecondToMMSS } from "../../utils/helperFunctions";
import { View, Text, Image, TouchableOpacity } from "react-native";
import * as playerTracksActions from "../../redux/actions/PlayerTracksActions";

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
          <TouchableOpacity onPress={this.onPlayerTrackPress}
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

  onPlayerTrackPress = () => {
    console.log("onPlayerTrackPress");
  }

  onOptionPress = (index) => {
    console.log(options[index]);
    switch (index) {
      case 0:
        this.props.playerTracksDelTrack(this.props.track.id);
        break;
      case 1:
        break;
      default:
        break;
    }
  }
}

const mapStateToProps = (state) => ({
  playerTracks: state.playerTracks,
});

const mapDispatchToProps = (dispatch) => ({
  playerTracksDelTrack: bindActionCreators(playerTracksActions.playerTracksDelTrack, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerTrack);