import App from './App';
import { createStore } from 'redux';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import rootReducer from "./src/redux/reducers";
import RNTPService from "./src/utils/RNTPService";
import TrackPlayer from "react-native-track-player";

const store = createStore(rootReducer);

AppRegistry.registerComponent(appName, () => App(store));
TrackPlayer.registerEventHandler(RNTPService(store));