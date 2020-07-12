import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import ApplicationNavigation from './components/appnavigation'
import Login from './views/login'
import Header from './components/header'
import styles from './styles/Styles'
import Remainders from './views/remainders'

const Stack = createStackNavigator();


export default function App() {
  return (
    <View style={styles.baseview}>
      <ApplicationNavigation />
    </View>
  );
}

