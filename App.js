import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

import TopBar from './components/TopBar'
import BottomBar from './components/BottomBar'
import HomeScreen from './components/HomeScreen'

export default function App() {

  const [ANBMenu, onShowANBMenu] = useState(false)

  return (
    <>
    <View style={styles.topContainer}>
      <StatusBar style="auto" />
      <TopBar />
      <Pressable style={styles.addNewButton} onPress={() => {onShowANBMenu(!ANBMenu)}}>
          <Icon name="plus" size={28}  style={styles.addNewIcon}/>
      </Pressable>
    </View>

    <ScrollView style={styles.middleContainer}>
      <HomeScreen showANBmenu={ANBMenu}/>
    </ScrollView>

    <View style={styles.bottomContainer}>
      <BottomBar />
    </View>
    </>
  );
}


// Styles ------------------------------------------------
const styles = StyleSheet.create({
  topContainer: {
    flex: 0.15,
    zIndex: 9,
  },

  middleContainer: {
    flex:0.7,
    backgroundColor: 'white',
    padding: 20,
  },
  bottomContainer: {
    flex: 0.15,
    zIndex: 9,
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
