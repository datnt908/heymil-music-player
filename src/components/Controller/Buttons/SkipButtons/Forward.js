import styles from '../styles.scss'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { TouchableOpacity } from 'react-native'
import { ForwardSolidSVGR } from '../../../../assets/icons'
import { skipToNext, getPlayerQueue } from '../../../../models/Player'
import { playerSkipTrack } from '../../../../redux/actions/playerActions'


class ForwardButton extends Component {
  render() {
    return (
      <TouchableOpacity style={[styles.redictButton]}
        onPress={this.onPress}>
        <ForwardSolidSVGR width="32" height="32" fill="#f2f2f2" />
      </TouchableOpacity >
    )
  }

  onPress = async () => {
    try {
      await skipToNext(this.props.player.isShuffle);
      const playerQueue = await getPlayerQueue();
      this.props.playerSkipTrack(playerQueue.currentIndex);
    } catch (e) { console.log(e); }
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  playerSkipTrack: bindActionCreators(playerSkipTrack, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForwardButton)