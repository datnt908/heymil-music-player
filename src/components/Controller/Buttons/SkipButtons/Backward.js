import styles from '../styles.scss'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import RNTP from 'react-native-track-player'
import { TouchableOpacity } from 'react-native'
import { getPlayerQueue } from '../../../../models/Player'
import { BackwardSolidSVGR } from '../../../../assets/icons'
import { playerSkipTrack } from '../../../../redux/actions/playerActions'

class BackwardButton extends Component {
  render() {
    return (
      <TouchableOpacity style={[styles.redictButton]}
        onPress={this.onPress}>
        <BackwardSolidSVGR width="32" height="32" fill="#f2f2f2" />
      </TouchableOpacity >
    )
  }

  onPress = async () => {
    try {
      await RNTP.skipToPrevious();
      const playerQueue = await getPlayerQueue();
      this.props.playerSkipTrack(playerQueue.currentIndex);
    } catch (e) { console.log(e); }
  }
}

const mapDispatchToProps = (dispatch) => ({
  playerSkipTrack: bindActionCreators(playerSkipTrack, dispatch),
});

export default connect(null, mapDispatchToProps)(BackwardButton)
