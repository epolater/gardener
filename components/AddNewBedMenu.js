import { View, Text, TextInput, StyleSheet, Pressable, ScrollView } from 'react-native'
import { Button } from 'react-native-paper';
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons/faXmarkCircle'

export default function AddNewBedMenu () {

  const [name, onChangeName] = useState('')
  const [number, onChangeNumber] = useState('')
  const [width, onChangeWidth] = useState('')
  const [length, onChangeLength] = useState('')

  // Remove any non-numeric characters
  const handleInputChange = (text) => { 
    let numericValue = text.replace(/[^0-9.]/g, '')
    numericValue = isNaN(numericValue) ? '': numericValue.toLocaleString()
    return numericValue
  }

  return (
      <View style={styles.ANBContainer}>
        <View style={styles.ANBTopBar}>
          <View style={styles.ANBTopBarSubContainer}>
            <Text style={styles.ANBTopBarText}>Add New Bed</Text>
            <FontAwesomeIcon icon={ faXmarkCircle } size={24} style={styles.ANBXmark}/>
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

          <Pressable
            style={styles.ANBAddButton}
            onPress={() => {}}
          >
            <Text style={styles.ANBAddButtonText}>Add</Text>
          </Pressable>
        </View>
      </View>
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
    backgroundColor: 'white'
    
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