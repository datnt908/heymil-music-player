import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  Animated,
} from 'react-native'
import styles from './styles.scss'
import React, { Component } from 'react'
import { TimesSolidSVGR } from '../../../assets/icons'
import { UI_CONSTANTS } from '../../../utils/helperFunctions'

class MoreOpts extends Component {
  constructor(props) {
    super(props);
    this.OPTS_CONTAINER_HEIGHT = this.props.opts.length * 32 +
      UI_CONSTANTS.MOREOPTS_HEIGHT + 24;
    this._animatedValue = new Animated.Value(this.OPTS_CONTAINER_HEIGHT);
  }

  componentDidUpdate = () => {
    if (this.props.visible)
      Animated.timing(this._animatedValue, {
        toValue: 0, duration: 150, useNativeDriver: true
      }).start();
  }

  render() {
    const transformStyle = { transform: [{ translateY: this._animatedValue }] };

    return (
      <Modal transparent visible={this.props.visible}>
        <View style={[styles.modal]}>
          <TouchableWithoutFeedback
            onPress={this.hideModal}>
            <View style={{ flex: 1 }}></View>
          </TouchableWithoutFeedback>
          <Animated.View style={[styles.optsContainer, transformStyle]}>
            <View style={[styles.modalTitle]}>
              <TouchableOpacity style={[styles.iconContainer]}
                onPress={this.hideModal}>
                <TimesSolidSVGR width="12" height="12" fill="#8c8c8c" />
              </TouchableOpacity>
              <Text style={[styles.title]}>{this.props.title}</Text>
            </View>
            {
              this.props.opts.map((opt, index) => {
                return (
                  <TouchableOpacity key={index}
                    onPress={() => this.onOptionPress(index)}>
                    <Text style={[styles.text]}>{opt}</Text>
                  </TouchableOpacity>
                )
              })
            }
          </Animated.View>
        </View>
      </Modal>
    )
  }

  hideModal = () => {
    Animated.timing(this._animatedValue, {
      toValue: this.OPTS_CONTAINER_HEIGHT, duration: 150, useNativeDriver: true
    }).start(this.props.hideModal);
  }

  onOptionPress = (index) => {
    this.props.onOptionPress(index);
    this.hideModal();
  }
}

export default MoreOpts
