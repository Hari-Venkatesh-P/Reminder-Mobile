import { StyleSheet } from 'react-native';


export  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      marginTop:70
    },
    buttonContainer: {
      margin:20
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
    cardContainer: {
      borderWidth:1,
      padding:8,
      marginTop:10,
      marginBottom:10,
      width:250,
      borderColor:'blue',
      backgroundColor:'lightyellow'
    },
    deleteContainer: {
      backgroundColor:"pink",
      fontWeight: 'bold'
    },
    header:{
        backgroundColor:"#9363db",
        width:"100%",
        height:40,
        alignItems:"center"
    },
    headerText:{
        fontWeight: 'bold',
        fontSize:25,
        color:"black"
    },
    baseview: {
        marginTop:28
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
    loginform:{
        marginTop:30,
        marginLeft:30,
        marginRight:30,
        alignItems:"center",
        borderColor:"#9363db",
        padding:30,
        borderWidth:2
    },
    loginbutton:{
      width:100,
      marginTop:10,
    },
    touchable:{
      alignItems: "flex-start",
    },
    createuserbutton:{
        width:200,
        marginTop:10,
      },
      centeredContainer:{
        flex:1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection:"row"
      },
      childContainer:{
        padding:20, 
        margin:10,
      },
      formContainer:{
        padding:20, 
        alignItems: "center",
        borderColor:'#9363db',
        borderWidth: 2,
      },
      loaderstyle:{
        flex: 1,
        justifyContent: "center",
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
      }
  });

  export default styles;