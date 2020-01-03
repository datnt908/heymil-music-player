import Playlist from './Playlist'
import styles from './styles.scss'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { View, PanResponder, Animated } from 'react-native'
import PlaylistTracksList from '../TracksLists/PlaylistTracks'

class PlaylistsList extends Component {
  constructor(props) {
    super(props);
    this._animatedValue = new Animated.Value(0);
    this.createPanResponder();
    this.LIST_WIDTH = this.props.playlists.length * 264;
  }

  render() {
    const transformStyle = { transform: [{ translateX: this._animatedValue }] };
    const currentTracks = this.props.playlists[this.props.currentIndex] ?
      this.props.playlists[this.props.currentIndex].tracks : [];

    return (
      <>
        <Animated.View style={[styles.hList, transformStyle]}
          {...this._panResponder.panHandlers}>
          {
            this.props.playlists.map(value => {
              return (<Playlist key={value.id} playlist={value} />)
            })
          }
        </Animated.View>
        <View style={[styles.tracksList]}>
          <PlaylistTracksList tracks={currentTracks}
            currentIndex={this.props.currentIndex} />
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
    if (index >= this.props.playlists.length)
      index = this.props.playlists.length - 1;
    const newAnimatedValue = -index * 264;
    Animated.timing(this._animatedValue, {
      toValue: newAnimatedValue, duration: 150, useNativeDriver: true
    }).start(() => {
      this._animatedValue.setValue(newAnimatedValue);
      this.props.onCurrentChange(index);
    });
  }
}

const mapStateToProps = (state) => ({
  playlists: state.playlists,
})

export default connect(mapStateToProps, null)(PlaylistsList)
