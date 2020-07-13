import { Alert } from 'react-native';

export default function customAlert(props){
    Alert.alert(
        props.alerttitle,
        props.alertdescription,
        [
          { text: "Ok" }
        ],
        { cancelable: props.cancellablestatus }
      );
}