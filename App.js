import { Provider } from 'react-redux'
import React, { Component } from 'react'
import Controller from './src/components/Controller'
import YourTracksScreen from './src/screens/YourTracks'
import { View, StyleSheet, AppState } from 'react-native'
import { Route, Navigator } from './src/components/Navigator'
import { yourTracksLoadTracks } from './src/redux/actions/yourTracksActions'
import { loadAllTracks, saveAllTracks } from './src/utils/database/TrackDAL'


class App extends Component {
  static store = null;

  constructor(props) {
    super(props);
    this.state = { appState: AppState.currentState }
  }

  componentDidMount = async () => {
    AppState.addEventListener('change', this.onAppStateChange);
    try {
      const tracks = await loadAllTracks();
      App.store.dispatch(yourTracksLoadTracks(tracks));
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
        console.log("Your Tracks is saved");
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