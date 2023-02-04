import { registerRootComponent } from 'expo';
// import {firebase} from '@react-native-firebase/messaging';
// import messaging from '@react-native-firebase/messaging';

// firebase.messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Message handled in the background!', remoteMessage);
// });

import { Freshchat, FreshchatConfig } from 'react-native-freshchat-sdk';
var freshchatConfig = new FreshchatConfig(
  process.env.FRESHCHAT_APP_ID,
  process.env.FRESHCHAT_APP_KEY
);
freshchatConfig.domain = process.env.FRESHCHAT_DOMAIN
Freshchat.init(freshchatConfig);


import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
