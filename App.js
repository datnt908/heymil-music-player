import { Provider } from 'react-redux'
import React, { Component } from 'react'
import RNTP from 'react-native-track-player'
import Controller from './src/components/Controller'
import YourTracksScreen from './src/screens/YourTracks'
import { View, StyleSheet, AppState } from 'react-native'
import { savePlayer } from './src/utils/database/PlayerDAL'
import { Route, Navigator } from './src/components/Navigator'
import { playerUpdateQueue } from './src/redux/actions/playerActions'
import { yourTracksLoadTracks } from './src/redux/actions/yourTracksActions'
import { loadAllTracks, saveAllTracks } from './src/utils/database/TrackDAL'
import { RNTPOptions, loadFromSchema, getPlayerQueue } from './src/models/Player'

class App extends Component {
  static store = null;

  constructor(props) {
    super(props);
    this.state = { appState: AppState.currentState }
    RNTP.setupPlayer().then(() => {
      RNTP.updateOptions(RNTPOptions);
    }).catch(e => console.log(e));
  }

  componentDidMount = async () => {
    AppState.addEventListener('change', this.onAppStateChange);
    try {
      const tracks = await loadAllTracks();
      App.store.dispatch(yourTracksLoadTracks(tracks));
      await loadFromSchema(tracks);
      const playerQueue = await getPlayerQueue();
      App.store.dispatch(playerUpdateQueue(playerQueue));
    } catch (e) { console.log(e); }
  }

  componentWillUnmount = () => {
    AppState.removeEventListener('change', this.onAppStateChange);
  }

  render() {
    return (
      <Provider store={App.store}>
        <View style={[styles.container]}>
          <Navigator>
            <Route name="YourTracksScreen" component={YourTracksScreen} />
          </Navigator>
          <Controller />
        </View>
      </Provider>
    )
  }

  onAppStateChange = async (nextAppState) => {
    if (this.state.appState === 'active' && nextAppState === 'background') {
      try {
        await saveAllTracks(App.store.getState().yourTracks);
        await savePlayer(App.store.getState().player);
      } catch (e) { console.log(e); }
    }
    this.state.appState = nextAppState;
  }
}

module.exports = (store) => {
  App.store = store;
  return App;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    justifyContent: "space-between",
  }
});