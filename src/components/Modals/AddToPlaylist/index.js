import React, { Component } from 'react'
import styles from './styles.scss'
import { Text, View, Modal, ScrollView } from 'react-native'
import TrackHeader from './Header'
import ChoosePL from './ChoosePL'
import CreateNew from './CreateNew'
import { UI_CONSTANTS } from '../../../utils/helperFunctions'
import DEFAULT_ARTWORK from '../../../assets/images/default-artwork.png'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { playlistsCreatePlaylist, playlistsAddTrack } from '../../../redux/actions/playlistsActions'
import Playlist from '../../../models/Playlist'

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
            onHidePress={this.props.hideModal} />
          <ScrollView style={[styles.contents]}>
            <ChoosePL playlists={this.props.playlists}
              onPLpress={this.onPlaylistPress} />
            <CreateNew imgSource={this._artwork}
              onCreatePress={this.onCreatePress} />
          </ScrollView>
        </View>
      </Modal>
    )
  }

  onPlaylistPress = (id) => {
    this.props.playlistsAddTrack(id, this.props.track);
    this.props.hideModal();
  }

  onCreatePress = (text) => {
    const playlist = new Playlist(text);
    playlist.addTrack(this.props.track);
    this.props.playlistsCreatePlaylist(playlist);
    this.props.hideModal();
  }
}

const mapStateToProps = (state) => ({
  playlists: state.playlists,
})

const mapDispatchToProps = (dispatch) => ({
  playlistsCreatePlaylist: bindActionCreators(playlistsCreatePlaylist, dispatch),
  playlistsAddTrack: bindActionCreators(playlistsAddTrack, dispatch),
})


export default connect(mapStateToProps, mapDispatchToProps)(AddToPlaylistModal)
