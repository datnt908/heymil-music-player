import React from "react";
import styles from "./styles.scss";
import * as Icons from "../../../assets/icons";
import { TouchableOpacity, View } from "react-native";

export class PlayButton extends React.Component {
  render() {
    return (
      <TouchableOpacity style={[styles.redictButton, styles.playColor]}
        onPress={this.props.onPress}>
        {getPlayOrPauseJSX(this.props.isPlaying)}
      </TouchableOpacity>
    );
  }
}

export class ForwardButton extends React.Component {
  render() {
    return (
      <TouchableOpacity style={[styles.redictButton]}
        onPress={this.props.onPress}>
        <Icons.ForwardSolidSVGR width="32" height="32" fill="#f2f2f2" />
      </TouchableOpacity >
    );
  }
}

export class BackwardButton extends React.Component {
  render() {
    return (
      <TouchableOpacity style={[styles.redictButton]}
        onPress={this.props.onPress}>
        <Icons.BackwardSolidSVGR width="32" height="32" fill="#f2f2f2" />
      </TouchableOpacity >
    );
  }
}

export class ShuffleButton extends React.Component {
  render() {
    return (
      <TouchableOpacity style={toggleButtonStyle(this.props.activated)}
        onPress={this.props.onPress}>
        <Icons.RandomSolidSVGR width="16" height="16" fill="#f2f2f2" />
      </TouchableOpacity>
    );
  }
}

export class RepeatButton extends React.Component {
  render() {
    return (
      <TouchableOpacity style={toggleButtonStyle(this.props.activated)}
        onPress={this.props.onPress}>
        <Icons.RepeatSolidSVGR width="16" height="16" fill="#f2f2f2" />
      </TouchableOpacity>
    );
  }
}

const toggleButtonStyle = (activated) => {
  const style = [styles.toggleButton];
  if (activated) style.push(styles.activated);
  return style;
}

getPlayOrPauseJSX = (isPlaying) => {
  if (!isPlaying)
    return (
      <View style={{ marginLeft: 4 }}>
        <Icons.PlaySolidSVGR height="32" width="32" fill="#f2f2f2" />
      </View>
    );
  else
    return (
      <Icons.PauseSolidSVGR height="100%" width="100%" fill="#f2f2f2" />
    );
}