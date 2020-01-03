import styles from './styles.scss'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import Header from '../../components/Header'
import { TimesSolidSVGR } from '../../assets/icons'
import PlaylistsList from '../../components/PlaylistsList'
import { UI_CONSTANTS } from '../../utils/helperFunctions'
import { View, PanResponder, Animated } from 'react-native'
import { playlistsDeletePlaylist } from '../../redux/actions/playlistsActions'

const TimesSolidSVGRJSX = <TimesSolidSVGR width="100%" height="100%" fill="#404040" />

class YourPlaylistsScreen extends Component {
  constructor(props) {
    super(props);
    this._animatedValue = new Animated.Value(0);
    this.state = { currentIndex: 0 }
    this.createPanResponder();
  }

  render() {
    const transformStyle = { transform: [{ translateY: this._animatedValue }] };
    return (
      <View style={[styles.container]}>
        <Header title="Your Playlists"
          navigator={this.props.navigator}
          leftIconElement={TimesSolidSVGRJSX}
          onLeftIconPress={this.onLeftIconPress} />
        <Animated.View style={[styles.contents, transformStyle]}>
          <PlaylistsList currentIndex={this.state.currentIndex}
            onCurrentChange={index => this.setState({ currentIndex: index })} />
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
    this.props.playlistsDeletePlaylist(this.state.currentIndex);
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

const mapDispatchToProps = (dispatch) => ({
  playlistsDeletePlaylist: bindActionCreators(playlistsDeletePlaylist, dispatch),
})

export default connect(null, mapDispatchToProps)(YourPlaylistsScreen)

