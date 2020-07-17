import React, { useEffect } from "react";
import { Text, View, StyleSheet, ActivityIndicator, Alert } from "react-native";

const BackButton = () => {

  useEffect(()=>{
    console.log("Back Button Called")
  })

  return (
    <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator />
    <ActivityIndicator size="large" />
    <ActivityIndicator size="small" color="#0000ff" />
    <ActivityIndicator size="large" color="#00ff00" />
  </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default BackButton;
