import React, { useEffect  , useState} from 'react';
import { connect } from "react-redux";
import SnackBar from 'react-native-snackbar-component'
import  {fetchRemainders ,deleteRemainder }  from '../redux/action';
import {  Text, TouchableHighlight, View, ScrollView,Dimensions} from "react-native";
import { Card, CardTitle, CardAction, CardButton } from 'react-native-material-cards'

import styles from '../styles/ViewRemainderStyles';

const screenHeight = Math.round(Dimensions.get('window').height);
const noRemainderHeight = screenHeight -  ((90/100)*screenHeight)

function Remainders(props) {
  

  const [addButtonClicked,setAddButtonClicked] = useState(false)
  const [fetchedFlag,setFetchedFlag] = useState(false)

  useEffect(() => {
    props.fetchRemaindersList();
  }, []);

  const displayRemainderCards = () => {
    if(fetchedFlag===true){
      if(props.remainderList.length===0 ){
        return(
          <View style={{flexDirection:"column",marginTop:noRemainderHeight}}>
                <Text style={{color:"#d14343",fontSize:20,alignSelf:"center"}}>No Remainders yet.</Text>
          </View> 
        )
      }else{
        return props.remainderList.map(currentremainder => {
          return(
            <View key={currentremainder._id}>
                <Card style={{backgroundColor:"#e6c0ed",marginLeft:10,marginRight:10,marginTop:10}} >
                    <CardTitle title={currentremainder.title.toString().toUpperCase()} titleStyle={{fontFamily:"RobotoSlab-Regular",fontSize:18}}subtitle={currentremainder.description}/>
                    <View style={{flexDirection:"row"}}>
                      <TouchableHighlight style={ (currentremainder.priority==='high' ? styles.highpriority : (currentremainder.priority==="average"  ? styles.averagepriority : styles.lowpriority)) }>
                          <Text style={{color:"white"}}>{"Priority "+(currentremainder.priority).toString().toUpperCase()}</Text>
                      </TouchableHighlight>
                      <TouchableHighlight style={{flexDirection:"row",alignItems:"center",alignSelf:"center",justifyContent:"center",backgroundColor: "#9363db", borderRadius: 20,padding: 10,elevation: 2,width:120,height:30,marginRight:10,marginLeft:10 ,marginBottom:10  }}>
                          <Text style={{color:"white"}}>{new Date(currentremainder.date).getDate() +"/" + ((new Date(currentremainder.date).getMonth())+1) +"/"+new Date(currentremainder.date).getFullYear()}</Text>
                      </TouchableHighlight>
                    </View>
                    <CardAction  separator={true} inColumn={false}>
                      <CardButton onPress={() => {
                                                        props.navigation.push('UpdateRemainder', {
                                                        data: {
                                                            remainderId:currentremainder._id,
                                                            title:currentremainder.title,
                                                            description:currentremainder.description,
                                                            date:currentremainder.date,
                                                            priority:currentremainder.priority
                                                              }, })}} title="UPDATE" color="blue"/>
                      <CardButton  onPress={() => {props.deleteRemainderFromRemainderList(currentremainder._id)}} title="COMPLETED" color="blue" />
                    </CardAction>
                  </Card>
              </View> 
          )
        })
      }
    }
    setFetchedFlag(true)
    return(
        <View style={{flexDirection:"column",marginTop:noRemainderHeight}}>
              <Text style={{color:"black",fontSize:20,alignSelf:"center"}}>Fetching your reminders</Text>
        </View> 
    )
  }

  return (
        <View style={{...styles.main,}}>
          <View style={{...styles.remaindercontainer}}>
            <ScrollView>  
              {displayRemainderCards()}
            </ScrollView>
          </View>
          <View style={{...styles.snackbarcontainer}}>
            <SnackBar visible={true} textMessage="New reminder ?" actionText="ADD" actionHandler={()=>{
              if(addButtonClicked === false){
                console.log("Add Butoon CLicked")
                setAddButtonClicked(true)
                props.navigation.push('AddRemainder')
                setAddButtonClicked(false)
              } }}   />
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