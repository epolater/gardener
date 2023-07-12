import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as SQLite from 'expo-sqlite'


import TopBar from './components/TopBar'
import BottomBar from './components/BottomBar'
import AddNewBedMenu from './components/AddNewBedMenu'
import BedSumCard from './components/BedSumCard'

export default function App() {


  const [anbMenu, onShowAnbMenu] = useState(false)

  return (
    <>
    <View style={styles.topContainer}>
      <StatusBar style="auto" />
      <TopBar />
      <Pressable
          style={styles.addNewButton}
          onPress={() => {onShowAnbMenu(!anbMenu)}}
        >
          <Icon name="plus" size={28}  style={styles.addNewIcon}/>
        </Pressable>
    </View>

    <ScrollView style={styles.middleContainer}>
      {anbMenu && <AddNewBedMenu />}
      <View style={styles.homeHeaderContainer}>
        <Text style={styles.homeHeaderText}>My Beds</Text>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <BedSumCard />
      </ScrollView>

    </ScrollView>

    <View style={styles.bottomContainer}>
      <BottomBar />
    </View>
    </>
  );
}


// Styles
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

  homeHeaderContainer : {
    flex: 0.1,
    paddingVertical: 5,
    paddingLeft: 10,
    borderBottomWidth: 1,
    marginBottom: 20,
    borderBottomColor: 'lightgrey',
  },
  homeHeaderText : {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#46785a'
  },

});
