import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome'

export default function TopBar() {
  return (
    <View style={styles.topBarContainer}>
      <View style={styles.logocontainer}>
        <Icon name="bars" size={30} style={styles.menuIcon}/>
        <Text style={styles.topBarName}>Gardener</Text>
      </View>
      <View>
        <Pressable 
          style={styles.addNewButton}
          onPress={() => {}}
        >
          <Icon name="plus" size={28}  style={styles.addNewIcon}/>
        </Pressable>
      </View>
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
    paddingRight: 20,
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

  logocontainer : {
    flex:1,
    flexDirection: 'row',
  },

  menuIcon: {
    paddingTop: 4,
    marginRight: 20,
    color: "#8bc907",
  },

  addNewButton: {
    height: 40,
    width: 40,
    backgroundColor: '#dee4df',
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 4,

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
});