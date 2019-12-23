import React from "react";
import styles from "./styles.scss";
import { View, Animated } from "react-native";
import PlayerTracksScreen from "../../screens/PlayerTracks";

export const Route = () => null;

export class Navigator extends React.Component {
  constructor(props) {
    super(props);
    const screenConfig = buildScreenConfig(props.children);
    const initialScreenName = React.Children.count(props.children) == 1 ?
      props.children.props.name : props.children[0].props.name;
    this.state = {
      screenConfig,
      stack: [screenConfig[initialScreenName]],
      isHiding: true,
    };
    this._animatedValue = new Animated.Value(0);
  }

  render() {
    const screenAnimatedStyles = this.state.isHiding ?
      [{ zIndex: -1 }] : [{ zIndex: 1 }];
    const transformStyle = { transform: [{ translateY: this._animatedValue, }] };
    screenAnimatedStyles.push([styles.screen, transformStyle]);
    return (
      <View style={{ flex: 1 }}>
        <PlayerTracksScreen navigator={{ unhide: this.handleUnhide }} />
        {
          this.state.stack.map((screen) => {
            const CurrentScreen = screen.component;
            return (
              <Animated.View style={[screenAnimatedStyles]} key={screen.key}>
                <CurrentScreen navigator={{ hide: this.handleHide, }} />
              </Animated.View>
            );
          })
        }
      </View>
    );
  }

  handleUnhide = () => {
    this.setState({ isHiding: false })

  }

  handleHide = () => {
    this.setState({ isHiding: true, });
  }
}

const buildScreenConfig = (children = []) => {
  const config = {};
  React.Children.forEach(children, child => {
    config[child.props.name] = { key: child.props.name, component: child.props.component }
  });
  return config;
}