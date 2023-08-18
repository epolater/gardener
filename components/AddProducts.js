import { View, Text, TextInput, StyleSheet, Pressable, ScrollView } from 'react-native'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons/faXmarkCircle'
import { useContext } from 'react'

import DataContext from './DataContext'

export default function AddProducts({navigation}) {

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

  // Retrieve data from database
  //const {beds, setBeds, insertBed} = useContext(DataContext)


  // Add New Bed (Save Input to database)
  const addNewBed = () => {
    const newBed = {name: name, number: number, width: width, length: length}
    insertBed(newBed)
  
    // Set Input fields to none
    onChangeName(''); onChangeNumber(''); onChangeWidth(''); onChangeLength('');
  }

  // Disable Add Button
  const isValid = name && number && width && length


  return (
    <ScrollView View style={styles.ANBContainer}>
      <View style={styles.ANBSubContainer} keyboardDismissMode='on-drag'>
        <Text>Product Name</Text>
        <TextInput
          style={styles.ANBInput}
          value={name}
          onChangeText={onChangeName}
          placeholder={'Select or Type a name'}
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

        <Pressable
          disabled={!isValid}
          style={[styles.ANBAddButton, !isValid && styles.ANBAddButtonDisabled]}
          onPress={() => addNewBed()}
        >
          <Text style={styles.ANBAddButtonText}>Add</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}

// Styles
const styles = StyleSheet.create({
  ANBContainer : {
    flex: 1,
    backgroundColor: 'white',
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
  ANBAddButtonDisabled:{
    backgroundColor: 'lightgrey',
  },
  ANBAddButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },

})