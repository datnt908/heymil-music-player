import { connect } from 'react-redux'
import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { bindActionCreators } from 'redux'
import MoreOptsModal from '../Modals/MoreOpts'
import PlaylistTrack from '../Track/PlaylistTrack'
import { playlistsDeleteTrack } from '../../redux/actions/playlistsActions'

const OPTIONS = [
  'Remove track',
];

class PlaylistTracksList extends Component {
  constructor(props) {
    super(props);
    this._track = null;
    this.state = {
      optsVisible: false,
    }
  }

  render() {
    return (
      <>
        <ScrollView style={{ felx: 1 }}>
          {
            this.props.tracks.map(value => {
              return <PlaylistTrack key={value.id} track={value}
                onClickMoreOpts={this.onTrackClickMoreOpts}
                onTrackPress={this.props.onTrackPress} />
            })
          }
        </ScrollView>
        <MoreOptsModal title="Options" opts={OPTIONS}
          visible={this.state.optsVisible}
          onOptionPress={this.onOptionPress}
          hideModal={() => this.setState({ optsVisible: false })} />
      </>
    )
  }

  onOptionPress = (index) => {
    switch (index) {
      case 0:
        this.props.playlistsDeleteTrack(this.props.currentIndex, this._track);
        break;

      default:
        break;
    }
  }

  onTrackClickMoreOpts = (track) => {
    this._track = track;
    this.setState({ optsVisible: true });
  }
}

const mapDispatchToProps = (dispatch) => ({
  playlistsDeleteTrack: bindActionCreators(playlistsDeleteTrack, dispatch),
})

export default connect(null, mapDispatchToProps)(PlaylistTracksList)
