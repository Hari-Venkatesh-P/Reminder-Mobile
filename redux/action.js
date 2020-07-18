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
