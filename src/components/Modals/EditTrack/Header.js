import styles from './styles.scss'
import React, { Component } from 'react'
import InfoTrack from '../../Track/InfoTrack'
import { TimesSolidSVGR } from '../../../assets/icons'
import { Text, View, TouchableOpacity } from 'react-native'

class TrackHeader extends Component {
  render() {
    return (
      <>
        <View style={[styles.header]}>
          <TouchableOpacity style={[styles.iconContainer]}
            onPress={this.props.onHidePress}>
            <TimesSolidSVGR width="100%" height="100%" fill="#f2f2f2" />
          </TouchableOpacity>
          <Text style={[styles.title]}>Edit Track</Text>
          <TouchableOpacity
            onPress={this.props.onDonePress}>
            <Text style={[styles.doneButton]}>Done</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.infoTrack]}>
          <InfoTrack track={this.props.track}/>
        </View>
      </>
    )
  }
}

export default TrackHeader
