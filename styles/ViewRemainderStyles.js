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
            backgroundColor: '#FF9800', 
            justifyContent: 'center', 
            alignItems: 'center',
            position: 'absolute',
            bottom: 0
    },
    main:
    {
        flex: 2,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
  });


  export default styles;