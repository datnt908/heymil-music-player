import styles from './styles.scss'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import RNTP from 'react-native-track-player'
import Header from '../../components/Header'
import { TimesSolidSVGR } from '../../assets/icons'
import { getPlayerQueue } from '../../models/Player'
import { UI_CONSTANTS } from '../../utils/helperFunctions'
import { playerUpdateQueue } from '../../redux/actions/playerActions'
import { View, PanResponder, Animated, ScrollView } from 'react-native'
import PlayerTracksList from '../../components/TracksLists/PlayerTracks'

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
            <PlayerTracksList />
          </ScrollView>
        </View>
      </View>
    )
  }

  onLeftIconPress = async () => {
    try {
      await RNTP.stop();
      await RNTP.reset();
      const playerQueue = await getPlayerQueue();
      this.props.playerUpdateQueue(playerQueue);
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

const mapDispatchToProps = (dispatch) => ({
  playerUpdateQueue: bindActionCreators(playerUpdateQueue, dispatch),
})

export default connect(null, mapDispatchToProps)(PlayerTracksScreen)




