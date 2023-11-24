import React, { useState, useEffect } from "react";
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
import { CourseFilterResponse, CourseLearnerFilterResponse } from "../apis/courses/types";
import { UserRole, getUserRole } from "../libs/core/handle-token";
import { showErrorAlert } from "../libs/core/handle-show.-mesage";
import { getCourseByCustomer } from "../apis/courses/api";
import { getCourseForLearnerSearchByUser } from "../apis/learner/api";
import { useNavigation } from "@react-navigation/native";

const Item = ({ item, onPress, backgroundColor, textColor }) => {
  const navigation = useNavigation();
  return (<TouchableOpacity
    style={[styles.item, { backgroundColor }]}
    onPress={() => { navigation.navigate('eleven', { id: item.id }) }}

  >
    <View style={styles.little}>
      <View>
        <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
        <Text style={[styles.provider, { color: textColor }]}>
          {item.totalChapter} video
        </Text>
        <Text style={[styles.provider, { color: textColor }]}>
          {item.prepareMaterial}
        </Text>
        {/* <Text style={[styles.provider, { color: textColor }]}>
          {item.thumbnailUrl}
        </Text> */}
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
  )
};

export default function MyCourses({ path }: { path: string }) {
  const [selectedId, setSelectedId] = useState();
  const [courses, setCourses] = useState<CourseLearnerFilterResponse[] | CourseFilterResponse[]>([])


  const getCourses = async () => {
    const userRole = await getUserRole()
    if (!userRole) showErrorAlert('Hãy đăng nhập và tôi sẽ cho trả về khóa học của bạn ạ');

    console.log("[userROle]", userRole)
    if (userRole === UserRole.CUSTOMER) setCourses(await getCourseByCustomer())
    else if (userRole === UserRole.LEARNER)
      setCourses((await getCourseForLearnerSearchByUser('')).data)
  }
  console.log("[courses]", courses)

  useEffect(() => {
    getCourses()
  }, [])
  console.log('[list]', courses)

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
        data={courses}
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
    width: '100%',

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
    borderRadius: 15
  },
});


