import styles from './styles.scss'
import { View } from 'react-native'
import TrackInfo from './TrackInfo'
import SeekSlider from './SeekSlider'
import React, { Component } from 'react'
import PlayButton from './Buttons/PlayButton'
import RepeatButton from './Buttons/ToggleButtons/Repeat'
import ShuffleButton from './Buttons/ToggleButtons/Shuffle'
import ForwardButton from './Buttons/SkipButtons/Forward'
import BackwardButton from './Buttons/SkipButtons/Backward'

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
