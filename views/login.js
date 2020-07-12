import React, { useState } from 'react';
import { View, Text, TextInput ,Button,TouchableOpacity,ScrollView,Alert } from 'react-native';
import axios from "axios";

import styles from '../styles/Styles';

 const Login = ({ navigation }) =>{
  const[toggleFlag,setToggleFlag] = useState(false)
  const[newUserName,setNewUserName] = useState('')
  const[newUserEmail,setNewUserEmail] = useState('')
  const[newUserPassword,setNewUserPassword] = useState('')
  const[userName,setUserName] = useState('')
  const[userPassword,setUserPassword] = useState('')

  const customAlert = (alerttitle,alertdescription,cancellablestatus) =>{
    Alert.alert(
        alerttitle,
        alertdescription,
        [
          { text: "Ok" }
        ],
        { cancelable: cancellablestatus }
      );
  }

  const createUser = async () =>{
      if(newUserName==='' || newUserEmail==='' || newUserPassword===''){
        customAlert("Warning","Kindly fill all the details",true)
      }else{
          var emailPattern = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+[.]{1}[a-z]{2,3}")
          if(emailPattern.test(newUserEmail)){
            var reqBody = {
                userName : newUserName,
                userEmail : newUserEmail,
                password : newUserPassword
            }
            axios.post("https://remainders-backend.herokuapp.com/user",reqBody).then((response)=>{
                if(response.data.success){
                    customAlert("Success",response.data.message,false)
                    console.log(response.data.message)
                    setNewUserName('')
                    setNewUserEmail('')
                    setNewUserPassword('')
                }else{
                    customAlert(response.data.message,false)
                    console.log("Warning",response.data.message)
                } 
            })
            .catch((error)=>{console.log(error)})
          }else{
            customAlert("Warning","Email format is invalid",true)
          }
      }
  }

  const loginUser = async () =>{
    if(userName==='' || userPassword==='' ){
      customAlert("Warning","Kindly fill all the details",true)
    }else{
          var reqBody = {
              userName : userName,
              password : userPassword
          }
          axios.post("https://remainders-backend.herokuapp.com/user/login",reqBody).then((response)=>{
              if(response.data.success){
                  customAlert("Success",response.data.message,false)
                  console.log(response.data.message)
                  navigation.navigate('Remainders', { name: 'Jane' })
                  setUserName('')
                  setUserPassword('')
              }else{
                  customAlert(response.data.message,false)
                  console.log("Warning",response.data.message)
              } 
          })
          .catch((error)=>{console.log(error)})
    }
}

  return (
    <ScrollView>
        { toggleFlag===false && 
        <View>
                <View style={styles.loginform} >
            <View>
                <Text>Enter the User Name : </Text>
                <TextInput style={styles.textInputContainer} value={userName} onChangeText={(value)=>{setUserName(value)}}  placeholder="User Name" />
            </View>
            <View>
                <Text>Enter the Password : </Text>
                <TextInput style={styles.textInputContainer} value={userPassword} onChangeText={(value)=>{setUserPassword(value)}}  placeholder="Password"/>
            </View>
            <View style={styles.loginbutton}>
                <Button title='Login' color='#9363db' onPress={()=>{loginUser()}}/>
            </View>
        </View>
         <TouchableOpacity style={styles.touchable} onPress={()=>{setToggleFlag(true)}}>
             <Text>Create a new Account ? </Text>
         </TouchableOpacity>
        </View>
        }
        {toggleFlag===true &&
            <View>
                 <View style={styles.loginform} >
            <View>
                <Text>Enter the User Name : </Text>
                <TextInput style={styles.textInputContainer} value={newUserName} onChangeText={(value)=>{setNewUserName(value)}} placeholder="User Name" />
            </View>
            <View>
                <Text>Enter the Email : </Text>
                <TextInput style={styles.textInputContainer} value={newUserEmail} onChangeText={(value)=>{setNewUserEmail(value)}} placeholder="User Email"/>
            </View>
            <View>
                <Text>Enter the New  Password : </Text>
                <TextInput style={styles.textInputContainer} value={newUserPassword} onChangeText={(value)=>{setNewUserPassword(value)}} placeholder="Password"/>
            </View>
            <View style={styles.createuserbutton}>
                <Button title='CREATE ACCOUNT' color='#9363db' onPress={()=>{createUser()}}/>
            </View>
        </View>
        <TouchableOpacity style={styles.touchable} onPress={()=>{setToggleFlag(false)}}>
            <Text>Already created a account ? </Text>
        </TouchableOpacity>
        </View>
        }
    </ScrollView>
  );
}

export default Login;