import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import styles from "./styles.scss";
import { CaretDownSolidSVGR } from "../../assets/icons";

class OverflowMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
  }

  render() {
    return (
      <>
        <TouchableOpacity style={[styles.moreOptsIcon]}
          onPress={evt => this.onIconPress(evt.nativeEvent)}>
          <CaretDownSolidSVGR width="16" height="16" fill="#8c8c8c" />
        </TouchableOpacity>
        <Modal transparent visible={this.state.visible}>
          <TouchableWithoutFeedback onPress={() => this.setState({ visible: false })}>
            <View style={this.menuPosition}>
              <View style={[styles.optsContainer, { elevation: 10 }]}>
                {
                  this.props.opts.map((opt, index) => {
                    return (
                      <TouchableOpacity key={index}
                        onPress={() => this.onOptionPress(index)}>
                        <Text style={[styles.optText]}>{opt}</Text>
                      </TouchableOpacity>
                    );
                  })
                }
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </>
    );
  }

  onOptionPress = (index) => {
    this.props.onOptionPress(index);
    this.setState({ visible: false });
  }

  onIconPress = (nativeEvent) => {
    if (this.props.opts.length != 0) {
      const topPosition = nativeEvent.pageY - nativeEvent.locationY;
      this.menuPosition = { flex: 1, paddingTop: topPosition, alignItems: "flex-end" };
      this.setState({ visible: true });
    }
  }
}

export default OverflowMenu;