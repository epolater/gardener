import { View, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native'
import { useEffect, useState } from 'react'
import * as SQLite from 'expo-sqlite'
import * as FileSystem from 'expo-file-system'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons/faXmarkCircle'



export default function AddNewBedMenu () {

  // Open database
  //const db = SQLite.openDatabase('mydatabase.db')

  const dbFileName = 'mydatabase.db';
  const cacheDirectory = `${FileSystem.cacheDirectory}SQLite`;
  const db = SQLite.openDatabase(`${cacheDirectory}/${dbFileName}`);

  useEffect(() => {
    const createDatabase = async () => {
      try {
        const { exists, isDirectory } = await FileSystem.getInfoAsync(cacheDirectory);

        if (!exists) {
          await FileSystem.makeDirectoryAsync(cacheDirectory, { intermediates: true });
        } else if (!isDirectory) {
          // Handle the case where a file exists with the same name as the directory
          await FileSystem.deleteAsync(cacheDirectory);
          await FileSystem.makeDirectoryAsync(cacheDirectory, { intermediates: true });
        }

        db.transaction(tx => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS beds (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, number INTEGER, width INTEGER, length INTEGER)',
            [],
            (_, result) => {
              if (result.rowsAffected > 0) {
                console.log('Table "beds" created or already exists');
              } else {
                console.log('Failed to create table "beds"');
              }
            },
            (_, error) => {
              console.log('Error creating table "beds":', error);
            }
          );
        });
      } catch (error) {
        console.log('Error creating database:', error);
      }
    };

    createDatabase();

  }, []);



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

  const [beds, setBeds] = useState([])

  // Retrieve data from the database
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM beds',
        [],
        (_, result) => {
          const rows = result.rows._array;
          setBeds(rows);
        },
        (_, error) => {
          console.log('Error retrieving data from "beds" table:', error);
        }
      );
    });
  }, [db]);

  // Save Input to database
  const addNewBed = () => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO beds (name, number, width, lenght) values (?,?,?,?)',
        [name, parseInt(number), parseInt(width), parseInt(length)],
        (txobj, result) => {
          if (result.rowsAffected > 0) {
            Alert.alert('Success', 'New bed added', [{ text: 'OK' }])
          } else {Alert.alert('Error', 'Failed to add new bed')}
        }
        )
    })

    console.log("add new button is pressed")
  }



  const showDatabase = () => {
      return (
        <View>
          <Text>Name: {beds.length}</Text>
        </View>
      )
  }

  return (
    <>
    { closeMenu &&
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
          {showDatabase()}
        </View>
      </View>
    }
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
  },
  ANBTopBar: {
    flex: 0.08,
    width: 350,
    backgroundColor: '#23C564',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  ANBTopBarSubContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  ANBXmark: {
    color: 'white',
    paddingTop: 0,
  },
  ANBTopBarText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    verticalAlign: 'bottom'
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
})