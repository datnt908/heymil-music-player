import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import YourTrack from '../Track/YourTrack'
import MoreOptsModal from '../Modals/MoreOpts'
import EditTrackModal from '../Modals/EditTrack'

const DEFAULT_LIST = ['123', '234', '345', '456', '567', '678'];
const OPTIONS = [
  'Edit track',
  'Remove track',
  'Add to playlist',
];

class YourTracksList extends Component {
  constructor(props) {
    super(props);
    this._tracks = this.props.tracks ? this.props.tracks : DEFAULT_LIST;
    this._track = null;
    this.state = {
      optsVisible: false,
      editVisible: false,
    }
  }

  render() {
    return (
      <>
        <ScrollView style={{ felx: 1 }}>
          {
            this._tracks.map(value => {
              return <YourTrack key={value}
                onClickMoreOpts={this.onTrackClickMoreOpts} />
            })
          }
        </ScrollView>
        <MoreOptsModal title="Options" opts={OPTIONS}
          visible={this.state.optsVisible}
          onOptionPress={this.onOptionPress}
          hideModal={() => this.setState({ optsVisible: false })} />
        <EditTrackModal visible={this.state.editVisible}
          track={this._track}
          hideModal={() => this.setState({ editVisible: false })} />
      </>
    )
  }

  onOptionPress = (index) => {
    switch (index) {
      case 0:
        this.setState({ editVisible: true });
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

export default YourTracksList
