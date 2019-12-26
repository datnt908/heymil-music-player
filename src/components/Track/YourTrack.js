import React from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import Track from './Track'
import styles from './styles.scss'
import { convertSecondToMMSS } from '../../utils/helperFunctions';
import MoreOpts from '../MoreOpts'
import TextInputModal from '../Modals/TextInput'
import FilesPicker from '../../utils/FilesPicker';

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

  onOptionPress = (index) => {
    console.log('YourTrack.onOptionPress', index);
    switch (index) {
      case 0:
        FilesPicker.showImageFilePickerDialog().then(selectedFile => {
          console.log(selectedFile);
        }).catch(e => console.log(e));
        break;

      case 1:
        this.setState({ modalVisible: true });
        break;

      case 2:
        break;
        
      default:
        break;
    }
  }

  onTextInputModalDone = (text) => {
    console.log('YourTrack.onTextInputModalDone', text);
    this.setState({ modalVisible: false });
  }
}

export default YourTrack
