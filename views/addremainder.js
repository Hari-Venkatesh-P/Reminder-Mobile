import React, { useState ,useEffect} from 'react';
import { TextInput, Text, View,Picker, BackHandler, Button,TouchableHighlight,Alert, AsyncStorage} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import Textarea from 'react-native-textarea';
import { ScrollView } from 'react-native-gesture-handler';
import axios from "axios";

import styles from '../styles/AddRemainder';

function AddRemainder(props) {

    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [date,setDate] = useState(new Date())
    const [priority,setPriority] = useState('average')

    const [dateModalVisility,setDateModalVisiblity] = useState(false)
    const [dateModalDisplayed,setDateModalDisplayed] = useState(false)

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
        try {
            if(title==='' || description===''){
                customAlert("Warning","Kindly fill all details",false)
               }else{
                AsyncStorage.getItem("asyncStorageData",(err,asyncStorageData)=>{
                    if(err){
                        console.log(err,"Error")
                    }else{
                          var reqBody = {
                              userId:JSON.parse(asyncStorageData).userId,
                              title : title,
                              description : description,
                              date : date,
                              priority : priority,
                          }
                          console.log("Doing Axios hit ADD_REMAINDERS")  
                          axios.post("https://remainders-backend.herokuapp.com/remainder",reqBody).then((response)=>{
                            if(response.data.success){
                              console.log(response.data.message)
                              customAlert("Success",response.data.message,true)
                              setTitle('')
                              setDescription('')
                              setDate(new Date())
                              setPriority('average')
                              props.navigation.push("Remainders")
                            }else{
                              customAlert("Warning",response.data.message,false)
                              console.log("Warning",response.data.message)
                            } 
                          })
                        }
                     })
           }
         }catch (error) {
               
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
                            <TouchableHighlight style={{backgroundColor: "#9363db", borderRadius: 20,padding: 10,elevation: 2,width:110,height:40  }} onPress={() => { showDatepicker()}}>
                                <View>
                                    {
                                        dateModalDisplayed === false && <Text style={styles.textStyle}>Click Here</Text>
                                    }
                                    {
                                        dateModalDisplayed === true && <Text style={styles.textStyle}>{date.getDate()+"-"}{(date.getMonth()+1)+"-"}{date.getFullYear()+" "}</Text>
                                    }
                                </View> 
                            </TouchableHighlight>
                            { 
                                dateModalVisility===true && (<DateTimePicker testID="dateTimePicker" display="calendar" value={date} mode="date" minimumDate={new Date()} onChange={(event, selectedDate)=>{onChange(event, selectedDate)}}/>)
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

export default AddRemainder;