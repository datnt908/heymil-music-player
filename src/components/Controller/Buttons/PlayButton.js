import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import * as Icons from '../../../assets/icons'
import styles from './styles.scss'

class PlayButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
    }
  }

  render() {
    return (
      <TouchableOpacity style={[styles.redictButton, styles.playColor]}
        onPress={this.onPress}>
        {this.getPlayOrPauseJSX()}
      </TouchableOpacity>
    )
  }

  onPress = () => {
    console.log("PlayButton.onPress");
    this.setState({isPlaying: !this.state.isPlaying});
  }

  getPlayOrPauseJSX = () => {
    if (!this.state.isPlaying)
      return (
        <View style={{ marginLeft: 4 }}>
          <Icons.PlaySolidSVGR height="32" width="32" fill="#f2f2f2" />
        </View>
      );
    else
      return (
        <Icons.PauseSolidSVGR height="100%" width="100%" fill="#f2f2f2" />
      );
  }
}

export default PlayButton
