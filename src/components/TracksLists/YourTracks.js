import MoreOpts from '../Modals/MoreOpts'
import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import YourTrack from '../Track/YourTrack'

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
        <MoreOpts title="Options" opts={OPTIONS}
          visible={this.state.optsVisible}
          onOptionPress={this.onOptionPress}
          hideModal={this.hideModal} />
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

  hideModal = () => {
    this.setState({ optsVisible: false });
  }

  onTrackClickMoreOpts = (track) => {
    this._track = track;
    this.setState({ optsVisible: true });
  }
}

export default YourTracksList
