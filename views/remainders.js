import React, { useState } from 'react';
import SnackBar from 'react-native-snackbar-component'
import { Modal, TextInput, Text, TouchableHighlight, View, Dimensions, ScrollView} from "react-native";
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'


import styles from '../styles/ViewRemainderStyles';

export default function Remainders({navigation}) {

  const screenWidth = Math.round(Dimensions.get('window').width);
  const screenHeight = Math.round(Dimensions.get('window').height);
  const remainderViewHeight = screenHeight - (20/100)*screenHeight

  console.log(remainderViewHeight)
    return (
        <View style={{backgroundColor:"yellow",...styles.main}}>
          <View style={{...styles.remaindercontainer}}>
            <ScrollView>  
            <Card>
                <CardTitle title="This is a title" subtitle="This is subtitle" />
                <CardContent text="Your device will reboot in few seconds once successful, be patient meanwhile" />
                <CardAction  separator={true} inColumn={false}>
                  <CardButton onPress={() => {}} title="Push" color="blue"/>
                  <CardButton  onPress={() => {}} title="Later" color="blue" />
                </CardAction>
              </Card>
              <Card>
                <CardTitle title="This is a title" subtitle="This is subtitle" />
                <CardContent text="Your device will reboot in few seconds once successful, be patient meanwhile" />
                <CardAction  separator={true} inColumn={false}>
                  <CardButton onPress={() => {}} title="Push" color="blue"/>
                  <CardButton  onPress={() => {}} title="Later" color="blue" />
                </CardAction>
              </Card>
              <Card>
                <CardTitle title="This is a title" subtitle="This is subtitle" />
                <CardContent text="Your device will reboot in few seconds once successful, be patient meanwhile" />
                <CardAction  separator={true} inColumn={false}>
                  <CardButton onPress={() => {}} title="Push" color="blue"/>
                  <CardButton  onPress={() => {}} title="Later" color="blue" />
                </CardAction>
              </Card>
              <Card>
                <CardTitle title="This is a title" subtitle="This is subtitle" />
                <CardContent text="Your device will reboot in few seconds once successful, be patient meanwhile" />
                <CardAction  separator={true} inColumn={false}>
                  <CardButton onPress={() => {}} title="Push" color="blue"/>
                  <CardButton  onPress={() => {}} title="Later" color="blue" />
                </CardAction>
              </Card>
            </ScrollView>
          </View>
          <View style={{...styles.snackbarcontainer}}>
            <Text>Hello from Sna</Text>
            <SnackBar visible={true} textMessage="Add a Remainder" actionHandler={()=>{navigation.navigate('AddRemainder')}} actionText="ADD" />
          </View>
        </View>
      );
}
