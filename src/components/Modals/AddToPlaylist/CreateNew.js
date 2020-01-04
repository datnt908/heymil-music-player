import styles from './styles.scss'
import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native'

class CreateNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'New Playlist',
    }
  }


  render() {
    return (
      <>
        <Text style={[styles.optionTitle]}>Create new Playlist</Text>
        <View style={[styles.images]}>
          <Image style={[styles.image0]} source={this.props.imgSource} />
          <View style={{ justifyContent: "space-between" }}>
            <Image style={[styles.image1]} />
            <Image style={[styles.image2]} />
          </View>
        </View>
        <Text style={[styles.plName]}>Playlist name</Text>
        <TextInput style={[styles.textInput]} maxLength={48}
          onChangeText={text => this.setState({ text: text })}
          value={this.state.text} />
        <TouchableOpacity style={[styles.button]}
          onPress={() => this.props.onCreatePress(this.state.text)}>
          <Text style={[styles.buttonLabel]}>Create</Text>
        </TouchableOpacity>
      </>
    )
  }
}

export default CreateNew
