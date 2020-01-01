import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TouchableWithoutFeedback, Modal } from 'react-native'
import { CaretDownSolidSVGR } from '../../assets/icons'
import styles from './styles.scss'
import { UI_CONSTANTS } from '../../utils/helperFunctions';

class MoreOpts extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, }
  }

  render() {
    return (
      <>
        <TouchableOpacity style={[styles.iconContainer]}
          onPress={evt => this.onIconPress(evt.nativeEvent)}>
          <CaretDownSolidSVGR width="16" height="16" fill="#8c8c8c" />
        </TouchableOpacity>
        <Modal transparent visible={this.state.visible}>
          <TouchableWithoutFeedback
            onPress={() => this.setState({ visible: false })}>
            <View style={this._menuPosition}>
              <View style={[styles.container, { elevation: 10 }]}>
                {
                  this.props.opts.map((opt, index) => {
                    return (
                      <TouchableOpacity key={index}
                        onPress={() => this.onOptionPress(index)}>
                        <Text style={[styles.text]}>{opt}</Text>
                      </TouchableOpacity>
                    );
                  })
                }
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </>
    )
  }

  onOptionPress = (index) => {
    this.props.onOptionPress(index);
    this.setState({ visible: false });
  }

  onIconPress = (nativeEvent) => {
    if (this.props.opts.length != 0) {
      const topPosition = nativeEvent.pageY - nativeEvent.locationY;
      this._menuPosition = { flex: 1, paddingTop: topPosition, alignItems: "flex-end" };

      const horizontalPosition = nativeEvent.pageX - nativeEvent.locationX + 8;
      if(horizontalPosition < UI_CONSTANTS.VIEW_WIDTH / 3)
        this._menuPosition.alignItems = "flex-start";
      else if(horizontalPosition < 2 * UI_CONSTANTS.VIEW_WIDTH / 3)
        this._menuPosition.alignItems = "center";

      this.setState({ visible: true });
    }
  }
}

export default MoreOpts
