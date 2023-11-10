import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Courses = [
  {
    id: "1",
    title: "Google Data Science",
    provider: "Google",
    level: "Beginner",
    rating: "4.1(21k)",
  },
  {
    id: "2",
    title: "Google Data Analytics",
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
        <View>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: "https://reactnative.dev/img/tiny_logo.png",
            }}
          />
        </View>
        <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
        <Text style={[styles.provider, { color: textColor }]}>
          {item.provider}
        </Text>
        <Text style={[styles.provider, { color: textColor }]}>
          {item.level}
        </Text>
        <Text style={[styles.provider, { color: textColor }]}>
          <Icon style={styles.iconS} name="star" size={15} />
          &nbsp;
          {item.rating}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

const TopSale = () => {
  const [selectedId, setSelectedId] = useState();

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#fff" : "#fff";
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
    <SafeAreaView style={styles.container}>
      <FlatList
        horizontal
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
  },
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },

  little: {
    flexDirection: "column",
  },
  tinyLogo: {
    width: 190,
    height: 120,
    borderRadius: 15,
  },
  iconS: {
    backgroundColor: "#CADACE",
  },
});

export default TopSale;
