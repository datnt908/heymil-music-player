import { connect } from 'react-redux'
import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { bindActionCreators } from 'redux'
import PlayerTrack from '../Track/PlayerTrack'
import MoreOptsModal from '../Modals/MoreOpts'
import { delTrack, getPlayerQueue } from '../../models/Player'
import { playerUpdateQueue } from '../../redux/actions/playerActions'

const OPTIONS = [
  'Remove track',
  'Add to playlist'
];

class PlayerTracksList extends Component {
  constructor(props) {
    super(props);
    this._track = null;
    this.state = {
      optsVisible: false,
    }
  }

  render() {
    return (
      <>
        <ScrollView style={{ felx: 1 }}>
          {
            this.props.player.tracks.map((value, index) => {
              return <PlayerTrack key={value.id} track={value}
                isRunning={index === this.props.player.currentIndex}
                onClickMoreOpts={this.onTrackClickMoreOpts} />
            })
          }
        </ScrollView>
        <MoreOptsModal title="Options" opts={OPTIONS}
          visible={this.state.optsVisible}
          onOptionPress={this.onOptionPress}
          hideModal={() => this.setState({ optsVisible: false })} />
      </>
    )
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

      case 2:
        break;
      default:
        break;
    }
  }

  onTrackClickMoreOpts = (track) => {
    this._track = track;
    this.setState({ optsVisible: true });
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
})

const mapDispatchToProps = (dispatch) => ({
  playerUpdateQueue: bindActionCreators(playerUpdateQueue, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayerTracksList)
