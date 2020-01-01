import styles from '../styles.scss'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { TouchableOpacity } from 'react-native'
import { RepeatSolidSVGR } from '../../../../assets/icons'
import {  playerSetRepeat } from '../../../../redux/actions/playerActions'

const toggleButtonStyle = (isActivated) => {
  const style = [styles.toggleButton];
  if (isActivated) style.push(styles.activated);
  return style;
}

class RepeatButton extends Component {
  render() {
    return (
      <TouchableOpacity style={toggleButtonStyle(this.props.player.isRepeat)}
        onPress={this.onPress}>
        <RepeatSolidSVGR width="16" height="16" fill="#f2f2f2" />
      </TouchableOpacity>
    )
  }

  onPress = () => {
    this.props.playerSetRepeat(!this.props.player.isRepeat);
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  playerSetRepeat: bindActionCreators(playerSetRepeat, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RepeatButton)