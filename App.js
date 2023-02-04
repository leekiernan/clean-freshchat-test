import { Freshchat, FreshchatUser } from 'react-native-freshchat-sdk';
import React from "react";
import { NativeBaseProvider, Box, Button } from "native-base";

import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import messaging from '@react-native-firebase/messaging';

export default function App() {
  ;(async () => {
    const authStatus = await messaging().requestPermission();
    const fcmToken = await messaging().getToken()
    const apnsToken = await messaging().getAPNSToken();
    console.debug({ fcmToken, apnsToken })
  })()

var freshchatUser = new FreshchatUser();
freshchatUser.firstName = "John";
freshchatUser.lastName = "Doe";
freshchatUser.email = "johndoe@dead.man";
freshchatUser.phoneCountryCode = "+91";
freshchatUser.phone = "1234234123";
Freshchat.setUser(freshchatUser, (error) =>
{
    console.log(error)
})
  Freshchat.identifyUser("EXTERNAL_ID", null, (error) =>
  {
      console.log(error);
  });

  useEffect(() => {
    Freshchat.addEventListener(Freshchat.EVENT_UNREAD_MESSAGE_COUNT_CHANGED, () => {
      console.log("onUnreadMessageCountChanged triggered");
      Freshchat.getUnreadCountAsync((data) => {
        var count = data.count;
        var status = data.status;
        if (status) {
          console.log("Message count: " + count);
        } else {
          console.log("getUnreadCountAsync unsuccessful");
        }
      });
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Box border={1}>
          <Text>Open up App.js to start working on your app!</Text>
          <StatusBar style="auto" />
          <Button onPress={() => Freshchat.showConversations()}>Freshchat</Button>
        </Box>
      </View>
    </NativeBaseProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
