import React, { Component } from 'react'
import styles from './styles.scss'
import { RandomSolidSVGR, RepeatSolidSVGR } from '../../../assets/icons'
import { TouchableOpacity } from 'react-native'

const toggleButtonStyle = (isActivated) => {
  const style = [styles.toggleButton];
  if (isActivated) style.push(styles.activated);
  return style;
}

class ShuffleButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActivated: false,
    }
  }

  render() {
    return (
      <TouchableOpacity style={toggleButtonStyle(this.state.isActivated)}
        onPress={this.onPress}>
        <RandomSolidSVGR width="16" height="16" fill="#f2f2f2" />
      </TouchableOpacity>
    )
  }

  onPress = () => {
    console.log("ShuffleButton.onPress");
    this.setState({ isActivated: !this.state.isActivated });
  }
}

class RepeatButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActivated: false,
    }
  }

  render() {
    return (
      <TouchableOpacity style={toggleButtonStyle(this.state.isActivated)}
        onPress={this.onPress}>
        <RepeatSolidSVGR width="16" height="16" fill="#f2f2f2" />
      </TouchableOpacity>
    )
  }

  onPress = () => {
    console.log("RepeatButton.onPress");
    this.setState({ isActivated: !this.state.isActivated });
  }
}

export {
  ShuffleButton,
  RepeatButton,
}