import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CenteredDivider = ({ text }: { text: string }) => (
  <View style={styles.container}>
    <View style={styles.line} />
    <Text style={styles.text}>{text}</Text>
    <View style={styles.line} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12, 
    paddingHorizontal: "12%"
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb', 
  },
  text: {
    paddingHorizontal: 16, 
    fontSize: 14,
    color: '#737373', 
  },
});

export default CenteredDivider;