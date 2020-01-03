import React, { Component } from 'react'
import styles from './styles.scss'
import { Text, View, Modal, ScrollView } from 'react-native'
import TrackHeader from './Header'
import ChoosePL from './ChoosePL'
import CreateNew from './CreateNew'
import { UI_CONSTANTS } from '../../../utils/helperFunctions'
import DEFAULT_ARTWORK from '../../../assets/images/default-artwork.png'


class AddToPlaylistModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPLname: "New Playlist",
    }
  }

  UNSAFE_componentWillUpdate = () => {
    this._tempVisible = this.props.visible;
  }

  componentDidUpdate = () => {
    if (!this._tempVisible && this.props.visible) {
      this._artwork = this.props.track.artwork === UI_CONSTANTS.ARTWORK_URI ?
        DEFAULT_ARTWORK : { uri: this.props.track.artwork };
    }
  }
  render() {
    return (
      <Modal visible={this.props.visible}>
        <View style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
          <TrackHeader track={this.props.track}
            onHidePress={this.props.hideModal}
            onDonePress={this.onDonePress} />
            <ScrollView style={[styles.contents]}>
              <ChoosePL />
              <CreateNew imgSource={this._artwork}
                onCreatePress={this.onCreatePress} />
            </ScrollView>
        </View>
      </Modal>
    )
  }

  onCreatePress = (text) => {
    console.log(text);
  }
}

export default AddToPlaylistModal
