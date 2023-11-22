import React, { useEffect, useState } from "react";
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
import { useNavigation } from "@react-navigation/native";

import Icon from "react-native-vector-icons/FontAwesome";
import { Course, GetCoursesBySearchRequest, OrderType, SortCourseBy, SortFieldCourse } from "../apis/courses/types";
import { getCoursesBySearch } from "../apis/courses/api";

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, { backgroundColor }]}
  >
    <View style={styles.little}>
      <View>
        <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
        <Text style={[styles.provider, { color: textColor }]}>
          {item.author}
        </Text>
        <Text style={[styles.provider, { color: textColor }]}>
          {item.level}
        </Text>
        <Text style={[styles.provider, { color: textColor }]}>
          <Icon name="star" size={15} />
          &nbsp;
          {item.ratedStar}
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

const Careers = () => {
  const [selectedId, setSelectedId] = useState();
  const [listCourses, setListCourses] = useState<Course[]>([])
  const navigation = useNavigation();
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
    setListCourses([...dataResponse.data])
  }

  useEffect(()=>{
    getCourse()
  },[])

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#050514" : "#CECADA";
    const color = item.id === selectedId ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id)
          navigation.navigate('eight',{id:item.id});
        }}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
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
    // height: 270,
  },
  item: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 15,
  },
  title: {
    fontSize: 15,
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
    width: 60,
    height: 70,
  },
});

export default Careers;
