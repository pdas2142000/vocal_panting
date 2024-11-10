import 'react-native-gesture-handler'
import React, { useState, useEffect } from 'react';
import { StatusBar, Dimensions, SafeAreaView, View, Image, Text } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import AppNavigation from './src/Navigation/AppNavigation';
import EStyleSheet from 'react-native-extended-stylesheet';
import { getDeviceType } from 'react-native-device-info';

let deviceType = getDeviceType();

const { width } = Dimensions.get('window');
const rem = width / 380;
const remSm = width / 400;
const remTab = width / 500;

EStyleSheet.build({
  $rem: deviceType === 'Tablet' ?
    remTab :
    width > 400 ? rem : remSm,
});

const App = () => {

  const [isNetworkReachable, setIsNetworkReachable] = useState(true);

  function MiniOfflineSign() {
    return (
      <View style={styles.offlineAreaStyle}>
        <View style={styles.offlineContainer}>
          <Text style={styles.offlineText}>No Internet Connection</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={(require('./assets/wifi.png'))} width={120} height={120} />
        </View>
      </View>
    )
  }

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(({ isInternetReachable }) => {
      setIsNetworkReachable(isInternetReachable != null ? isInternetReachable : true);
    });
    return () => {
      unsubscribe();
    }
  }, [])

  return (
    <>
      {
        isNetworkReachable ? <AppNavigation /> :
          <>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#b52424', top: 0 }}>
              <StatusBar backgroundColor='#b52424' barStyle='light-content' />
              <MiniOfflineSign />
            </SafeAreaView>
          </>
      }
    </>
  )
};

const styles = EStyleSheet.create({
  offlineAreaStyle: {
    flex: 1,
    backgroundColor: '#fff'
  },
  offlineContainer: {
    backgroundColor: '#b52424',
    height: '50rem',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    zIndex: 2
  },
  offlineText: {
    color: '#fff',
    fontFamily: 'SourceSansPro-Bold',
  }
})

export default App;