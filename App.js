import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import {NavigationContainer, DefaultTheme} from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import {DataProvider} from './components/DataContext'
import TopBar from './components/TopBar'
import BottomBar from './components/BottomBar'
import AddProducts from './components/AddProducts'
import BedGrid from './components/BedGrid'


export default function App() {

  const [ANBMenu, onShowANBMenu] = useState(false)
  const Stack = createNativeStackNavigator()

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
      <NavigationContainer theme={navTheme} >
        <View style={styles.topContainer}>
          <StatusBar style="auto" />
          <TopBar />
        </View>

        <Stack.Navigator>
          <Stack.Screen 
            name='BottomBar'
            component={BottomBar}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name='AddProducts'
            component={AddProducts}
            options={() => ({
              title: 'Add Products',
              headerBackVisible: true,
              headerBackTitleVisible: false,
              headerStyle: {backgroundColor: '#46785A'},
              headerTitleStyle: {color: 'white'},
              headerTintColor: 'white'
            })}
          />
          <Stack.Screen 
            name='BedGrid'
            component={BedGrid}
            options={() => ({
              title: 'Edit Bed',
              headerBackVisible: true,
              headerBackTitleVisible: false,
              headerStyle: {backgroundColor: '#46785A'},
              headerTitleStyle: {color: 'white'},
              headerTintColor: 'white'
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );

}


// Styles ------------------------------------------------
const styles = StyleSheet.create({
  topContainer: {
    flex: 0.13,
    zIndex: 9,
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
