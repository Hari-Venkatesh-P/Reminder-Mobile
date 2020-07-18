import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import { View,TouchableOpacity,Text,Dimensions} from 'react-native';


import Login from '../views/login'
import Remainders from '../views/remainders'
import AddRemainders from '../views/addremainder'
import UpdateRemainder from '../views/updateremainder'

const screenWidth = Math.round(Dimensions.get('window').width);

const ninetyPercentScreenWidth = screenWidth -  ((25/100)*screenWidth)


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
            <Stack.Screen name='Login' component={Login} 
                              options={{
                              title: 'Reminders', 
                              headerStyle: {backgroundColor: '#9363db'},
                              header: ({ scene, previous, navigation }) => {
                                const { options } = scene.descriptor;
                                const title = options.title;
                                return (
                                 <View style={{backgroundColor:"#9363db",width:"100%",height:80,flexDirection:"column"}}>
                                          <View style={{position:"absolute",top:40,marginLeft:10}}>
                                              <Text style={{color:"black",fontSize:20}}>Reminders</Text>
                                          </View>
                                 </View>
                                );
                              }
                            }}/>
            <Stack.Screen name='Remainders' component={Remainders} 
                        options={{
                        title: 'Reminders',
                        headerStyle: {backgroundColor: '#9363db'},
                        header: ({ scene, previous, navigation }) => {
                            const { options } = scene.descriptor;
                            const title = options.title;
                          
                            return (
                             <View style={{backgroundColor:"#9363db",width:"100%",height:80,flexDirection:"column"}}>
                                      <View style={{position:"absolute",top:40,marginLeft:10}}>
                                          <Text style={{color:"black",fontSize:20}}>Reminders</Text>
                                      </View>
                                      <View style={{position:"absolute",top:45,left:ninetyPercentScreenWidth}}>
                                          <TouchableOpacity onPress={() => navigation.navigate("Login")} >
                                                        <Text style={{color:"#4d3a27",fontWeight:"bold"}}>LOG OUT</Text>
                                           </TouchableOpacity>
                                      </View>
                             </View>
                            );
                          }
                        }}
                          />
            <Stack.Screen name='AddRemainder' component={AddRemainders} 
                        options={{
                        title: 'Reminders',
                        headerStyle: {backgroundColor: '#9363db'},
                        header: ({ scene, previous, navigation }) => {
                            const { options } = scene.descriptor;
                            const title = options.title;
                          
                            return (
                             <View style={{backgroundColor:"#9363db",width:"100%",height:80,flexDirection:"column"}}>
                                      <View style={{position:"absolute",top:40,marginLeft:10}}>
                                          <Text style={{color:"black",fontSize:20}}>Reminders</Text>
                                      </View>
                                      <View style={{position:"absolute",top:45,left:ninetyPercentScreenWidth}}>
                                          <TouchableOpacity onPress={() => navigation.navigate("Login")} >
                                                        <Text style={{color:"#4d3a27",fontWeight:"bold"}}>LOG OUT</Text>
                                           </TouchableOpacity>
                                      </View>
                             </View>
                            );
                          }
                        }}
                          />
          <Stack.Screen name='UpdateRemainder' component={UpdateRemainder} 
                        options={{
                        title: 'Reminders',
                        headerStyle: {backgroundColor: '#9363db'},
                        header: ({ scene, previous, navigation }) => {
                            const { options } = scene.descriptor;
                            const title = options.title;
                          
                            return (
                             <View style={{backgroundColor:"#9363db",width:"100%",height:80,flexDirection:"column"}}>
                                      <View style={{position:"absolute",top:40,marginLeft:10}}>
                                          <Text style={{color:"black",fontSize:20}}>Reminders</Text>
                                      </View>
                                      <View style={{position:"absolute",top:45,left:ninetyPercentScreenWidth}}>
                                          <TouchableOpacity onPress={() => navigation.navigate("Login")} >
                                                        <Text style={{color:"#4d3a27",fontWeight:"bold"}}>LOG OUT</Text>
                                           </TouchableOpacity>
                                      </View>
                             </View>
                            );
                          }
                        }}
                          />
            
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default  ApplicationNavigation