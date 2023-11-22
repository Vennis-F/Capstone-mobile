import React, { useEffect, useState } from "react";
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
import { Course, GetCoursesBySearchRequest, OrderType, SortFieldCourse } from "../apis/courses/types";
import { getCoursesBySearch } from "../apis/courses/api";

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
          {item.author}
        </Text>
        <Text style={[styles.provider, { color: textColor }]}>
          {item.level}
        </Text>
        <Text style={[styles.provider, { color: textColor }]}>
          <Icon style={styles.iconS} name="star" size={15} />
          &nbsp;
          {item.ratedStar}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

const MostPopular = () => {
  const [selectedId, setSelectedId] = useState();
  const [listCourses, setListCourses] = useState<Course[]>([])

  const getCourse = async () => {
    const bodyRequest: GetCoursesBySearchRequest = {
      categories:[],
      levels: [],
      search: "",
      sortField:SortFieldCourse.PUBLISHED_DATE,
      pageOptions: {
        order: OrderType.DESC,
        page: 1,
        take: 4,
      },
    }
    const dataResponse = await getCoursesBySearch(bodyRequest)
    console.log("[screen=EditScreenInfor] ", dataResponse)
    setListCourses([...dataResponse.data])
  }

  useEffect(()=>{
    getCourse()
  },[])

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
        data={listCourses}
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

export default MostPopular;
