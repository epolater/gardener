import { View, ScrollView, Text, StyleSheet, Pressable } from 'react-native'
import { useState, useContext } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

import DataContext from './DataContext'
import BedSumCard from './BedSumCard'
import AddNewBedMenu from './AddNewBedMenu'

export default function HomeScreen () {

  // Conncet to DataContext
  const {beds, deleteBed} = useContext(DataContext)

  // Delete Bed
  const handleDeleteBed = (id) => {deleteBed(id)}


  // Bed Cards Slider
  const MyBeds = () => {
    const showBeds = () => {
      return beds.map((bed, index) => {
        return (
          <View key={index}  >
            <BedSumCard
              id={bed.id}
              name={bed.name}
              number={bed.number}
              width={bed.width}
              length={bed.length}
              onDelete={handleDeleteBed}
            />
          </View>
        )
      })
    }

    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {showBeds()}
      </ScrollView>
    )
  }

  const [ANBMenu, onShowANBMenu] = useState(false)

  return (
    <>
      <Pressable style={styles.addNewButton} onPress={() => {onShowANBMenu(!ANBMenu)}}>
        <Icon name="plus" size={28}  style={styles.addNewIcon}/>
      </Pressable>
      <ScrollView style={styles.middleContainer}>
      {ANBMenu && <AddNewBedMenu />}
      <View style={styles.MBHeaderContainer}>
          <Text style={styles.MBHeaderText}>My Beds</Text>
      </View>
      <MyBeds />
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

  middleContainer: {
    flex:0.7,
    backgroundColor: 'white',
    padding: 20,
  },

  addNewButton: {
    height: 40,
    width: 40,
    backgroundColor: '#dee4df',
    borderRadius: 20,
    position: 'absolute',
    right: 30,
    bottom: 15,
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

})