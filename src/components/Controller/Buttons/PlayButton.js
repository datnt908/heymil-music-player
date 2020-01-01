import styles from './styles.scss'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import RNTP from 'react-native-track-player'
import * as Icons from '../../../assets/icons'
import { View, TouchableOpacity } from 'react-native'
import { playerPlayPause } from '../../../redux/actions/playerActions';

class PlayButton extends Component {
  render() {
    return (
      <TouchableOpacity style={[styles.redictButton, styles.playColor]}
        onPress={this.onPress}>
        {this.getPlayOrPauseJSX()}
      </TouchableOpacity>
    )
  }

  onPress = async () => {
    try {
      if (this.props.player.isPlaying) {
        await RNTP.pause();
        this.props.playerPlayPause(false);
      } else {
        await RNTP.play();
        this.props.playerPlayPause(true);
      }
    } catch (e) { console.log(e); }
  }

  getPlayOrPauseJSX = () => {
    if (!this.props.player.isPlaying)
      return (
        <View style={{ marginLeft: 4 }}>
          <Icons.PlaySolidSVGR height="32" width="32" fill="#f2f2f2" />
        </View>
      );
    else
      return (
        <Icons.PauseSolidSVGR height="100%" width="100%" fill="#f2f2f2" />
      );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
})

const mapDispatchToProps = (dispatch) => ({
  playerPlayPause: bindActionCreators(playerPlayPause, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayButton)