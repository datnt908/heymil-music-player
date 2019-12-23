import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./src/redux/reducers";
import YourTracks from "./src/models/YourTracks";
import PlayerTracks from "./src/models/PlayerTracks";
import YourTracksScreen from "./src/screens/YourTracks";
import { StyleSheet, View, AppState } from "react-native";
import { Navigator, Route } from "./src/components/Navigator";
import PlayerController from "./src/components/PlayerController";
import { yourTracksLoadData } from "./src/redux/actions/YourTracksActions";
import { playerTracksLoadData } from "./src/redux/actions/PlayerTracksActions";

const store = createStore(rootReducer);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
    }
  }

  render() {
    return (
      <Provider store={store}>
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
    YourTracks.loadDataFromRealm().then(results => {
      store.dispatch(yourTracksLoadData());
    }).catch(e => console.log(e));
    PlayerTracks.loadDataFromRealm().then(results => {
      store.dispatch(playerTracksLoadData());
    }).catch(e => console.log(e));
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState === "active" && nextAppState === "background") {
      YourTracks.saveDataIntoRealm().then(results => {
        console.log("Your tracks is saved");
      }).catch(e => console.log(e));
      PlayerTracks.saveDataIntoRealm().then(results => {
        console.log("Player tracks is saved");
      }).catch(e => console.log(e));
    }
    this.state.appState = nextAppState;
  }

}

export default App;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    justifyContent: "space-between",
  },
  pageContainer: {
    ...StyleSheet.absoluteFillObject,
  },
})

