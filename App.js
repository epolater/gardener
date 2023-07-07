import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import TopBar from './components/TopBar'
import BottomBar from './components/BottomBar';
import AddNewBedMenu from './components/AddNewBedMenu';

export default function App() {
  return (
    <>
    <View style={styles.topContainer}>
      <StatusBar style="auto" />
      <TopBar />
    </View>
    <ScrollView style={styles.middleContainer}>
      <AddNewBedMenu></AddNewBedMenu>
    </ScrollView>
    <View style={styles.bottomContainer}>
      <BottomBar />
    </View>
    </>
  );
}


// Styles
const styles = StyleSheet.create({
  topContainer: {
    flex: 0.15,
    zIndex: 99,
    
  },
  
  middleContainer: {
    flex:0.7,
    backgroundColor: 'white',
    padding: 20,
  },
  bottomContainer: {
    flex: 0.15,
    zIndex: 99,
  }

});
