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
import Icon from "react-native-vector-icons/FontAwesome";
import ProgressBar from "./ProgressBar";
import { getLearnersByUser } from "../apis/learner/api";
import { LearnerFilterResponse } from "../apis/learner/types";

const Courses = [
  {
    id: "1",
    title: "Lộc",
    provider: "Google",
    level: "Beginner",
    percent: "25",
  },
  {
    id: "2",
    title: "Anh",
    provider: "Google",
    level: "Beginner",
    percent: "50",
  },
  {
    id: "3",
    title: "Thọ",
    provider: "Google",
    level: "Beginner",
    percent: "80",
  },
];
const AdditionalCourses = [
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
    <Text style={styles.child} >{item.title}</Text>
  </View>

);

export default function MyChild({ path }: { path: string }) {
  const [selectedId, setSelectedId] = useState();
  const [learners, setLearners] = useState<LearnerFilterResponse[]>([])

  const handleGetLearners = async () => {
    const learnersFilterResponse = await getLearnersByUser()
    setLearners(learnersFilterResponse)
  }

  useEffect(() => {
    handleGetLearners()
  }, [])

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

  const renderCourseItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#ECECEC" : "#ECECEC";
    const color = item.id === selectedId ? "black" : "black";

    return (
      <TouchableOpacity
        onPress={() => setSelectedId(item.id)}
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
          <View style={{ marginTop: 5, width: 245 }}>
            <Text style={[styles.title]}>{item.title}</Text>
            <Text style={[styles.provider]}>
              {item.provider}
            </Text>
            <View style={styles.container}>
              <ProgressBar percent={item.percent} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "flex-start", marginTop: 10 }}>
        {/* First FlatList */}
        <FlatList
          data={learners}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
        {/* Second FlatList */}
        <FlatList
          data={AdditionalCourses}
          renderItem={renderCourseItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  child: {

    fontWeight: "600",
    fontSize: 18,
    marginBottom: 120
  },
  container: {
    flex: 1,
    // height: 270,
    width: '100%',


  },
  item: {
    paddingTop: 4,
    paddingLeft: 4,
    paddingRight: 4,
    // marginVertical: 8,
    // marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5
  },
  provider: {
    // color: "#DCDCDE",
    marginBottom: 5
  },
  little: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 5
  },
  tinyLogo: {
    width: 90,
    height: 100,
    borderRadius: 15,
    marginRight: 15
  },
});


