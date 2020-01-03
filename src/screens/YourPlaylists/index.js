import styles from './styles.scss'
import React, { Component } from 'react'
import Header from '../../components/Header'
import FilesPicker from '../../utils/FilesPicker'
import { UI_CONSTANTS } from '../../utils/helperFunctions'
import { View, PanResponder, Animated, ScrollView } from 'react-native'

class YourPlaylistsScreen extends Component {
  constructor(props) {
    super(props);
    this._animatedValue = new Animated.Value(0);
    this.createPanResponder();
  }

  render() {
    console.log('YourPlaylistsScreen.render');
    const transformStyle = { transform: [{ translateY: this._animatedValue }] };
    return (
      <View style={[styles.container]}>
        <Header title="Your Playlists" 
          navigator={this.props.navigator} />
        <Animated.View style={[styles.contents, transformStyle]}>
          <ScrollView style={{ flex: 1 }} >
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
        toValue: -UI_CONSTANTS.SCROLL_VIEW_HEIGHT,
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

export default YourPlaylistsScreen

