import EditText from './EditText'
import TrackHeader from './Header'
import EditArtwork from './EditArtwork'
import React, { Component } from 'react'
import { View, Modal } from 'react-native'
import FilesPicker from '../../../utils/FilesPicker'
import { UI_CONSTANTS } from '../../../utils/helperFunctions'
import DEFAULT_ARTWORK from '../../../assets/images/default-artwork.png'

class EditTrackModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      artist: '',
      artwork: '',
    }
  }

  UNSAFE_componentWillUpdate = () => {
    this._tempVisible = this.props.visible;
  }

  componentDidUpdate = () => {
    if (!this._tempVisible && this.props.visible) {
      this._artwork = this.props.track.artwork === UI_CONSTANTS.ARTWORK_URI ?
        DEFAULT_ARTWORK : { uri: this.props.track.artwork };
      this.setState({
        title: this.props.track.title,
        artist: this.props.track.artist,
        artwork: this.props.track.artwork,
      });
    }
  }

  render() {
    return (
      <Modal visible={this.props.visible}>
        <View style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
          <TrackHeader track={this.props.track}
            onHidePress={this.props.hideModal}
            onDonePress={this.onDonePress} />
          <View style={{ padding: 24 }}>
            <EditText title="Change track's title"
              value={this.state.title}
              onChangeText={text => this.setState({ title: text })} />
            <EditText title="Change track's artist"
              value={this.state.artist}
              onChangeText={text => this.setState({ artist: text })} />
            <EditArtwork title="Change track's artwork"
              imgSource={this._artwork}
              onImgPress={this.onArtworkPress} />
          </View>
        </View>
      </Modal>
    )
  }

  onDonePress = () => {
    const track = { ...this.props.track,
      title: this.state.title,
      artist: this.state.artist,
      artwork: this.state.artwork,
    }
    console.log(track);
    this.props.hideModal();
  }

  onArtworkPress = async () => {
    const selectedFile = await FilesPicker.showImageFilePickerDialog();
    this._artwork = { uri: selectedFile.filePath };
    this.setState({ artwork: selectedFile.filePath });
  }
}

export default EditTrackModal
