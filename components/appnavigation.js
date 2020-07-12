import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native"
import Login from '../views/login'
import Remainders from '../views/remainders'

const Stack = createStackNavigator();

const ApplicationNavigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Remainders' component={Remainders} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default  ApplicationNavigation