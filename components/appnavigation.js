import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import { View,Button} from 'react-native';

import Login from '../views/login'
import Remainders from '../views/remainders'
import AddRemainders from '../views/addremainder'


// const screens = {
//   Login: {
//     screen: Login,
//   },
//   Remainders: {
//     screen: Remainders,
//   },
// };

// const ScreenStacks = createStackNavigator(screens);

// const appNavigation = createAppContainer(ScreenStacks);

const Stack = createStackNavigator();

const ApplicationNavigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' >
            <Stack.Screen name='Login' component={Login} options={{title: 'Remainders', headerStyle: {backgroundColor: '#9363db'}}} />
            <Stack.Screen name='Remainders' component={Remainders} options={{
                        title: 'Remainders',
                        headerStyle: {backgroundColor: '#9363db'},
                        headerLeft: null,
                        headerRight: () => (
                          <View style={{marginRight:10}}>
                              <Button onPress={() => alert('Log Out Button')} title="LOGOUT" color="black" />
                          </View>
                          )}}/>
            <Stack.Screen name='AddRemainder' component={AddRemainders} options={{
                        title: 'AddRemainder',
                        headerStyle: {backgroundColor: '#9363db'},
                        headerLeft: null,
                        headerRight: () => (
                          <View style={{marginRight:10}}>
                              <Button onPress={() => alert('Log Out Button')} title="LOGOUT" color="black" />
                          </View>
                          )}}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default  ApplicationNavigation