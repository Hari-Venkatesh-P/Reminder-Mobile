import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import { View,Alert,TouchableOpacity,Text,Button} from 'react-native';


import * as RootNavigation from './rootnavigations';
import Login from '../views/login'
import Remainders from '../views/remainders'
import AddRemainders from '../views/addremainder'
import UpdateRemainder from '../views/updateremainder'
import BackButton from '../views/backbutton'


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
            <Stack.Screen name='BackButton' component={BackButton} options={{title: 'Remainders', headerStyle: {backgroundColor: '#9363db'}}} />
            <Stack.Screen name='Login' component={Login} options={{title: 'Login', headerStyle: {backgroundColor: '#9363db'}}} />
            <Stack.Screen name='Remainders' component={Remainders} 
                        options={{
                        title: 'Reminders',
                        headerStyle: {backgroundColor: '#9363db'},
                        headerLeft: null,
                        headerRight: () => (
                            <View style={{marginRight:10}}>
                                <TouchableOpacity onPress={() => RootNavigation.navigate('Login','')} >
                                    <Text style={{color:"#4d3a27",fontWeight:"bold"}}>LOG OUT</Text>
                                </TouchableOpacity>
                            </View>
                            )
                        }}
                          />
            <Stack.Screen name='AddRemainder' component={AddRemainders} options={{
                        title: 'Reminders',
                        headerStyle: {backgroundColor: '#9363db'},
                        headerLeft: null,
                        headerRight: () => (
                          <View style={{marginRight:10}}>
                              <TouchableOpacity onPress={() => alert('Log Out Button')} >
                                  <Text style={{color:"#4d3a27",fontWeight:"bold"}}>LOG OUT</Text>
                              </TouchableOpacity>
                          </View>
                          )}}/>
            <Stack.Screen name='UpdateRemainder' component={UpdateRemainder} options={{
                        title: 'Reminders',
                        headerStyle: {backgroundColor: '#9363db'},
                        headerRight: () => (
                          <View style={{marginRight:10}}>
                              <TouchableOpacity onPress={() => alert('Log Out Button')} >
                                  <Text style={{color:"#4d3a27",fontWeight:"bold"}}>LOG OUT</Text>
                              </TouchableOpacity>
                          </View>
                          )}}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default  ApplicationNavigation