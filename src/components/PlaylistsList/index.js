import Playlist from './Playlist'
import styles from './styles.scss'
import React, { Component } from 'react'
import { View, PanResponder, Animated } from 'react-native'
import PlaylistTracksList from '../TracksLists/PlaylistTracks'

const DEFAULT_PLAYLISTS = [
  { playlistName: "123", tracks: [1, 2, 3] },
  { playlistName: "23", tracks: [2, 3] },
  { playlistName: "nul", tracks: [] }
]

class PlaylistsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlaylist: 0,
    }
    this._animatedValue = new Animated.Value(0);
    this.createPanResponder();
    this.LIST_WIDTH = DEFAULT_PLAYLISTS.length * 264;
  }

  render() {
    const transformStyle = { transform: [{ translateX: this._animatedValue }] };
    return (
      <>
        <Animated.View style={[styles.hList, transformStyle]}
          {...this._panResponder.panHandlers}>
          {
            DEFAULT_PLAYLISTS.map((value, index) => {
              return (
                <Playlist key={index} playlist={value}>
                </Playlist>
              )
            })
          }
        </Animated.View>
        <View style={[styles.tracksList]}>
          <PlaylistTracksList
            tracks={DEFAULT_PLAYLISTS[this.state.currentPlaylist].tracks} />
        </View>
      </>
    )
  }


  createPanResponder = () => {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder,
      onPanResponderGrant: this.onPanResponderGrant,
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderRelease: this.onPanResponderRelease,
    });
  }

  onMoveShouldSetPanResponder = (evt, gestureState) => true
  onPanResponderGrant = (evt, gestureState) => {
    this._tempAnimateValue = this._animatedValue.__getValue();
  }
  onPanResponderMove = (evt, gestureState) => {
    if (this._tempAnimateValue === 0 && gestureState.dx > 0)
      return;
    if (this._tempAnimateValue === -this.LIST_WIDTH + 264 && gestureState.dx < 0)
      return;
    this._animatedValue.setValue(this._tempAnimateValue + gestureState.dx);
  }
  onPanResponderRelease = (evt, gestureState) => {
    let index = -Math.round(this._animatedValue.__getValue() / 264);
    if (index < 0) index = 0;
    if (index >= DEFAULT_PLAYLISTS.length) index = DEFAULT_PLAYLISTS.length - 1;
    const newAnimatedValue = -index * 264;
    Animated.timing(this._animatedValue, {
      toValue: newAnimatedValue, duration: 150, useNativeDriver: true
    }).start(() => {
      this._animatedValue.setValue(newAnimatedValue);
      this.setState({ currentPlaylist: index });
    });
  }
}

export default PlaylistsList
