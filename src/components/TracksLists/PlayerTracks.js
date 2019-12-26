import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import PlayerTrack from '../Track/PlayerTrack';

const DEFAULT_LIST = ['123', '234', '345', '456'];

class PlayerTracksList extends Component {
  constructor(props) {
    super(props);
    this._tracks = this.props.tracks ? this.props.tracks : DEFAULT_LIST;
  }

  render() {
    return (
      <ScrollView style={{ felx: 1 }}>
        {
          this._tracks.map(value => {
            return <PlayerTrack key={value} isRunning={value == "234"} />
          })
        }
      </ScrollView>
    )
  }
}

export default PlayerTracksList
