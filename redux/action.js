import axios from "axios";
import {AsyncStorage} from "react-native";

import { FETCH_REMAINDERS , DELETE_REMAINDER} from './constants';

export const fetchRemainders = ( ) => dispatch => {
    try {
        AsyncStorage.getItem("asyncStorageData",(err,asyncStorageData)=>{
            if(err){
                console.log(err,"Error")
            }else{
                  console.log(JSON.parse(asyncStorageData).userId,"     Async storage user id")
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
                  .catch((error)=>{console.log("Error when fetching data using axios  :     "+error)})
            }
          })
    } catch (e) {
      console.log('ERROR during fetchRemainders     :     '+e)
    }
}

export const deleteRemainder = (remainderId ) => dispatch => {
    try {
        AsyncStorage.getItem("asyncStorageData",(err,asyncStorageData)=>{
            if(err){
                console.log(err,"Error while getting Async Storage")
            }else{
                //   console.log(JSON.parse(asyncStorageData).userId,"     Async storage user id")
                //   console.log(remainderId,"     Remainder Id")
                  axios.delete("https://remainders-backend.herokuapp.com/remainder",{data: {userId: JSON.parse(asyncStorageData).userId,remainderId:remainderId}}).then((response)=>{
                      if(response.data.success){
                        console.log("Axios hit success") 
                          dispatch({
                              type: DELETE_REMAINDER,
                              payload: remainderId,
                          })
                      }
                  })
                  .catch((error)=>{console.log("Error when fetching data using axios  :     "+error)})
            }
          })
    } catch (e) {
      console.log('ERROR during deleteRemainder   :     '+e)
    }
}

