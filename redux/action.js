import axios from "axios";
import {AsyncStorage} from "react-native";

import { FETCH_REMAINDERS , DELETE_REMAINDER , UPDATE_REMAINDER} from './constants';


import { Alert } from 'react-native';

function customAlert(alerttitle,alertdescription,cancellablestatus){
    Alert.alert(
        alerttitle,
        alertdescription,
        [
          { text: "Ok" }
        ],
        { cancelable:cancellablestatus }
      );
}


export const fetchRemainders = ( ) => dispatch => {
    try {
        AsyncStorage.getItem("asyncStorageData",(err,asyncStorageData)=>{
            if(err){
                console.log(err,"Error")
            }else{
                  console.log(JSON.parse(asyncStorageData).userId,"  FETCH_REMAINDERS   Async storage user id")
                  console.log("Doing Axios hit")  
                  axios.get("https://remainders-backend.herokuapp.com/remainder/"+JSON.parse(asyncStorageData).userId+"").then((response)=>{
                      if(response.data.success){
                        console.log("Axios hit success") 
                          dispatch({
                              type: FETCH_REMAINDERS,
                              payload: response.data.message.remainders,
                          })
                        //   console.log(response.data.message.remainders , "In Action File")
                      }
                  })
                  .catch((error)=>{console.log("Error when fetching data using axios  FETCH_REMAINDERS :     "+error)})
            }
          })
    } catch (e) {
      console.log('ERROR during fetchRemainders    FETCH_REMAINDERS :     '+e)
    }
}

export const deleteRemainder = (remainderId ) => dispatch => {
    try {
        AsyncStorage.getItem("asyncStorageData",(err,asyncStorageData)=>{
            if(err){
                console.log(err,"Error while getting Async Storage DELETE_REMAINDER")
            }else{
                  axios.delete("https://remainders-backend.herokuapp.com/remainder",{data: {userId: JSON.parse(asyncStorageData).userId,remainderId:remainderId}}).then((response)=>{
                      if(response.data.success){
                        console.log("Axios hit success") 
                          dispatch({
                              type: DELETE_REMAINDER,
                              payload: remainderId,
                          })
                      }
                  })
                  .catch((error)=>{console.log("Error when fetching data using axios  DELETE_REMAINDER:     "+error)})
            }
          })
    } catch (e) {
      console.log('ERROR during deleteRemainder   :     '+e)
    }
}


export const updateRemainder = (data) => dispatch => {
  try {
    console.log("Before AsyncStorage")
      AsyncStorage.getItem("asyncStorageData",(err,asyncStorageData)=>{
          if(err){
              console.log(err,"Error while getting Async Storage UPDATE_REMAINDER")
          }else{
            console.log("Before Json")
            reqBody = {
              userId : JSON.parse(asyncStorageData).userId,
              title : data.title,
              description : data.description,
              priority : data.priority,
              date : data.date,
              remainderId: data.remainderId,
            }
            console.log(reqBody , "Req Body")
                axios.put("https://remainders-backend.herokuapp.com/remainder/",reqBody).then((response)=>{
                  if(response.data.success){
                    console.log(response.data.message)
                    customAlert("Success",response.data.message,true)
                  }else{
                    customAlert("Warning",response.data.message,false)
                    console.log("Warning",response.data.message)
                  } 
                })
                .catch((error)=>{console.log("Error when fetching data using axios  UPDATE_REMAINDER : "+error)})
                console.log("After Axios")
          }
        })
  } catch (e) {
    console.log('ERROR during updateRemainder   :     '+e)
  }
}


export const addRemainder = ( data) => dispatch => {
  try {
      AsyncStorage.getItem("asyncStorageData",(err,asyncStorageData)=>{
          if(err){
              console.log(err,"Error")
          }else{
                reqBody = {
                    userId:JSON.parse(asyncStorageData).userId,
                    title:data.title,
                    description:data.description,
                    date:data.date,
                    priority:data.priority
                }
                console.log("Doing Axios hit ADD_REMAINDERS")  
                axios.post("https://remainders-backend.herokuapp.com/remainder",reqBody).then((response)=>{
                  if(response.data.success){
                    console.log(response.data.message)
                    customAlert("Success",response.data.message,true)
                  }else{
                    customAlert("Warning",response.data.message,false)
                    console.log("Warning",response.data.message)
                  } 
                })
              }
           })
    }catch (e) {
              console.log('ERROR during  ADD_REMAINDERS :     '+e)
    }
}
