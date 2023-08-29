import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import All from './screens/All';
import { Icon } from 'react-native-elements'
import FavoritesScreen from './screens/FavoritesScreen';
import SummaryScreen from './screens/SummaryScreen';
import FavSelect from './screens/FavSelect';
import FavNavigate from './screens/FavNavigate';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
      <Tab.Screen name="News" component={All}
          options={{
            tabBarIcon: (props) => (
              <Icon type='ionicon' name='newspaper-outline' color={props.color} />
            ),
          }} />
          <Tab.Screen name="Favorites" component={FavNavigate}
          options={{
            tabBarIcon: (props) => (
              <Icon type='ionicon' name="star" color={props.color} />
            ),
          }} />
        <Tab.Screen name="Brief" component={SummaryScreen}
          options={{
            tabBarIcon: (props) => (
              <Icon type='feather' name="align-left" color={props.color} />
            ),
          }}  />
        
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





