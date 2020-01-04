import styles from './styles.scss'
import React, { Component } from 'react'
import MoreOpts from '../Modals/MoreOpts'
import { Animated, View } from 'react-native'
import { UI_CONSTANTS } from '../../utils/helperFunctions'
import PlayerTracksScreen from '../../screens/PlayerTracks'

const SCREEN_TOP = -UI_CONSTANTS.SCROLL_VIEW_HEIGHT;
const SCREENS = [];

export const Route = () => null;

export class Navigator extends Component {
  constructor(props) {
    super(props);
    const screenConfig = buildScreenConfig(props.children);
    this.state = {
      menuVisible: false,
      screenConfig,
      currentScreenName: SCREENS[0],
      isHiding: true,
    };
    this._animatedValue = new Animated.Value(0);
  }
  render() {
    const screenStyle = this.state.isHiding ? [{ zIndex: -1 }] : [{ zIndex: 1 }];
    const transformStyle = { transform: [{ translateY: this._animatedValue, }] };
    screenStyle.push([styles.screen, transformStyle]);
    const CurrentScreen = this.state.screenConfig[this.state.currentScreenName];

    return (
      <View style={{ flex: 1 }}>
        <PlayerTracksScreen navigator={{
          unhide: () => this.setState({ isHiding: false }),
          show: () => this.setState({ menuVisible: true }),
        }} />
        <Animated.View style={[screenStyle]}>
          <CurrentScreen navigator={{
            hide: () => this.setState({ isHiding: true }),
            show: () => this.setState({ menuVisible: true }),
          }} />
        </Animated.View>
        <MoreOpts title="Heymil's Menu" opts={SCREENS}
          visible={this.state.menuVisible}
          onOptionPress={this.handleNavigate}
          hideModal={() => this.setState({ menuVisible: false })} />
      </View>
    )
  }

  handleNavigate = (index) => {
    if (this.state.isHiding) {
      this.setState({ isHiding: false });
      this._animatedValue.setValue(SCREEN_TOP);
      Animated.timing(this._animatedValue, {
        toValue: 0, duration: 250, useNativeDriver: true,
      }).start();
    }
    if (this.state.currentScreenName !== SCREENS[index]) {
      this.setState({
        currentScreenName: SCREENS[index],
      });
    }
  }
}

const buildScreenConfig = (children = []) => {
  const config = {};
  React.Children.forEach(children, child => {
    config[child.props.name] = child.props.component;
    SCREENS.push(child.props.name);
  });
  return config;
}