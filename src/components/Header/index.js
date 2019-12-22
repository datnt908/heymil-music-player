import React from "react";
import styles from "./styles.scss";
import { View, TouchableOpacity, Text } from "react-native";
import { BarSolidSVGR } from "../../assets/icons";

const BarSolidSVGRJSX =
  <BarSolidSVGR width="100%" height="100%" fill="#404040" />

class Header extends React.Component {
  render() {
    return (
      <View style={[styles.container]}>
        <TouchableOpacity style={[styles.iconContainer]}
          onPress={this.props.onLeftIconPress}>
          {this.props.leftIconElement}
        </TouchableOpacity>
        <Text style={[styles.title]}>{this.props.title}</Text>
        <TouchableOpacity style={[styles.iconContainer]}
          onPress={this.onRightMenuIconPress}>
          {BarSolidSVGRJSX}
        </TouchableOpacity>
      </View>
    );
  }

  onRightMenuIconPress = () => {
    console.log("onRightMenuIconPress");
  }
}

export default Header;