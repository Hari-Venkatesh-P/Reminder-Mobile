import React, { useState ,useEffect} from 'react';
import { TextInput, Text, View,Picker, Dimensions, Button,TouchableHighlight,Alert, AsyncStorage} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import Textarea from 'react-native-textarea';
import axios from "axios"

import styles from '../styles/AddRemainder';
import { ScrollView } from 'react-native-gesture-handler';

export default function AddRemainder(props) {

    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [date,setDate] = useState(new Date())
    const [priority,setPriority] = useState('average')
    const [userId,setUserId] = useState('')


    const [dateModalVisility,setDateModalVisiblity] = useState(false)
    const [dateModalDisplayed,setDateModalDisplayed] = useState(false)
    const [token,setToken] = useState('')

    async function readDataFromAsyncStorage(props){
        try {
          const asyncStorageData = await AsyncStorage.getItem("asyncStorageData")
          if (asyncStorageData !== null) {
            setUserId((JSON.parse(asyncStorageData).userId))
            setToken(JSON.parse(asyncStorageData).token)
          }
        } catch (e) {
          console.log('Failed to fetch the data from async storage')
        }
    }

    useEffect(() => {
        
        readDataFromAsyncStorage().then((err,tokens)=>{
            if(err){
                console.log('Error while readDataFromAsyncStorage')
            }
        })
      }, []);

    const onChange = (event, selectedDate) => {
        setDateModalVisiblity(false)
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setDateModalDisplayed(true)
    };

    const showDatepicker = () => {
        setDateModalVisiblity(true)
    };

    const customAlert = (alerttitle,alertdescription,cancellablestatus) => {
        Alert.alert(
            alerttitle,
            alertdescription,
            [
              { text: "Ok" }
            ],
            { cancelable:cancellablestatus }
          );
    }

    const addRemainder = () => {
        console.log("Add Remainder")
       if(title==='' || description===''){
        customAlert("Warning","Kindly fill all details",false)
       }else{
        var reqBody = {
            userId : "5f0d33a12ad81300170969c7",
            title : title,
            description : description,
            date : date,
            priority : priority,
        }
        console.log(reqBody)
        axios.post("https://remainders-backend.herokuapp.com/remainder",reqBody).then((response)=>{
            if(response.data.success){
                customAlert("Success",response.data.message,true)
                console.log(response.data.message)
                props.navigation.push("Remainders")
                setDateModalDisplayed(false)
                setTitle('')
                setDescription('')
                setDate(new Date())
                setPriority('average')
                console.log("After Adding")
            }else{
                customAlert("Warning",response.data.message,true)
                console.log("Warning",response.data.message)
            } 
        })
        .catch((error)=>{console.log(error)})
       }
    }

    return (
            <View style={styles.centeredContainer}>
                <ScrollView >
                    <View  style={styles.formContainer}>
                        <View >
                            <Text>Title</Text>
                            <TextInput style={styles.textInputContainer}  value={title} onChangeText={(value)=>{setTitle(value)}} placeholder="Name" />
                        </View>
                        <View >
                            <Text>Description</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Textarea containerStyle={styles.textareaContainer} style={styles.textarea} 
                                    value={description}
                                    maxLength={100}
                                    onChangeText={(value)=>{setDescription(value)}}
                                    placeholder={'Description here'}
                                    underlineColorAndroid={'transparent'}
                                    />
                                </View>
                        </View>
                        <View >
                            <Text>Enter the Department : </Text>
                            <Picker selectedValue={priority} style={{ height: 50, width: 250,borderColor:'#777',borderWidth:1,fontWeight:100}}  
                                                            onValueChange={(itemValue, itemIndex) => setPriority(itemValue)} >
                                <Picker.Item label="High Priority" value="high" />
                                <Picker.Item label="Average Priority" value="average" />
                                <Picker.Item label="Low Priority" value="low" />
                            </Picker>
                        </View>
                        <View style={{alignItems:"center",flexDirection:"row",justifyContent:"space-between"}}>
                            <Text>Select Date :</Text>
                            <TouchableHighlight style={{backgroundColor: "#9363db", borderRadius: 20,padding: 10,elevation: 2,width:100,height:40  }} onPress={() => { showDatepicker()}}>
                                <View>
                                    {
                                        dateModalDisplayed === false && <Text style={styles.textStyle}>Click Here</Text>
                                    }
                                    {
                                        dateModalDisplayed === true && <Text style={styles.textStyle}>{date.getDate()+"-"}{date.getMonth()+"-"}{date.getFullYear()+" "}</Text>
                                    }
                                </View> 
                            </TouchableHighlight>
                            { 
                                dateModalVisility===true && (<DateTimePicker testID="dateTimePicker" value={date} mode="date" onChange={(event, selectedDate)=>{onChange(event, selectedDate)}}/>)
                            }
                        </View>
                    </View>
                    <View style={{alignSelf:"center"}}>
                        <Button title='Add Remainder' color='#9363db' onPress={()=>{addRemainder()}}/>
                    </View>
                </ScrollView>
            </View>
      );
}
