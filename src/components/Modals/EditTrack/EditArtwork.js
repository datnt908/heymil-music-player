import styles from './styles.scss'
import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'

export class EditArtwork extends Component {
  render() {
    return (
      <>
        <Text style={[styles.editTitle]}>{this.props.title}</Text>
        <TouchableOpacity style={[styles.image]}
          onPress={this.props.onImgPress}>
          <Image style={[styles.image]} source={this.props.imgSource} />
        </TouchableOpacity>
        <View style={[styles.separatedLine]} />
      </>
    )
  }
}

export default EditArtwork
