import React, { useRef, useEffect , useState } from 'react';
import { View, PanResponder, Text, StyleSheet } from 'react-native';

function SampleGrid()  {

  const [coordinates, setCoordinates] = useState({x:'', y:''});
  const panResponder = useRef(null);

  useEffect(() => {
    panResponder.current = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        console.log('Finger touched down');
        setCoordinates({
          x: Math.floor(gestureState.x0),
          y: Math.floor(gestureState.y0)
        })
      },
      onPanResponderMove: (evt, gestureState) => {
        console.log('Finger is moving');
        setCoordinates({
          x: Math.floor(gestureState.moveX),
          y: Math.floor(gestureState.moveY)
        })
      },
      onPanResponderRelease: (evt, gestureState) => {
        console.log('Finger released');
      },
    });
  }, [])

  return (
    <View {...(panResponder.current ? panResponder.current.panHandlers : {})} style={styles.container} >
      <Text style={styles.text}>X:{coordinates.x} Y:{coordinates.y}</Text>
    </View>
  )
}

// Styles -----------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
  },

  text: {
    fontSize: 24,
  }
})

export default SampleGrid;
