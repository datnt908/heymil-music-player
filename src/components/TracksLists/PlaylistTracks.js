import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import MoreOptsModal from '../Modals/MoreOpts'
import PlaylistTrack from '../Track/PlaylistTrack'

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
              return <PlaylistTrack key={value}
                onClickMoreOpts={this.onTrackClickMoreOpts} />
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
        console.log("Remove track from Playlist")
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

export default PlaylistTracksList
