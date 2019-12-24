import React from "react";
import styles from "./styles.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import OverflowMenu from "../OverflowMenu";
import TrackPlayer from "react-native-track-player";
import PlayerTracks from "../../models/PlayerTracks";
import defaultCover from "../../assets/images/logo-small.jpg";
import { convertSecondToMMSS } from "../../utils/helperFunctions";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { playerTracksStateChanged } from "../../redux/actions/PlayerTracksActions";

const options = [
  "Remove track",
  "Add to playlist"
];

class PlayerTrack extends React.Component {
  render() {
    const imgSource = this.props.track.artwork ?
      { uri: this.props.track.artwork } : defaultCover;
    const durationMMSS = convertSecondToMMSS(this.props.track.duration);
    const containerStyle = [styles.container];
    if (PlayerTracks.trackIDs[PlayerTracks.currentIndex] == this.props.track.id)
      containerStyle.push(styles.running);

    return (
      <View style={containerStyle}>
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
    );
  }

  onPlayerTrackPress = () => {
    const trackID = this.props.track.id;
    TrackPlayer.skip(trackID).then(() => {
      PlayerTracks.currentIndex = PlayerTracks.trackIDs.indexOf(trackID);
      this.props.playerTracksStateChanged();
    }).catch(e => console.log(e));
  }

  onOptionPress = (index) => {
    switch (index) {
      case 0:
        PlayerTracks.delTrack(this.props.track.id).then(() => {
          this.props.playerTracksStateChanged();
        }).catch(e => console.log(e));
        break;
      case 1:
        console.log("Add to playlist");
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
  playerTracksStateChanged: bindActionCreators(playerTracksStateChanged, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerTrack);