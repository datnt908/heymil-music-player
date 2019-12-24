import React from "react";
import styles from "./styles.scss";
import { connect } from "react-redux";
import InputModal from "../InputModal";
import { bindActionCreators } from "redux";
import OverflowMenu from "../OverflowMenu";
import FilesPicker from "../../utils/FilesPicker";
import PlayerTracks from "../../models/PlayerTracks";
import defaultCover from "../../assets/images/logo-small.jpg";
import { convertSecondToMMSS } from "../../utils/helperFunctions";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { yourTracksUpdateTrack, yourTracksDeleteTrack, } from "../../redux/actions/YourTracksActions";
import { playerTracksStateChanged, } from "../../redux/actions/PlayerTracksActions";

const options = [
  "Load artwork",
  "Change artist",
  "Remove track",
];

class YourTrack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    }
  }

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
        <InputModal visible={this.state.modalVisible} title="Input artist"
          onCancel={() => this.setState({ modalVisible: false })}
          onDone={this.onInputModalDone} />
      </>
    );
  }

  onInputModalDone = (text) => {
    this.setState({ modalVisible: false });
    const track = Object.create(this.props.track);
    track.artist = text;
    this.props.yourTracksUpdateTrack(track);
  }

  onYourTrackPress = () => {
    PlayerTracks.addTrack(this.props.track.id).then(() => {
      this.props.playerTracksStateChanged();
    }).catch(e => console.log(e));
  }

  onOptionPress = (index) => {
    switch (index) {
      case 0:
        const that = this;
        FilesPicker.showImageFilePickerDialog().then(result => {
          const track = Object.create(that.props.track);
          track.artwork = result.filePath;
          that.props.yourTracksUpdateTrack(track);
        }).catch(e => console.log(e));
        break;
      case 1:
        this.setState({ modalVisible: true });
        break;
      case 2:
        this.props.yourTracksDeleteTrack(this.props.track.id);
        PlayerTracks.delTrack(this.props.track.id).then(() => {
          this.props.playerTracksStateChanged();
        }).catch(e => console.log(e));
        break;
      default:
        break;
    }
  }
}

const mapStateToProps = (state) => ({
  yourTracks: state.yourTracks,
});

const mapDispatchToProps = (dispatch) => ({
  yourTracksUpdateTrack: bindActionCreators(yourTracksUpdateTrack, dispatch),
  yourTracksDeleteTrack: bindActionCreators(yourTracksDeleteTrack, dispatch),
  playerTracksStateChanged: bindActionCreators(playerTracksStateChanged, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(YourTrack);