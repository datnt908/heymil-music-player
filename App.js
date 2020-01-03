import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Controller from './src/components/Controller'
import YourTracksScreen from './src/screens/YourTracks'
import { Route, Navigator} from './src/components/Navigator'
import YourPlaylistsScreen from './src/screens/YourPlaylists'

class App extends Component {
  render() {
    return (
      <View style={[styles.container]}>
        <Navigator>
          <Route name="Your Playlists" component={YourPlaylistsScreen} />
          <Route name="Your Tracks" component={YourTracksScreen} />
        </Navigator>
        <Controller />
      </View>
    )
  }
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    justifyContent: "space-between",
  }
});