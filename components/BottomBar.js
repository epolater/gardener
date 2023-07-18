import { View, Text, StyleSheet } from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLeaf } from '@fortawesome/free-solid-svg-icons/faLeaf'

import HomeScreen from './HomeScreen'
import BedGrid from './BedGrid'


export default function BottomBar() {
  
  const Tab = createBottomTabNavigator()


  return (
    <Tab.Navigator
      initialRouteName = 'Home'
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#f6f6f6',
      }}
    
    >
      <Tab.Screen name='Home' component={HomeScreen}
        options={{
          tabBarIcon : () => {
            return <FontAwesomeIcon icon={ faLeaf } size={24} color='white'/>
          }
        }}
      />
      <Tab.Screen name='BedGrid' component={BedGrid}/>
    </Tab.Navigator>
  )
}


// Styles
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#46785a',
  },


});