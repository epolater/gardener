import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import { useEffect, useState } from 'react'
import * as SQLite from 'expo-sqlite'

import BedSumCard from '../components/BedSumCard'

export default function MyBeds () {

  // Open database  retrieve data from database
  const db = SQLite.openDatabase('mydatabase.db')
  const [beds, setBeds] = useState([])

  // Retrieve data from the database
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM beds',
        null,
        (_, result) => setBeds(result.rows._array),
        (_, error) => console.log(error)
      )
    })
  }, [])

  console.log(beds)

  const showBeds = () => {
    return beds.reverse().map((bed, index) => {
      return (
        <View key={index}>
          <BedSumCard
            name={bed.name}
            number={bed.number}
            width={bed.width}
            length={bed.length}
          />
        </View>
      )
    })
  }

  return (
    <>
      <View style={styles.MBHeaderContainer}>
          <Text style={styles.MBHeaderText}>My Beds</Text>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {showBeds()}
      </ScrollView>
    </>
  )
}

// Styles
const styles = StyleSheet.create({
  MBHeaderContainer : {
    flex: 0.1,
    paddingVertical: 5,
    paddingLeft: 10,
    borderBottomWidth: 1,
    marginBottom: 20,
    borderBottomColor: 'lightgrey',
  },
  MBHeaderText : {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#46785a'
  },

});