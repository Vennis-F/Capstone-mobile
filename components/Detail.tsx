import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Course, GetCoursesBySearchRequest, OrderType, SortFieldCourse } from "../apis/courses/types";
import { getCoursesBySearch } from "../apis/courses/api";

const Detail =({}) =>{
 return (
    <SafeAreaView style={{flex:1, backgroundColor:"#fff", width:"100%"}}>
        <ScrollView>
        <View style={styles.header}>
            <Icon name="arrow-back" size={28}  />
            <Icon name="shopping-cart" size={28}  />
        </View>
        <View style={styles.image}> 
          <Image
            style={styles.tinyLogo}
            source={{
              uri: "https://reactnative.dev/img/tiny_logo.png",
            }}
          />
        </View>
        <View style={styles.details}>
            
        </View>
        </ScrollView>
    </SafeAreaView>
 );
};
const styles = StyleSheet.create({
    header:{
        paddingHorizontal:20,
        marginTop:20,
        flexDirection:"row",
        justifyContent:'space-between',
    },
    image:{
    flex:0.45,
    marginTop:20,
    justifyContent:'center',
    alignItems: 'center',
    },
    tinyLogo: {
        width: 400,
        height:250,
        borderRadius: 15,
        resizeMode:"contain",
        flex:1,
    },
    details:{
        flex:0.55,
        backgroundColor:'#F1F1F1',
        marginHorizontal:7,
        marginBottom:7,
        borderRadius:20,
        marginTop:30,
        paddingTop:30,
    }
})
export default Detail