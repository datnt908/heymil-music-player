import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Controller from './src/components/Controller'
import { Route, Navigator } from './src/components/Navigator'
import YourTracksScreen from './src/screens/YourTracks'
import { Provider } from 'react-redux'



class App extends Component {
  static store = null;



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