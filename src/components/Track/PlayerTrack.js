import React from 'react'
import Track from './Track'
import styles from './styles.scss'
import MoreOpts from '../MoreOpts'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import RNTP from 'react-native-track-player'
import { delTrack, getPlayerQueue } from '../../models/Player'
import { convertSecondToMMSS } from '../../utils/helperFunctions'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { playerUpdateQueue, playerPlayPause } from '../../redux/actions/playerActions'

const options = [
  'Remove track',
  'Add to playlist',
];

class PlayerTrack extends Track {
  render() {
    const durationMMSS = convertSecondToMMSS(this._track.duration);
    const containerStyle = [styles.container];
    if (this.props.isRunning) containerStyle.push(styles.running);

    return (
      <View style={containerStyle}>
        <TouchableOpacity onPress={this.onTrackPress}
          style={{ flexDirection: "row", alignItems: "center" }}>
          <Image style={[styles.image]} source={this._artwork} />
          <View style={{ marginLeft: 12 }}>
            <Text style={[styles.musicTitle, styles.lightColor]}>
              {this._track.title}</Text>
            <Text style={[styles.musicArtist, styles.lightColor]}>
              {this._track.artist}</Text>
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={[styles.musicDuration, styles.lightColor]}>
            {durationMMSS}</Text>
          <MoreOpts opts={options} onOptionPress={this.onOptionPress} />
        </View>
      </View>
    )
  }

  onTrackPress = async () => {
    try {
      if (this.props.isRunning) {
        if (this.props.player.isPlaying) {
          await RNTP.pause();
          this.props.playerPlayPause(false);
        } else {
          await RNTP.play();
          this.props.playerPlayPause(true);
        }
      } else {
        await RNTP.skip(this._track.id);
        const playerQueue = await getPlayerQueue();
        this.props.playerUpdateQueue(playerQueue);
      }
    } catch (e) { console.log(e); }
  }

  onOptionPress = async (index) => {
    switch (index) {
      case 0:
        try {
          await delTrack(this._track);
          const playerQueue = await getPlayerQueue();
          this.props.playerUpdateQueue(playerQueue);
        } catch (e) { console.log(e); }
        break;

      case 1:
        console.log('PlayerTrack.onOptionPress', options[index]);
        break;

      default:
        break;
    }
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
})

const mapDispatchToProps = (dispatch) => ({
  playerUpdateQueue: bindActionCreators(playerUpdateQueue, dispatch),
  playerPlayPause: bindActionCreators(playerPlayPause, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayerTrack)
