import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Controller from './src/components/Controller'

class App extends Component {
  render() {
    return (
      <View style={[styles.container]}>
        <View style={{flex: 1}}>

        </View>
        <Controller />
      </View>
    )
  }

  onPress = () => {
   
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