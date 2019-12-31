import { connect } from 'react-redux'
import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import YourTrack from '../Track/YourTrack'

class YourTracksList extends Component {
  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        {
          this.props.yourTracks.map(value => {
            return <YourTrack key={value.id} track={value}/>
          })
        }
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => ({
  yourTracks: state.yourTracks,  
})

export default connect(mapStateToProps, null)(YourTracksList)