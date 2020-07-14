import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    remaindercontainer :{
        flex: 1,
        alignItems: "flex-start",
        justifyContent: 'center',
        flexDirection: 'row',
        paddingBottom:50
    },
    snackbarcontainer:{
            flex:1,
            width: '100%', 
            height: 50, 
            justifyContent: 'center', 
            alignItems: 'center',
            position: 'absolute',
            bottom: 0
    },
    highpriority:{
        flexDirection:"row",
        alignItems:"center",
        alignSelf:"center",
        justifyContent:"center",
        backgroundColor: "red",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width:150,
        height:30,
        marginRight:10,
        marginLeft:10,
        marginBottom:10 
    },
    lowpriority:{
        flexDirection:"row",
        alignItems:"center",
        alignSelf:"center",
        justifyContent:"center",
        backgroundColor:"lightgreen",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width:150,
        height:30,
        marginRight:10,
        marginLeft:10,
        marginBottom:10 
    },
    averagepriority:{
        flexDirection:"row",
        alignItems:"center",
        alignSelf:"center",
        justifyContent:"center",
        backgroundColor:"yellow",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width:150,
        height:30,
        marginRight:10,
        marginLeft:10,
        marginBottom:10 
    },
    main:
    {
        flex: 2,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
  });


  export default styles;