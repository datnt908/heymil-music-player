import { connect } from 'react-redux'
import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import PlayerTrack from '../Track/PlayerTrack';

class PlayerTracksList extends Component {
  render() {
    return (
      <ScrollView style={{ felx: 1 }}>
        {
          this.props.player.tracks.map((value, index) => {
            return <PlayerTrack key={value.id} track={value}
              isRunning={index === this.props.player.currentIndex} />
          })
        }
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
})

export default connect(mapStateToProps, null)(PlayerTracksList)