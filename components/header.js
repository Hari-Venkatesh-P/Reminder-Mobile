import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from '../styles/Styles'

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Remainders</Text>
    </View>
  );
}
