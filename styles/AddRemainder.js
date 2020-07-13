import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  centeredContainer: { 
       flex:1,
      justifyContent: "center",
      alignItems: "center",
      flexDirection:"row"
    },
    textInputContainer: {
      borderWidth:1,
      padding:8,
      marginTop:10,
      marginBottom:10,
      width:250,
      height:40,
      borderColor:'#777',
  },
  formContainer:{
      padding:30, 
      margin:30,
      borderColor:'#9363db',
      borderWidth: 2,
  },
  textareaContainer: {
    padding:8,
    marginTop:10,
    width:250,
    marginBottom:10,
    height: 100,
    borderColor:'#777',
    borderWidth:1,
    // backgroundColor: '#F5FCFF',
  },
  textarea: {
    textAlignVertical: 'top',  // hack android
    height: 170,
    fontSize: 14,
    color: '#333',
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },

  });


  export default styles;