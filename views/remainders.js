import React, { useState } from 'react';
import SnackBar from 'react-native-snackbar-component'
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";

// import AddRemainderModal from '../components/addremaindermodal'

export default function Remainders() {

  const [modalVisible, setModalVisible] = useState(false);
  const [addModalFlag,setAddModalFlag] = useState(false)

    return (
        <View>
          <Text>Hello From Remainders</Text>
          <Text>Hello From Remainders</Text>
          <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {Alert.alert("Modal has been closed."); }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Hello World!</Text>
                  <TouchableHighlight style={{ ...styles.openButton, backgroundColor: "#2196F3" }} onPress={() => { setModalVisible(!modalVisible);}}>
                    <Text style={styles.textStyle}>Hide Modal</Text>
                  </TouchableHighlight>
              </View>
            </View>
          </Modal>
          <View>
            <SnackBar visible={true} position="top" textMessage="Add a Remainder" actionHandler={()=>{setModalVisible(true)}} actionText="ADD" />
          </View>
        </View>
      );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width:250,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});