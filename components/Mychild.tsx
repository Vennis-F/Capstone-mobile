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
import Icon from "react-native-vector-icons/FontAwesome";
import ProgressBar from "./ProgressBar";

const Courses = [
  {
    id: "1",
    title: "Google UX Design ",
    provider: "Google",
    level: "Beginner",
   percent: "25",
  },
  {
    id: "2",
    title: "Font-end Development ",
    provider: "Google",
    level: "Beginner",
   percent: "50",
  },
  {
    id: "3",
    title: "Introduction To UI Design",
    provider: "Google",
    level: "Beginner",
   percent: "80",
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
 
<View>
    <Text style={styles.child} >Child Name {item.id}</Text>

  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, { backgroundColor }]}
  >
    
    <View style={styles.little}>
      <View>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
          }}
        />
      </View>
      <View style={{marginTop:5 ,width:245}}>
        <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
        <Text style={[styles.provider, { color: textColor }]}>
          {item.provider}
        </Text>
        <View style={styles.container}>
            <ProgressBar  percent={item.percent}  />
        </View>
      </View>
    </View>
  </TouchableOpacity>
</View>  
 
);

export default function MyChild ({ path }: { path: string }) {
  const [selectedId, setSelectedId] = useState();

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#ECECEC" : "#ECECEC";
    const color = item.id === selectedId ? "black" : "black";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container} >
      <FlatList
        data={Courses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    child:{
        marginVertical: 3,
        marginHorizontal: 16,
        fontWeight:"600",
        fontSize:18,
    },
    container: {
        flex: 1,
        // height: 270,
       width:'100%',
       
    
      },
      item: {
        paddingTop: 4,
        // paddingBottom: 4,
        paddingLeft: 4,
        paddingRight: 4,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 15,
      },
      title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom:5
      },
      provider: {
        color: "#DCDCDE",
        marginBottom:5
      },
      little: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginBottom:5
      },
      tinyLogo: {
        width: 90,
        height: 100,
        borderRadius:15,
        marginRight:15
      },
});


