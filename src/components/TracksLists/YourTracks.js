import { connect } from 'react-redux'
import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import YourTrack from '../Track/YourTrack'
import { bindActionCreators } from 'redux'
import MoreOptsModal from '../Modals/MoreOpts'
import EditTrackModal from '../Modals/EditTrack'
import { delTrack, getPlayerQueue } from '../../models/Player'
import { playerUpdateQueue } from '../../redux/actions/playerActions'
import { yourTracksDeleteTrack } from '../../redux/actions/yourTracksActions'

const OPTIONS = [
  'Edit track',
  'Remove track',
  'Add to playlist',
];

class YourTracksList extends Component {
  constructor(props) {
    super(props);
    this._track = null;
    this.state = {
      optsVisible: false,
      editVisible: false,
    }
  }

  render() {
    return (
      <>
        <ScrollView style={{ felx: 1 }}>
          {
            this.props.yourTracks.map(value => {
              return <YourTrack key={value.id} track={value}
                onClickMoreOpts={this.onTrackClickMoreOpts} />
            })
          }
        </ScrollView>
        <MoreOptsModal title="Options" opts={OPTIONS}
          visible={this.state.optsVisible}
          onOptionPress={this.onOptionPress}
          hideModal={() => this.setState({ optsVisible: false })} />
        <EditTrackModal visible={this.state.editVisible}
          track={this._track}
          hideModal={() => this.setState({ editVisible: false })} />
      </>
    )
  }

  onOptionPress = async (index) => {
    switch (index) {
      case 0:
        this.setState({ editVisible: true });
        break;

      case 1:
        this.props.yourTracksDeleteTrack(this._track);
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
  yourTracks: state.yourTracks,
})

const mapDispatchToProps = (dispatch) => ({
  yourTracksDeleteTrack: bindActionCreators(yourTracksDeleteTrack, dispatch),
  playerUpdateQueue: bindActionCreators(playerUpdateQueue, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(YourTracksList)
