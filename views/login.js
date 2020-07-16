import React, { useState ,useEffect} from 'react';
import { View, Text, TextInput ,Button,TouchableOpacity,ScrollView,Alert,AsyncStorage,BackHandler  } from 'react-native';
import axios from "axios";

import styles from '../styles/Styles';

export default function Login(props ){
  const[toggleFlag,setToggleFlag] = useState(true)
  const[newUserName,setNewUserName] = useState('')
  const[newUserEmail,setNewUserEmail] = useState('')
  const[newUserPassword,setNewUserPassword] = useState('')
  const[userName,setUserName] = useState('')
  const[userPassword,setUserPassword] = useState('')
  const[loginButtonPress,setLoginButtonPressed] = useState(false)
  const[createUserButtonPress,setCreateUserButtonPressed] = useState(false)

  useEffect(() => {
    const backAction = () => {
      console.log("In use effect return Login")
      Alert.alert("Hold on!", "Are you sure you want to exit Reminders ?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => {console.log("In use effect return Login");backHandler.remove()};
    }, []);


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
                    console.log(response.data)
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
  const saveDataToAsyncStorage =  (asyncStorageData) => {
    try {
      AsyncStorage.setItem("asyncStorageData", JSON.stringify(asyncStorageData))
      console.log("Async Storage successful")
    } catch (e) {
      console.log('Failed to save the data to the storage')
    }
  }

  const loginUser = async () =>{
    console.log("Login Clicked" , loginButtonPress.toString())

      if(userName==='' || userPassword==='' ){
        customAlert("Warning","Kindly fill all the details",true)
      }else{
            setLoginButtonPressed(true)
            var reqBody = {
                userName : userName,
                password : userPassword
            }
            axios.post("https://remainders-backend.herokuapp.com/user/login",reqBody).then((response)=>{
                if(response.data.success){
                    customAlert("Success",response.data.message,false)
                    setUserName('')
                    setUserPassword('')
                    console.log(response.data)
                    const asyncStorageData = {
                      userId : response.data.userId,
                      token : response.data.jwttoken
                    }
                    saveDataToAsyncStorage(asyncStorageData)
                    props.navigation.navigate('Remainders')
                }else{
                    customAlert(response.data.message,false)
                    console.log("Warning",response.data.message)
                } 
            })
            .catch((error)=>{console.log(error)})
      }
}

  return (
        <View style={styles.centeredContainer}>
            <ScrollView>
                <View style={styles.childContainer}>
                    <View>
                    { toggleFlag===false && 
                        <View >
                            <View style={styles.formContainer}>
                                <View>
                                    <Text>Enter the User Name : </Text>
                                    <TextInput style={styles.textInputContainer} value={userName} onChangeText={(value)=>{setUserName(value)}}  placeholder="User Name" />
                                </View>
                                <View>
                                    <Text>Enter the Password : </Text>
                                    <TextInput style={styles.textInputContainer} secureTextEntry={true}  value={userPassword} onChangeText={(value)=>{setUserPassword(value)}}  placeholder="Password"/>
                                </View>
                                <View style={styles.loginbutton}>
                                    <Button title='Login' color='#9363db' onPress={()=>{loginUser()}}/>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.touchable} onPress={()=>{
                                                                        setToggleFlag(true)
                                                                        setUserName('')
                                                                        setUserPassword('')
                                                                            }}>
                                <Text>Create a new Account ? </Text>
                            </TouchableOpacity>
                        </View>
                    }
                    {toggleFlag===true &&
                        <View >
                            <View style={styles.formContainer}>
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
                                <TextInput style={styles.textInputContainer} secureTextEntry={true}  value={newUserPassword} onChangeText={(value)=>{setNewUserPassword(value)}} placeholder="Password"/>
                            </View>
                            <View style={styles.createuserbutton}>
                                <Button title='CREATE ACCOUNT' color='#9363db' onPress={()=>{createUser()}}/>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.touchable} onPress={()=>{
                                                                            setToggleFlag(false)
                                                                            setNewUserName('')
                                                                            setNewUserEmail('')
                                                                            setNewUserPassword('')
                                                                                }}>
                            <Text>Already created an account ? </Text>
                            </TouchableOpacity>
                        </View>
                    }
                    </View>
                    </View>
            </ScrollView>
        </View>
  );
};