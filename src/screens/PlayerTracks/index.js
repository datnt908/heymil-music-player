import React, { Component } from 'react'
import { View, PanResponder, Animated, ScrollView } from 'react-native'
import Header from '../../components/Header'
import { TimesSolidSVGR } from '../../assets/icons'
import { UI_CONSTANTS } from '../../utils/helperFunctions'
import styles from './styles.scss'

const TimesSolidSVGRJSX = <TimesSolidSVGR width="100%" height="100%" fill="#404040" />
const PAN_CONTAINER_TOP = -UI_CONSTANTS.SCROLL_VIEW_HEIGHT - 10 + UI_CONSTANTS.HEADER_HEIGHT;
const PAN_CONTAINER_HEGHT = UI_CONSTANTS.SCROLL_VIEW_HEIGHT + 24;

class PlayerTracksScreen extends Component {
  constructor(props) {
    super(props);
    this._animatedValue = new Animated.Value(PAN_CONTAINER_TOP);
    this.createPanResponder();
  }

  render() {
    console.log("PlayerTracksScreen.render");
    const panContainerStyle = [styles.panContainer, { height: PAN_CONTAINER_HEGHT }];
    const transformStyle = { transform: [{ translateY: this._animatedValue }] };
    panContainerStyle.push(transformStyle);
    return (
      <View style={[styles.container]}>
        <Header title="Player Tracks" leftIconElement={TimesSolidSVGRJSX}
          onLeftIconPress={this.onLeftIconPress} />
        <Animated.View style={panContainerStyle}>
          <View style={{ backgroundColor: "#f2f2f2" }}
            {...this._panResponder.panHandlers}>
            <View style={[styles.anchor]} />
          </View>
        </Animated.View>
        <View style={{ flex: 1, zIndex: 0 }}>
          <ScrollView style={{ marginTop: 34 }}>
          </ScrollView>
        </View>
      </View>
    )
  }

  onLeftIconPress = () => {
    console.log("PlayerTracksScreen.onLeftIconPress");
  }

  createPanResponder = () => {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder,
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderRelease: this.onPanResponderRelease,
    });
  }

  onMoveShouldSetPanResponder = (evt, gestureState) => true

  onPanResponderMove = (evt, gestureState) => {
    if (gestureState.moveY <= UI_CONSTANTS.PLAYER_CONTROLLER_TOP)
      if (gestureState.dy >= 0)
        this._animatedValue.setValue(PAN_CONTAINER_TOP + gestureState.dy);
  };

  onPanResponderRelease = (evt, gestureState) => {
    if (Math.floor(gestureState.moveY) > UI_CONSTANTS.VIEW_HEIGHT / 3) {
      Animated.timing(this._animatedValue, {
        toValue: UI_CONSTANTS.HEADER_HEIGHT, duration: 150, useNativeDriver: true,
      }).start(() => {
        this.props.navigator.unhide();
        this._animatedValue.setValue(PAN_CONTAINER_TOP);
      });
    } else {
      Animated.timing(this._animatedValue, {
        toValue: PAN_CONTAINER_TOP, duration: 150, useNativeDriver: true
      }).start();
    }
  };
}

export default PlayerTracksScreen




