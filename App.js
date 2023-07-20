import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import {NavigationContainer, DefaultTheme} from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import {DataProvider} from './components/DataContext'
import TopBar from './components/TopBar'
import BottomBar from './components/BottomBar'


export default function App() {

  const [ANBMenu, onShowANBMenu] = useState(false)

  // Make Navigation Container backgroundcolor transparent
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
    },
  }

  return (
    <DataProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer theme={navTheme} >
        <View style={styles.topContainer}>
          <StatusBar style="auto" />
          <TopBar />
        </View>

        <View style={styles.bottomContainer}>
          <BottomBar />
        </View>
      </NavigationContainer>
      </GestureHandlerRootView>
    </DataProvider>
  );

}


// Styles ------------------------------------------------
const styles = StyleSheet.create({
  topContainer: {
    flex: 0.13,
    zIndex: 9,
  },

  middleContainer: {
    flex:0.7,
    backgroundColor: 'white',
    padding: 20,
  },

  bottomContainer: {
    flex: 1,
  },

  addNewButton: {
    height: 40,
    width: 40,
    backgroundColor: '#dee4df',
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 4,
    position: 'absolute',
    right: 20,
    top: 40,
    zIndex: 99,

    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  addNewIcon: {
    textAlign: 'center',
    marginVertical: 8,
    color: '#46785a'
  },


});
