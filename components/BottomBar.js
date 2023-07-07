import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function BottomBar() {
  return (
    <View style={styles.bottomBarContainer}>

    </View>
  )
}


// Styles
const styles = StyleSheet.create({
  bottomBarContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#46785a',
    alignItems: 'center',

  },

});