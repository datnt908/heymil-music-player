import React from 'react'
import styles from './styles.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import RNTP from 'react-native-track-player'
import Slider from '@react-native-community/slider'
import { playerPlayPause } from '../../../redux/actions/playerActions'

const DEFAULT_TRACK = {
  title: 'No Track To Play',
  duration: 0,
}

class SeekSlider extends RNTP.ProgressComponent {
  render() {
    let currentTrack = this.props.player.tracks[this.props.player.currentIndex];
    if (!currentTrack) currentTrack = DEFAULT_TRACK;

    return (
      <Slider style={[styles.container]}
        disabled={!currentTrack.duration}
        thumbTintColor="#bfbfbf"
        minimumTrackTintColor="#bfbfbf"
        maximumTrackTintColor="#404040"
        step={1}
        minimumValue={0}
        maximumValue={currentTrack.duration}
        value={Math.floor(this.state.position)}
        onSlidingComplete={this.onSlidingComplete}
      />
    )
  }

  onSlidingComplete = async (time) => {
    try {
      await RNTP.seekTo(time);
      RNTP.play();
      this.props.playerPlayPause(true);
    } catch (e) { console.log(e); }
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
})

const mapDispatchToProps = (dispatch) => ({
  playerPlayPause: bindActionCreators(playerPlayPause, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(SeekSlider)