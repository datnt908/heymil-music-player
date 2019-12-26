import React, { Component } from 'react'
import { View, PanResponder, Animated, ScrollView } from 'react-native'
import styles from './styles.scss'
import { PlusSolidSVGR } from '../../assets/icons'
import { UI_CONSTANTS } from '../../utils/helperFunctions'
import Header from '../../components/Header'
import YourTracksList from '../../components/TracksLists/YourTracks'
import FilesPicker from '../../utils/FilesPicker'


const PlusSolidSVGRJSX = <PlusSolidSVGR width="100%" height="100%" fill="#404040" />

class YourTracksScreen extends Component {
  constructor(props) {
    super(props);
    this._animatedValue = new Animated.Value(0);
    this.createPanResponder();
  }

  render() {
    console.log('YourTracksScreen.render');
    const transformStyle = { transform: [{ translateY: this._animatedValue }] };
    return (
      <View style={[styles.container]}>
        <Header title="Your Tracks" leftIconElement={PlusSolidSVGRJSX}
          onLeftIconPress={this.onLeftIconPress} />
        <Animated.View style={[styles.contents, transformStyle]}>
          <ScrollView style={{ flex: 1 }} >
            <YourTracksList />
          </ScrollView>
          <View style={[styles.anchorContainer]}>
            <View style={{ backgroundColor: "#f2f2f2" }}
              {...this._panResponder.panHandlers}>
              <View style={[styles.anchor]} />
            </View>
          </View>
        </Animated.View>
      </View>
    )
  }

  onLeftIconPress = () => {
    FilesPicker.showAudioFilesPickerDialog().then(selectedFiles => {
      selectedFiles.forEach(selectedFile => {
        console.log(selectedFile);
      });
    }).catch(e => console.log(e));
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
    if (gestureState.dy >= -UI_CONSTANTS.SCROLL_VIEW_HEIGHT - 10)
      if (gestureState.dy <= 0)
        this._animatedValue.setValue(gestureState.dy);
  }

  onPanResponderRelease = (evt, gestureState) => {
    if (Math.floor(gestureState.moveY) < UI_CONSTANTS.VIEW_HEIGHT / 2) {
      Animated.timing(this._animatedValue, {
        toValue: -UI_CONSTANTS.SCROLL_VIEW_HEIGHT - 10,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        this.props.navigator.hide();
        this._animatedValue.setValue(0);
      });
    } else {
      Animated.timing(this._animatedValue, {
        toValue: 0, duration: 150, useNativeDriver: true
      }).start();
    }
  }
}

export default YourTracksScreen

