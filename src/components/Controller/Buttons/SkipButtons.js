import React, { Component } from 'react'
import styles from './styles.scss'
import { ForwardSolidSVGR, BackwardSolidSVGR } from '../../../assets/icons'
import { TouchableOpacity } from 'react-native'

class ForwardButton extends Component {
  render() {
    return (
      <TouchableOpacity style={[styles.redictButton]}
        onPress={this.onPress}>
        <ForwardSolidSVGR width="32" height="32" fill="#f2f2f2" />
      </TouchableOpacity >
    )
  }

  onPress = () => {
    console.log("ForwardButton.onPress");
  }
}

class BackwardButton extends Component {
  render() {
    return (
      <TouchableOpacity style={[styles.redictButton]}
        onPress={this.onPress}>
        <BackwardSolidSVGR width="32" height="32" fill="#f2f2f2" />
      </TouchableOpacity >
    )
  }

  onPress = () => {
    console.log("BackwardButton.onPress");
  }
}

export {
  ForwardButton,
  BackwardButton,
}