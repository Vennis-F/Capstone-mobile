import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressBar = ({ percent }) => {
  return (
      <View style={styles.bar}>
        <Text style={styles.percentText}>{`Overall Progress ${percent}%`}</Text>
    <View style={styles.container}>
      <View style={[styles.progressBar, { width: `${percent}%` }]} />
     
      
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
    bar:{
        flexDirection: 'column',
    },
  container: {
    height: 10,
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
   
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#7C7979',
  },
  percentText: {
    // position: 'absolute',
    alignSelf: 'flex-start',
    color: '#000',
    marginBottom:5
  },
});

export default ProgressBar;
