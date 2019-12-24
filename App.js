import React from "react";
import { Provider } from "react-redux";
import YourTracks from "./src/models/YourTracks";
import TrackPlayer from "react-native-track-player";
import PlayerTracks from "./src/models/PlayerTracks";
import { RNTPOptions } from "./src/utils/RNTPService";
import YourTracksScreen from "./src/screens/YourTracks";
import { StyleSheet, View, AppState } from "react-native";
import { Navigator, Route } from "./src/components/Navigator";
import PlayerController from "./src/components/PlayerController";
import { yourTracksLoadData } from "./src/redux/actions/YourTracksActions";
import { playerTracksLoadData } from "./src/redux/actions/PlayerTracksActions";

class App extends React.Component {
  static store = null;

  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
    }
    TrackPlayer.setupPlayer().then(() => {
      console.log("RN Track Player setup succesful");
    }).catch(e => console.log(e));
    TrackPlayer.updateOptions(RNTPOptions);
  }

  render() {
    return (
      <Provider store={App.store}>
        <View style={[styles.mainContainer]}>
          <Navigator>
            <Route name="YourTracksScreen" component={YourTracksScreen} />
          </Navigator>
          <PlayerController />
        </View>
      </Provider>
    );
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    YourTracks.loadDataFromRealm().then(() => {
      App.store.dispatch(yourTracksLoadData());
    }).catch(e => console.log(e));
    PlayerTracks.loadDataFromRealm().then(() => {
      App.store.dispatch(playerTracksLoadData());
    }).catch(e => console.log(e));
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState === "active" && nextAppState === "background") {
      YourTracks.saveDataIntoRealm().then(() => { })
        .catch(e => console.log(e));
      PlayerTracks.saveDataIntoRealm().then(() => { })
        .catch(e => console.log(e));
    }
    this.state.appState = nextAppState;
  }

}

module.exports = (store) => {
  App.store = store;
  return App;
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    justifyContent: "space-between",
  },
})

