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

const Courses = [
  {
    id: "1",
    title: "Google UX Design ",
    provider: "Google",
    level: "Beginner",
    rating: "4.1(21k)",
  },
  {
    id: "2",
    title: "Font-end Development ",
    provider: "Google",
    level: "Beginner",
    rating: "4.1(21k)",
  },
  {
    id: "3",
    title: "Introduction To UI Design",
    provider: "Google",
    level: "Beginner",
    rating: "4.1(21k)",
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
   
  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, { backgroundColor }]}
  >
    <View style={styles.little}>
      <View>
        <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
        <Text style={[styles.provider, { color: textColor }]}>
          {item.provider}
        </Text>
        <Text style={[styles.provider, { color: textColor }]}>
          {item.level}
        </Text>
        <Text style={[styles.provider, { color: textColor }]}>
          <Icon name="star" size={15} />
          &nbsp;
          {item.rating}
        </Text>
      </View>
      <View>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
          }}
        />
      </View>
    </View>
  </TouchableOpacity>
 
);

export default function MyCourses ({ path }: { path: string }) {
  const [selectedId, setSelectedId] = useState();

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#050514" : "#CECADA";
    const color = item.id === selectedId ? "white" : "black";

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
    container: {
        flex: 1,
        // height: 270,
       width:'100%',
    
      },
      item: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 7,
        paddingRight: 7,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 15,
      },
      title: {
        fontSize: 18,
        fontWeight: "bold",
      },
      provider: {
        color: "#DCDCDE",
      },
      little: {
        flexDirection: "row",
        justifyContent: "space-between",
      },
      tinyLogo: {
        width: 65,
        height: 75,
        borderRadius:15
      },
});


