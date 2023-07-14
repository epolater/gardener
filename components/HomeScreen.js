import { View, ScrollView, Text, TextInput, StyleSheet, Pressable, Alert, Animated } from 'react-native'
import { useEffect, useState } from 'react'
import * as SQLite from 'expo-sqlite'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons/faXmarkCircle'

import BedSumCard from './BedSumCard'

export default function HomeScreen ({showANBmenu}) {

  const [closeMenu, onCloseMenu] = useState(true)

  // Input fields  variables
  const [name, onChangeName] = useState('')
  const [number, onChangeNumber] = useState('')
  const [width, onChangeWidth] = useState('')
  const [length, onChangeLength] = useState('')

  // Remove any non-numeric characters from input
  const handleInputChange = (text) => {
    let numericValue = text.replace(/[^0-9.]/g, '')
    numericValue = isNaN(numericValue) ? '': numericValue.toLocaleString()
    return numericValue
  }

  // Open database if not exists and retrieve data from database
  const db = SQLite.openDatabase('mydatabase.db')
  const [beds, setBeds] = useState([])

  // Creating Beds Table
  useEffect(() => {
    const createDatabase = () => {
        db.transaction(tx => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS beds (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, number INTEGER, width INTEGER, length INTEGER)',
            [],
            (_, error) => {console.log('Error creating table "beds":', error)}
          )
        })
      }

    createDatabase();

  }, [])


  // Save Input to database
  const addNewBed = () => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO beds (name, number, width, length) values (?,?,?,?)',
        [name, parseInt(number), parseInt(width), parseInt(length)],
        (txobj, result) => {
          if (result.rowsAffected > 0) {
            Alert.alert('Success', 'New bed added', [{ text: 'OK' }])
          } else {Alert.alert('Error', 'Failed to add new bed')}
        },
        (_, error) => {
          console.log('Error retrieving data from table:', error);
        }
        )
    })

    // Set Beds List
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM beds',null,
        (_, result) => setBeds(result.rows._array.reverse()),
        (_, error) => console.log(error)
      )
    })

    console.log("add new button is pressed")
  }

  // Retrieve data from the database
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM beds',null,
        (_, result) => setBeds(result.rows._array.reverse()),
        (_, error) => console.log(error)
      )

    })
  }, [])

  // Delete Bed
  const deleteBed = (id) => {
    db.transaction(tx => {
      tx.executeSql('DELETE from beds WHERE id=?',[id],
      (txObj, result) => {
        if (result.rowsAffected > 0) {
          let newBeds = [...beds].filter(bed => bed.id !== id)
          setBeds(newBeds)
        }
      },
      (txObj, error) => console.log(error)
      )
    })
  }

  // Bed Cards Slider
  const MyBeds = () => {
    const showBeds = () => {
      return beds.map((bed, index) => {
        const isNew = index === beds.length - 1 // Check if it's a new card
        return (
          <Animated.View key={index}  >
            <BedSumCard
              id={bed.id}
              name={bed.name}
              number={bed.number}
              width={bed.width}
              length={bed.length}
              onDelete={deleteBed}
              isNew={isNew}
            />
          </Animated.View>
        )
      })
    }

    return (
      <View>
        <View style={styles.MBHeaderContainer}>
            <Text style={styles.MBHeaderText}>My Beds</Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {showBeds()}
        </ScrollView>
        <Text>Text Under Bed Cards</Text>
      </View>
    )
  }

  return (
    <>
    {showANBmenu &&
      <View style={styles.ANBContainer}>
        <View style={styles.ANBTopBar}>
          <View style={styles.ANBTopBarSubContainer}>
            <Text style={styles.ANBTopBarText}>Add New Bed</Text>
            <Pressable onPress={() => {onCloseMenu(false)}}>
              <FontAwesomeIcon icon={ faXmarkCircle } size={24} style={styles.ANBXmark}/>
            </Pressable>
          </View>
        </View>
        <View style={styles.ANBSubContainer} keyboardDismissMode='on-drag'>
          <Text>Name</Text>
          <TextInput
            style={styles.ANBInput}
            value={name}
            onChangeText={onChangeName}
            placeholder={'Name'}
          >
          </TextInput>

          <Text>Number of Lanes</Text>
          <TextInput
            style={styles.ANBInput}
            value={number}
            onChangeText={(input)=>{onChangeNumber(handleInputChange(input))}}
            placeholder={'Number of Lanes'}
            keyboardType='number-pad'
          >
          </TextInput>

          <Text>Width of Lanes</Text>
          <TextInput
            style={styles.ANBInput}
            value={width}
            onChangeText={(input)=>{onChangeWidth(handleInputChange(input))}}
            placeholder={'Width of the Lanes in meters'}
            keyboardType='number-pad'
          >
          </TextInput>

          <Text>Length of Lanes</Text>
          <TextInput
            style={styles.ANBInput}
            value={length}
            onChangeText={(input)=>{onChangeLength(handleInputChange(input))}}
            placeholder={'Length of the Lanes in meters'}
            keyboardType='number-pad'
          >
          </TextInput>

          <Pressable style={styles.ANBAddButton} onPress={() => addNewBed()}>
            <Text style={styles.ANBAddButtonText}>Add</Text>
          </Pressable>
        </View>
      </View>
    }
    <MyBeds />
    </>
  )
}

// Styles
const styles = StyleSheet.create({
  ANBContainer : {
    flex: 1,
    maxWidth: 400,
    alignSelf: 'flex-end',
    backgroundColor: '#DEE4DF',
    borderRadius: 20,
    marginBottom: 20,
  },
  ANBTopBar: {
    flex: 0.08,
    width: 350,
    backgroundColor: '#23C564',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  ANBTopBarSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  ANBXmark: {
    color: 'white',
    paddingVertical: 3,
  },
  ANBTopBarText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 3,
  },

  ANBSubContainer: {
    flex: 0.9,
    margin: 20,
  },
  ANBInput: {
    height: 40,
    marginTop: 5,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: 'white',
  },
  ANBAddButton:{
    fontSize: 20,
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#8BC907',
    borderColor: 'none',
    borderRadius: 20
  },
  ANBAddButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },

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
})