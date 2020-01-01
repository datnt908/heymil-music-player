import styles from './styles.scss'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import Header from '../../components/Header'
import { PlusSolidSVGR } from '../../assets/icons'
import { getTrackFromFile } from '../../models/Track'
import { readMp3Duration } from '../../utils/Mp3Reader'
import { UI_CONSTANTS } from '../../utils/helperFunctions'
import YourTracksList from '../../components/TracksLists/YourTracks'
import { showAudioFilesPickerDialog } from '../../utils/FilesPicker'
import { View, PanResponder, Animated, ScrollView } from 'react-native'
import { yourTracksAddTrack } from '../../redux/actions/yourTracksActions'

const PlusSolidSVGRJSX = <PlusSolidSVGR width="100%" height="100%" fill="#404040" />

class YourTracksScreen extends Component {
  constructor(props) {
    super(props);
    this._animatedValue = new Animated.Value(0);
    this.createPanResponder();
  }

  render() {
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

  onLeftIconPress = async () => {
    try {
      const selectedFiles = await showAudioFilesPickerDialog();
      for (let i = 0; i < selectedFiles.length; ++i) {
        const track = getTrackFromFile(selectedFiles[i]);
        track.duration = await readMp3Duration(selectedFiles[i].path);
        this.props.yourTracksAddTrack(track);
      }
    } catch (e) { console.log(e); }
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

const mapDispatchToProps = (dispatch) => ({
  yourTracksAddTrack: bindActionCreators(yourTracksAddTrack, dispatch),
})

export default connect(null, mapDispatchToProps)(YourTracksScreen)

