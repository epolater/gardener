import React, {useState, useEffect, useRef} from 'react'
import {View, Text, StyleSheet, Animated} from 'react-native'

const Messages = ({message, duration}) => {
  const [isVisible, setIsvisible] = useState(true)
  //const fadeAnim = useRef(new Animated.Value(1)).current

  console.log('Message is working')

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsvisible(false)
  //   },duration)

  //   return () => {
  //     clearTimeout(timer)
  //   }
  // }, [duration])


  // useEffect(() => {
  //   if(!isVisible) {
  //     Animated.timing(fadeAnim, {
  //       toValue: 0,
  //       duration: 500,
  //       useNativeDriver: true,
  //     }).start()
  //   }
  // }, [isVisible, fadeAnim])

  return (
    <View style={[styles.infoContainer, !isVisible && {display: 'none'}]} >
      <View style={styles.infoBox} >
        <Text style={styles.infoText}>{message}</Text>
      </View>
    </View>
  )

}

export default Messages

// Styles ------------------------------------------------
const styles = StyleSheet.create({
  infoContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 10,
    alignItems: 'center',
    zIndex: 99,
  },
  infoBox: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: 'white',
    backgroundColor: 'green',
    borderRadius: 20,
  },
  infoText: {
    color: 'white',
  },
});