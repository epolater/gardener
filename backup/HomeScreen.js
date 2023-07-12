import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function HomeScreen() {
  return (
    <View style={styles.topBarContainer}>
      <Icon name="bars" size={30} color="#8bc907" style={styles.menuIcon}/>
      <Text style={styles.topBarName}>Gardener</Text>
    </View>
  )
}


// Styles
const styles = StyleSheet.create({
  topBarContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f6f6f6',
    alignItems: 'flex-end',
    paddingLeft: 20,
    paddingBottom:10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  topBarName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#8bc907',
    paddingBottom: 0,
  },

  menuIcon: {
    paddingBottom: 4,
    marginRight: 20,
  }
});