import React from 'react'
import Track from './Track'
import styles from './styles.scss'
import MoreOpts from '../MoreOpts'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TextInputModal from '../Modals/TextInput'
import { convertSecondToMMSS } from '../../utils/helperFunctions'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { showImageFilePickerDialog } from '../../utils/FilesPicker'
import { yourTracksUpdateTrack, yourTracksDeleteTrack } from '../../redux/actions/yourTracksActions';

const options = [
  'Load artwork',
  'Change artist',
  'Remove track',
];

class YourTrack extends Track {
  constructor(props) {
    super(props);
    this.state = { modalVisible: false, }
  }

  render() {
    const durationMMSS = convertSecondToMMSS(this._track.duration);

    return (
      <>
        <View style={[styles.container]}>
          <TouchableOpacity onPress={this.onTrackPress}
            style={{ flexDirection: "row", alignItems: "center" }}>
            <Image style={[styles.image]} source={this._artwork} />
            <View style={{ marginLeft: 12 }}>
              <Text style={[styles.musicTitle, styles.darkColor]}>
                {this._track.title}</Text>
              <Text style={[styles.musicArtist, styles.darkColor]}>
                {this._track.artist}</Text>
            </View>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={[styles.musicDuration, styles.darkColor]}>
              {durationMMSS}</Text>
            <MoreOpts opts={options} onOptionPress={this.onOptionPress} />
          </View>
        </View>
        <TextInputModal visible={this.state.modalVisible} title="Input artist"
          onCancel={() => this.setState({ modalVisible: false })}
          onDone={this.onTextInputModalDone} />
      </>
    )
  }

  onTrackPress = () => {
    console.log('YourTrack.onTrackPress');
  }

  onOptionPress = async (index) => {
    console.log('YourTrack.onOptionPress', index);
    switch (index) {
      case 0:
        try {
          const selectedFile = await showImageFilePickerDialog();
          this._track.artwork = selectedFile.path;
          this._artwork = { uri: this._track.artwork };
          this.props.yourTracksUpdateTrack(this._track);
          this.setState({});
        }
        catch (e) { console.log(e); }
        break;

      case 1:
        this.setState({ modalVisible: true });
        break;

      case 2:
        this.props.yourTracksDeleteTrack(this._track);
        break;

      default:
        break;
    }
  }

  onTextInputModalDone = (text) => {
    if (text !== "") {
      this._track.artist = text;
      this.props.yourTracksUpdateTrack(this._track);
    }
    this.setState({ modalVisible: false });
  }
}

const mapDispatchToProps = (dispatch) => ({
  yourTracksUpdateTrack: bindActionCreators(yourTracksUpdateTrack, dispatch),
  yourTracksDeleteTrack: bindActionCreators(yourTracksDeleteTrack, dispatch),
});

export default connect(null, mapDispatchToProps)(YourTrack)
