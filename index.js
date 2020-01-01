import App from './App'
import { createStore } from 'redux'
import { AppRegistry } from 'react-native'
import { name as appName } from './app.json'
import RNTP from 'react-native-track-player'
import rootReducer from './src/redux/reducers'
import RNTPservice from './src/utils/RNTPservice'

const store = createStore(rootReducer);
AppRegistry.registerComponent(appName, () => App(store));
RNTP.registerEventHandler(RNTPservice(store));