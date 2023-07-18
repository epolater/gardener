import { View, Text, StyleSheet, Pressable, Animated } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'

export default function BedSumCard ({id, name, number, width, length, onDelete}) {

  const cardWidth = useRef(new Animated.Value(350)).current

  const deleteCard = () => {
    Animated.timing(cardWidth, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false,
    }).start(() => {onDelete(id)})
  }

  useEffect(() => {cardWidth.setValue(350)})

  return (
    <Animated.View style={{ width: cardWidth, marginRight: 20 }}>
      <View style={styles.BCSContainer}>
        <View style={styles.BCSSubContainer}>
          <Text style={styles.BCSTopBarText}>{name}</Text>
        </View>
        <View style={styles.layoutContainer}>
          <Text>Bed Layout</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoContainerSub}>
            <Text style={styles.infoTextLeft}>Total Area :</Text>
            <Text style={styles.infoTextLeft}>Number of Products :</Text>
            <Text style={styles.infoTextLeft}>Process Status :</Text>
            <Text style={styles.infoTextLeft}>Next Process :</Text>
          </View>
          <View>
            <Text style={styles.infoText}>{width * length * number} sqm</Text>
            <Text style={styles.infoText}>1</Text>
            <Text style={styles.infoText}>Cleaning</Text>
            <Text style={styles.infoText}>Watering</Text>
          </View>
        </View>
        <View style={styles.BCSIconContainer}>
          <Pressable onPress={deleteCard}>
            <FontAwesomeIcon icon={faTrash} size={16} style={styles.thrashIcon}/>
          </Pressable>
        </View>
      </View>
    </Animated.View>
  )
}

// Styles
const styles = StyleSheet.create({
  BCSContainer : {
    flex: 1,
    height: 400,
    width: 350,
    backgroundColor: '#f6f6f6',
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 20,
    borderColor: 'lightgray',
  },

  BCSSubContainer: {
    flex: 0.08,
    width: 350,
    backgroundColor: '#8BC907',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: 8,
    paddingLeft: 20,
  },
  BCSTopBarText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  layoutContainer: {
    flex:0.9,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },

  infoContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
  },
  infoContainerSub: {
    width: '50%',
  },
  infoText: {
    marginBottom: 5,
    marginLeft: 5,

  },
  infoTextLeft: {
    textAlign: 'right',
    marginBottom: 5,
    color: 'gray',
  },

  BCSIconContainer: {
    alignItems: 'flex-end',
    padding: 15,
  },
  thrashIcon: {
    color: 'lightgray',

  },
})