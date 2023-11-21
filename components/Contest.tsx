import React, { useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";


export default function Contest ({ path }: { path: string }) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: 'https://pos.nvncdn.net/822bfa-13829/art/artCT/20210117_Knqxbzv91l7vEEOHigh09Yqd.jpg' }}
          style={styles.image}
        />
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Vẽ Chân dung người mẹ của em</Text>
          <Text style={styles.textSub}>10 phút | 5-10 tuổi</Text>
        </View>
      </View>
    );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 400,
    resizeMode: 'cover',// Có thể điều chỉnh theo yêu cầu
    marginBottom:200,
    borderRadius:20,
    
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#fff", 
    // padding: 10,
    marginTop:300,
    marginLeft:13,
    padding:10,
    borderRadius:10,
    height:100,
    width:270,
    justifyContent: 'center',
   
    
  },
  overlayText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textSub:{
    color:"#A9A9A9"
  }
});