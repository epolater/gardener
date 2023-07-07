import { View, Text, StyleSheet } from 'react-native'

export default function BedSumCard () {
  return (
    <View style={styles.BCSContainer}>
      <View style={styles.BCSSubContainer}>
        <Text style={styles.BCSTopBarText}>Bed Name</Text>
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
          <Text style={styles.infoText}>50 sqm</Text>
          <Text style={styles.infoText}>3</Text>
          <Text style={styles.infoText}>Cleaning</Text>
          <Text style={styles.infoText}>Watering</Text>
        </View>
      </View>
    </View>
  )
}

// Styles
const styles = StyleSheet.create({
  BCSContainer : {
    height: 400,
    width: 350,
    backgroundColor: '#f6f6f6',
    borderRadius: 20,
    borderWidth: 1,
    marginLeft: 20,
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
    flex:0.7,
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
})