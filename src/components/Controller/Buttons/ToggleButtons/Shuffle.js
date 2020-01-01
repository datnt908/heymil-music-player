import styles from '../styles.scss'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { TouchableOpacity } from 'react-native'
import { RandomSolidSVGR } from '../../../../assets/icons'
import { playerSetShuffle } from '../../../../redux/actions/playerActions'

const toggleButtonStyle = (isActivated) => {
  const style = [styles.toggleButton];
  if (isActivated) style.push(styles.activated);
  return style;
}

class ShuffleButton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={toggleButtonStyle(this.props.player.isShuffle)}
        onPress={this.onPress}>
        <RandomSolidSVGR width="16" height="16" fill="#f2f2f2" />
      </TouchableOpacity>
    )
  }

  onPress = () => {
    this.props.playerSetShuffle(!this.props.player.isShuffle);
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  playerSetShuffle: bindActionCreators(playerSetShuffle, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShuffleButton)