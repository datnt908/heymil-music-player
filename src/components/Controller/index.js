import React, { Component } from 'react'
import { View } from 'react-native'
import styles from './styles.scss'
import TrackInfo from './TrackInfo'
import SeekSlider from './SeekSlider'
import PlayButton from './Buttons/PlayButton'
import { RepeatButton, ShuffleButton } from './Buttons/ToggleButtons'
import { BackwardButton, ForwardButton } from './Buttons/SkipButtons'

class Controller extends Component {
  render() {
    return (
      <View style={[styles.container]}>
        <View>
          <TrackInfo />
          <SeekSlider />
        </View>
        <View style={[styles.buttonsContainer]}>
          <RepeatButton />
          <View style={{ flexDirection: "row" }}>
            <BackwardButton />
            <PlayButton />
            <ForwardButton />
          </View>
          <ShuffleButton />
        </View>
      </View>
    )
  }
}

export default Controller
