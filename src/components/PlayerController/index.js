import React from "react";
import styles from "./styles.scss";
import { View } from "react-native";
import TrackInfo from "./TrackInfo";
import * as Buttons from "./Buttons";
import SeekSlider from "./SeekSlider";
import TrackPlayer from "react-native-track-player";
import PlayerTracks from "../../models/PlayerTracks";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { playerTracksStateChanged } from "../../redux/actions/PlayerTracksActions";
import YourTracks from "../../models/YourTracks";

class PlayerController extends React.Component {
  render() {
    const track = YourTracks.getTrackByID(PlayerTracks.trackIDs[PlayerTracks.currentIndex]);

    return (
      <View style={[styles.container]}>
        <View>
          <TrackInfo track={track}/>
          <SeekSlider track={track} />
        </View>
        <View style={[styles.buttonsContainer]}>
          <Buttons.RepeatButton activated={PlayerTracks.isRepeat}
            onPress={this.onRepeatButtonPress} />
          <View style={{ flexDirection: "row" }}>
            <Buttons.BackwardButton onPress={this.onBackwardButtonPress} />
            <Buttons.PlayButton isPlaying={PlayerTracks.isPlaying}
              onPress={this.onPlayButtonPress} />
            <Buttons.ForwardButton onPress={this.onForwardButtonPress} />
          </View>
          <Buttons.ShuffleButton activated={PlayerTracks.isShuffle}
            onPress={this.onShuffleButtonPress} />
        </View>
      </View>
    );
  }

  onRepeatButtonPress = () => {
    PlayerTracks.isRepeat = !PlayerTracks.isRepeat;
    this.setState({});
  }

  onShuffleButtonPress = () => {
    PlayerTracks.isShuffle = !PlayerTracks.isShuffle;
    this.setState({});
  }

  onPlayButtonPress = () => {
    if (PlayerTracks.isPlaying) {
      TrackPlayer.pause().then(() => {
        PlayerTracks.isPlaying = false;
        this.setState({});
      }).catch(e => console.log(e));
    } else {
      TrackPlayer.play().then(() => {
        PlayerTracks.isPlaying = true;
        this.setState({});
      }).catch(e => console.log(e));
    }
  }

  onForwardButtonPress = () => {
    PlayerTracks.skipToNext().then(() => {
      this.props.playerTracksStateChanged();
    }).catch(e => console.log(e));
  }

  onBackwardButtonPress = () => {
    PlayerTracks.skipToPrev().then(() => {
      this.props.playerTracksStateChanged();
    }).catch(e => console.log(e));
  }
}

const mapStateToProps = (state) => ({
  playerTracks: state.playerTracks,
  yourTracks: state.yourTracks,
});

const mapDispatchToProps = (dispatch) => ({
  playerTracksStateChanged: bindActionCreators(playerTracksStateChanged, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(PlayerController);