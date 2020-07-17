import React, { useState ,useEffect} from 'react';
import { TextInput, Text, View,Picker, Button,TouchableHighlight,Alert} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import Textarea from 'react-native-textarea';
import { connect } from "react-redux";
import { ScrollView } from 'react-native-gesture-handler';

import styles from '../styles/UpdateReaminderStyle';
import  {updateRemainder }  from '../redux/action';

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
       if(title==='' || description===''){
        customAlert("Warning","Kindly fill all details",false)
       }else{
        var data = {
            title : title,
            description : description,
            date : date,
            priority : priority,
            remainderId:props.route.params.data.remainderId
        }
        props.updateRemainderCard(data)
        props.navigation.push('Remainders')
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
                                dateModalVisility===true && (<DateTimePicker testID="dateTimePicker" value={date} mode="date" onChange={(event, selectedDate)=>{onChange(event, selectedDate)}}/>)
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

const mapDispatchToProps = (dispatch) => ({
    updateRemainderCard: (data) => dispatch(updateRemainder(data)),
});

export default connect (null, mapDispatchToProps) (UpdateRemainder);