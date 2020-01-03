import styles from './styles.scss'
import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'

class ChoosePL extends Component {
  render() {
    return (
      <>
        <Text style={[styles.optionTitle]}>Choose existed Playlist</Text>
        {
          this.props.playlists.map(value => {
            return (<Playlist key={value.id} playlist={value} 
              onPress={this.props.onPLpress}/>)
          })
        }
        <View style={[styles.separatedLine]} />
      </>
    )
  }
}

export default ChoosePL

class Playlist extends Component {
  render() {
    const imgSources = this.props.playlist.getTop3ImgSources();
    return (
      <TouchableOpacity style={[styles.plContainer]}
        onPress={() => this.props.onPress(this.props.playlist.id)}> 
        <Image style={[styles.image]} source={imgSources[0]} />
        <Text style={[styles.plName]}>{this.props.playlist.name}</Text>
      </TouchableOpacity>
    )
  }
}
