import React, { useState ,useEffect ,setState } from 'react';
import { connect } from "react-redux";
import SnackBar from 'react-native-snackbar-component'
import  {fetchRemainders ,deleteRemainder }  from '../redux/action';
import { Modal, TextInput, Text, TouchableHighlight, View, Alert, ScrollView,Dimensions} from "react-native";
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'

import styles from '../styles/ViewRemainderStyles';

const screenHeight = Math.round(Dimensions.get('window').height);

const noRemainderHeight = screenHeight -  ((90/100)*screenHeight)

function Remainders(props) {

  // console.log(props)
  useEffect(() => {
    props.fetchRemaindersList();
  }, []);

  const displayRemainderCards = () => {
    // console.log("Called displayRemainderCards")
    // console.log(props.remainderList,"     Props Reaminder List")
    if(props.remainderList.length===0){
      return(
        <View style={{flexDirection:"column",marginTop:noRemainderHeight}}>
              <Text style={{color:"black",fontSize:20,alignSelf:"center"}}>No Remainders yet.</Text>
        </View> 
      )
    }else{
      return props.remainderList.reverse().map(currentremainder => {
        return(
          <View key={currentremainder._id}>
              <Card style={{backgroundColor:"#e6c0ed",marginLeft:10,marginRight:10,marginTop:10}} >
                  <CardTitle title={currentremainder.title.toString().toUpperCase()} subtitle={currentremainder.description} />
                  <View style={{flexDirection:"row"}}>
                    <TouchableHighlight style={ (currentremainder.priority==='high' ? styles.highpriority : (currentremainder.priority==="average"  ? styles.averagepriority : styles.lowpriority)) }>
                        <Text style={{color:"white"}}>{"Priority "+(currentremainder.priority).toString().toUpperCase()}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={{flexDirection:"row",alignItems:"center",alignSelf:"center",justifyContent:"center",backgroundColor: "#9363db", borderRadius: 20,padding: 10,elevation: 2,width:100,height:30,marginRight:10,marginLeft:10 ,marginBottom:10  }}>
                        <Text style={{color:"white"}}>{new Date(currentremainder.date).getDay() +"/" +new Date(currentremainder.date).getMonth() +"/"+new Date(currentremainder.date).getFullYear()}</Text>
                    </TouchableHighlight>
                  </View>
                  <CardAction  separator={true} inColumn={false}>
                    <CardButton onPress={() => {}} title="UPDATE" color="blue"/>
                    <CardButton  onPress={() => {props.deleteRemainderFromRemainderList(currentremainder._id)}} title="DELETE" color="blue" />
                  </CardAction>
                </Card>
            </View> 
        )
      })
    }
  }

  return (
        <View style={{...styles.main,}}>
          <View style={{...styles.remaindercontainer}}>
            <ScrollView>  
              {displayRemainderCards()}
            </ScrollView>
          </View>
          <View style={{...styles.snackbarcontainer}}>
            <SnackBar visible={true} textMessage="Add a Remainder" actionText="ADD" actionHandler={()=>{props.navigation.navigate('AddRemainder')}}   />
          </View>
        </View>
      );
}

const mapStateToProps = (state) => {
  return {
      remainderList: state.fetchRemaindersReducer.remainders
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchRemaindersList: () => dispatch(fetchRemainders()),
  deleteRemainderFromRemainderList: (id) => dispatch(deleteRemainder(id)),
});

export default connect (mapStateToProps, mapDispatchToProps) (Remainders);