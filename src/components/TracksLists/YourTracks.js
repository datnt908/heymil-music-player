import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import YourTrack from '../Track/YourTrack'

const DEFAULT_LIST = ['123', '234', '345', '456', '567', '678'];

class YourTracksList extends Component {
  constructor(props) {
    super(props);
    this._tracks = this.props.tracks ? this.props.tracks : DEFAULT_LIST;
  }

  render() {
    return (
      <ScrollView style={{ felx: 1 }}>
        {
          this._tracks.map(value => {
            return <YourTrack key={value} />
          })
        }
      </ScrollView>
    )
  }
}

export default YourTracksList
