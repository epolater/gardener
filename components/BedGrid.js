import { View, Text, StyleSheet, Pressable, Animated } from 'react-native'
import * as SQLite from 'expo-sqlite'
import React, { useState, useEffect } from 'react'

export default function BedGrid () {

  // Open database
  const db = SQLite.openDatabase('mydatabase.db')
  const [beds, setBeds] = useState([])

  // Retrieve data from the database
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM beds',null,
        (_, result) => setBeds(result.rows._array.reverse()),
        (_, error) => console.log(error)
      )

    })
  }, [])

  return (
    <View style={styles.GRDmainContainer}>
      <Text>Number of Beds: {beds.length}</Text>
    </View>
  )
}


// Styles ------------------------------------------------
const styles = StyleSheet.create({
  GRDmainContainer: {
    padding:20,
  }
})