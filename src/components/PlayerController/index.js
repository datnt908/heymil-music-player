import React from "react";
import styles from "./styles.scss";
import { View } from "react-native";
import TrackInfo from "./TrackInfo";
import * as Buttons from "./Buttons";
import SeekSlider from "./SeekSlider";

class PlayerController extends React.Component {
  render() {
    return (
      <View style={[styles.container]}>
        <View>
          <TrackInfo track={undefined} position={0} />
          <SeekSlider track={undefined} position={10}
            onSlidingComplete={this.onSlidingComplete}
            onSlidingStart={this.onSlidingStart} />
        </View>
        <View style={[styles.buttonsContainer]}>
          <Buttons.RepeatButton activated={true}
            onPress={this.onRepeatButtonPress} />
          <View style={{ flexDirection: "row" }}>
            <Buttons.BackwardButton onPress={this.onBackwardButtonPress} />
            <Buttons.PlayButton isPlaying={false}
              onPress={this.onPlayButtonPress} />
            <Buttons.ForwardButton onPress={this.onForwardButtonPress} />
          </View>
          <Buttons.ShuffleButton activated={false}
            onPress={this.onShuffleButtonPress} />
        </View>
      </View>
    );
  }

  onSlidingStart = (time) => {
    console.log("onSlidingStart", time);
  }

  onSlidingComplete = (time) => {
    console.log("onSlidingComplete", time);
  }

  onRepeatButtonPress = () => {
    console.log("onRepeatButtonPress");
  }

  onShuffleButtonPress = () => {
    console.log("onShuffleButtonPress");

  }

  onPlayButtonPress = () => {
    console.log("onPlayButtonPress");

  }

  onForwardButtonPress = () => {
    console.log("onForwardButtonPress");

  }

  onBackwardButtonPress = () => {
    console.log("onBackwardButtonPress");

  }
}

export default PlayerController;