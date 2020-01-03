import styles from './styles.scss'
import React, { Component } from 'react'
import { BarSolidSVGR } from '../../assets/icons'
import { Text, View, TouchableOpacity } from 'react-native'

class Header extends Component {
  render() {
    return (
      <View style={[styles.container]}>
        <TouchableOpacity style={[styles.iconContainer]}
          onPress={this.props.onLeftIconPress}>
          {this.props.leftIconElement}
        </TouchableOpacity>
        <Text style={[styles.title]}>{this.props.title}</Text>
        <TouchableOpacity style={[styles.iconContainer]}
          onPress={this.onRightIconPress}>
          <BarSolidSVGR width="100%" height="100%" fill="#404040" />
        </TouchableOpacity>
      </View>
    )
  }

  onRightIconPress = () => {
    this.props.navigator.show();
  }
}

export default Header
