import React from "react";
import styles from "./styles.scss";
import { connect } from "react-redux";
import * as Icons from "../../assets/icons";
import Header from "../../components/Header";
import YourTracks from "../../models/YourTracks";
import PlayerTracks from "../../models/PlayerTracks";
import PlayerTrack from "../../components/PlayerTrack";
import { UI_CONSTANTS } from "../../utils/helperFunctions";
import { View, Animated, PanResponder, ScrollView } from "react-native";
import { bindActionCreators } from "redux";
import { playerTracksStateChanged } from "../../redux/actions/PlayerTracksActions";

const PAN_CONTAINER_TOP = -UI_CONSTANTS.SCROLL_VIEW_HEIGHT - 10 + UI_CONSTANTS.HEADER_HEIGHT;

class PlayerTracksScreen extends React.Component {
  constructor(props) {
    super(props);
    this._animatedValue = new Animated.Value(PAN_CONTAINER_TOP);
    this.createPanResponder();
  }

  render() {
    const transformStyle = { transform: [{ translateY: this._animatedValue }] };
    const panContainerStyle =
      [styles.panContainer, { height: UI_CONSTANTS.SCROLL_VIEW_HEIGHT + 24 }];
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
            {
              PlayerTracks.trackIDs.map(trackID => {
                const track = YourTracks.getTrackByID(trackID);
                if (!track) return <></>
                return <PlayerTrack key={trackID} track={track} />;
              })
            }
          </ScrollView>
        </View>
      </View>
    );
  }

  onLeftIconPress = () => {
    PlayerTracks.clearAllTracks().then(() => {
      this.props.playerTracksStateChanged();
    }).catch(e => console.log(e));
  }

  createPanResponder = () => {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,

      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.moveY <= UI_CONSTANTS.PLAYER_CONTROLLER_TOP)
          if (gestureState.dy >= 0)
            this._animatedValue.setValue(PAN_CONTAINER_TOP + gestureState.dy);
      },

      onPanResponderRelease: (evt, gestureState) => {
        if (Math.floor(gestureState.moveY) > UI_CONSTANTS.VIEW_HEIGHT / 3) {
          Animated.timing(this._animatedValue, {
            toValue: UI_CONSTANTS.HEADER_HEIGHT, duration: 150, useNativeDriver: true,
          }).start(() => {
            this.props.navigator.unhide();
            this._animatedValue.setValue(PAN_CONTAINER_TOP);
          });
        }
        else {
          Animated.timing(this._animatedValue, {
            toValue: PAN_CONTAINER_TOP, duration: 150, useNativeDriver: true
          }).start();
        }
      }
    });
  }
}

const mapStateToProps = (state) => ({
  playerTracks: state.playerTracks,
});

const mapDispatchToProps = (dispatch) => ({
  playerTracksStateChanged: bindActionCreators(playerTracksStateChanged, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerTracksScreen);

const TimesSolidSVGRJSX = <Icons.TimesSolidSVGR width="100%" height="100%" fill="#404040" />