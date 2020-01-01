import React, { Component } from 'react'
import { Text, TextInput, View, Modal, TouchableOpacity } from 'react-native'
import styles from './styles.scss'

class TextInputModal extends Component {
  constructor(props) {
    super(props);
    this.state = { textValue: "" }
  }

  render() {
    return (
      <Modal transparent visible={this.props.visible}>
        <View style={[styles.modal]}>
          <View style={[styles.modalContainer, { elevation: 10 }]}>
            <Text style={[styles.textTitle]}>{this.props.title}</Text>
            <TextInput style={[styles.textInput]}
              onChangeText={this.onChangeText} />
            <View style={[styles.buttonsContainer]}>
              <TouchableOpacity onPress={this.onCancel}>
                <Text style={[styles.textButton]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onDone}>
                <Text style={[styles.textButton]}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  onChangeText = (text) => {
    this.setState({ textValue: text });
  }

  onCancel = () => {
    this.props.onCancel(this.state.textValue);
  }

  onDone = () => {
    this.props.onDone(this.state.textValue);
  }
}

export default TextInputModal
