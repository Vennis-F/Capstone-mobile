import React from 'react';
import { View, StyleSheet } from 'react-native';

const DividerCustom = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
});

export default DividerCustom;
