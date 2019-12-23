import React from "react";
import styles from "./styles.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Header from "../../components/Header";
import YourTracks from "../../models/YourTracks";
import FilesPicker from "../../utils/FilesPicker";
import YourTrack from "../../components/YourTrack";
import { PlusSolidSVGR } from "../../assets/icons";
import { UI_CONSTANTS } from "../../utils/helperFunctions";
import { View, ScrollView, Animated, PanResponder,} from "react-native";
import * as yourTracksActions from "../../redux/actions/YourTracksActions";

class YourTracksScreen extends React.Component {
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
            {
              YourTracks.tracks.map(track => { 
                return <YourTrack key={track.id} track={track} />})
            }
          </ScrollView>
          <View style={[styles.anchorContainer]}>
            <View style={{ backgroundColor: "#f2f2f2" }}
              {...this._panResponder.panHandlers}>
              <View style={[styles.anchor]} />
            </View>
          </View>
        </Animated.View>
      </View>
    );
  }

  onLeftIconPress = () => {
    FilesPicker.showAudioFilesPickerDialog().then(results => {
      this.props.yourTracksAddTracks(results);
    }).catch(e => console.log(e));
  }

  createPanResponder = () => {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,

      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy >= -UI_CONSTANTS.SCROLL_VIEW_HEIGHT - 10)
          if (gestureState.dy <= 0)
            this._animatedValue.setValue(gestureState.dy);
      },

      onPanResponderRelease: (evt, gestureState) => {
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
    });
  }
}

const mapStateToProps = (state) => ({
  yourTracks: state.yourTracks,
});

const mapDispatchToProps = (dispatch) => ({
  yourTracksAddTracks: bindActionCreators(yourTracksActions.yourTracksAddTracks, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(YourTracksScreen);

const PlusSolidSVGRJSX =
  <PlusSolidSVGR width="100%" height="100%" fill="#404040" />