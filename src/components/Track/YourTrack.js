import React from 'react'
import Track from './Track'
import styles from './styles.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { EllipsisHSolidSVGR } from '../../assets/icons'
import { addTrack, getPlayerQueue } from '../../models/Player'
import { convertSecondToMMSS } from '../../utils/helperFunctions'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { playerUpdateQueue } from '../../redux/actions/playerActions'

class YourTrack extends Track {
  render() {
    const durationMMSS = convertSecondToMMSS(this._track.duration);

    return (
      <View style={[styles.container]}>
        <TouchableOpacity onPress={this.onTrackPress}
          style={{ flexDirection: "row", alignItems: "center" }}>
          <Image style={[styles.image]} source={this._artwork} />
          <View style={{ marginLeft: 12 }}>
            <Text style={[styles.musicTitle, styles.darkColor]}>
              {this._track.title}</Text>
            <Text style={[styles.musicArtist, styles.darkColor]}>
              {this._track.artist}</Text>
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={[styles.musicDuration, styles.darkColor]}>
            {durationMMSS}</Text>
          <TouchableOpacity style={[styles.iconContainer]}
            onPress={() => this.props.onClickMoreOpts(this._track)}>
            <EllipsisHSolidSVGR width="12" height="12" fill="#404040" />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  onTrackPress = async () => {
    try {
      await addTrack(this._track);
      const playerQueue = await getPlayerQueue();
      this.props.playerUpdateQueue(playerQueue);
    } catch (e) { console.log(e); }
  }
}

const mapDispatchToProps = (dispatch) => ({
  playerUpdateQueue: bindActionCreators(playerUpdateQueue, dispatch),
});

export default connect(null, mapDispatchToProps)(YourTrack)
