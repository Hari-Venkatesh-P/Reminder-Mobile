import React, { useState ,useEffect} from 'react';
import { TextInput, Text, View,Picker, Button,TouchableHighlight,Alert,AsyncStorage} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import Textarea from 'react-native-textarea';
import axios from "axios";
import { ScrollView } from 'react-native-gesture-handler';

import styles from '../styles/UpdateReaminderStyle';

function UpdateRemainder(props) {
    const [title,setTitle] = useState(props.route.params.data.title)
    const [description,setDescription] = useState(props.route.params.data.description)
    const [date,setDate] = useState(new Date(props.route.params.data.date))
    const [priority,setPriority] = useState(props.route.params.data.priority)

    const [dateModalVisility,setDateModalVisiblity] = useState(false)

    const onChange = (event, selectedDate) => {
        setDateModalVisiblity(false)
        const currentDate = selectedDate || date;
        setDate(currentDate);
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

    const updateRemainderButtonPressed = () => {
        console.log("update Remainder")
        try {
            if(title==='' || description===''){
                customAlert("Warning","Kindly fill all details",false)
               }else{
                AsyncStorage.getItem("asyncStorageData",(err,asyncStorageData)=>{
                    if(err){
                        console.log(err,"Error while getting Async Storage UPDATE_REMAINDER")
                    }else{
                      console.log("Before Json")
                      var reqBody = {
                        userId : JSON.parse(asyncStorageData).userId,
                        title : title,
                        description : description,
                        priority : priority,
                        date :date,
                        remainderId: props.route.params.data.remainderId,
                      }
                          axios.put("https://remainders-backend.herokuapp.com/remainder/",reqBody).then((response)=>{
                            if(response.data.success){
                              console.log(response.data.message)
                              customAlert("Success",response.data.message,true)
                              props.navigation.push('Remainders')
                            }else{
                              customAlert("Warning",response.data.message,false)
                              console.log("Warning",response.data.message)
                            } 
                          })
                          .catch((error)=>{console.log("Error when fetching data using axios  UPDATE_REMAINDER : "+error)})
                          console.log("After Axios")
                    }
                  })
               }
        } catch (error) {
            
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
                                        <Text style={styles.textStyle}>{date.getDate()+"-"}{(date.getMonth()+1)+"-"}{date.getFullYear()+" "}</Text>
                                </View> 
                            </TouchableHighlight>
                            { 
                                dateModalVisility===true && (<DateTimePicker testID="dateTimePicker" display="spinner" value={date} mode="date" minimumDate={new Date()} onChange={(event, selectedDate)=>{onChange(event, selectedDate)}}/>)
                            }
                        </View>
                    </View>
                    <View style={{alignSelf:"center"}}>
                        <Button title='UPDATE REMAINDER' color='#9363db' onPress={()=>{updateRemainderButtonPressed()}}/>
                    </View>
                </ScrollView>
            </View>
      );
}


export default UpdateRemainder;