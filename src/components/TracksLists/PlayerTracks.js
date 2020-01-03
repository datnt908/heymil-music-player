import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import PlayerTrack from '../Track/PlayerTrack'
import MoreOptsModal from '../Modals/MoreOpts'

const DEFAULT_LIST = ['123', '234', '345', '456'];
const OPTIONS = [
  'Remove track',
  'Add to playlist'
];

class PlayerTracksList extends Component {
  constructor(props) {
    super(props);
    this._tracks = this.props.tracks ? this.props.tracks : DEFAULT_LIST;
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
            this._tracks.map(value => {
              return <PlayerTrack key={value} isRunning={value == "234"}
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
    console.log(OPTIONS[index]);
    console.log(this._track);
    switch (index) {
      case 0:
        break;

      case 2:
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

export default PlayerTracksList
