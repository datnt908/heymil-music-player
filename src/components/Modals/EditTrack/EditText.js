import styles from './styles.scss'
import React, { Component } from 'react'
import { Text, View, TextInput } from 'react-native'

const MAX_LENGTH_STRING = 32;

export class EditText extends Component {
  render() {
    return (
      <>
        <Text style={[styles.editTitle]}>{this.props.title}</Text>
        <TextInput style={[styles.textInput]} maxLength={MAX_LENGTH_STRING}
          onChangeText={this.props.onChangeText}
          value={this.props.value} />
        <View style={[styles.separatedLine]} />
      </>
    )
  }
}

export default EditText
