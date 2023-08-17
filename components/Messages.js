import React, {useState, useEffect, useRef} from 'react'
import {View, Text, StyleSheet, Animated} from 'react-native'

const Messages = ({message, duration}) => {
  const [isVisible, setIsvisible] = useState(true)
  const fadeAnim = useRef(new Animated.Value(1)).current
  const fadeOutTime = 500

  //console.log('Message is working')

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsvisible(false)
    },duration + fadeOutTime)

    const fadeOutTimer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: fadeOutTime,
        useNativeDriver: true,
      }).start();
    }, duration);

    return () => {
      clearTimeout(timer)
      clearTimeout(fadeOutTimer)
    }
  }, [duration, fadeAnim])

  // Don't render anything when message is not visible
  if (!isVisible) {return null}

  return (
    <Animated.View style={[styles.infoContainer,{ opacity: fadeAnim }, !isVisible && {display: 'none'}]} >
      <View style={styles.infoBox} >
        <Text style={styles.infoText}>{message}</Text>
      </View>
    </Animated.View>
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