import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import All from './screens/All';
//import Business from './screens/Business';
//import HealthScreen from './screens/Health';
//import SportsScreen from './screens/Sports';
//import TechScreen from './screens/Tech';
import { Icon } from 'react-native-elements'
import FavoritesScreen from './screens/FavoritesScreen';
//import SummaryScreen from './screens/SummaryScreen';
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
      <Tab.Screen name="All" component={All}
          options={{
            tabBarIcon: (props) => (
              <Icon type='feather' name='home' color={props.color} />
            ),
          }} />

        
        <Tab.Screen name="Favorites" component={FavoritesScreen}
          options={{
            tabBarIcon: (props) => (
              <Icon type='ionicon' name="star" color={props.color} />
            ),
          }} />
        
      </Tab.Navigator>
    </NavigationContainer>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});






