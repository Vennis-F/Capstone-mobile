import React, { useEffect, useState } from 'react';
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
import { useFocusEffect, useRoute } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialIcons";
import { Course, GetCourseDetailResponse, GetCoursesBySearchRequest, OrderType, SortFieldCourse } from "../apis/courses/types";
import { getCourseById, getCoursesBySearch, getCoursesDetailById } from "../apis/courses/api";
import { getAccessToken } from "../libs/core/handle-token";
import { addCartItem } from "../apis/cart/apis";
import { useNavigation } from '@react-navigation/native';
import { getChapterLecturesByCourseId } from "../apis/chapter-lecture/api";
import { ChapterLecture } from "../apis/chapter-lecture/types";
import { formatCurrency } from "../libs/core/handle-price";
import { secondsToMinutesString } from "../libs/core/handle-time";

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.container}>
      <Icon name="live-tv" size={30} style={{ marginRight: 10 }} />
      <Text style={styles.text}>{item.title}</Text>
      <Text style={styles.time}>{secondsToMinutesString(item.totalContentLength)}</Text>
    </View>

  </TouchableOpacity>
);

const Detail = ({ }) => {
  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState();
  const [course, setCourse] = useState<GetCourseDetailResponse>()
  const [chapterLectures, setChapterLectures] = useState<ChapterLecture[]>([])
  const route = useRoute();
  const id = route.params?.id as string;
  console.log("[Detail id]", id)

  const getCourse = async () => {
    const bodyRequest: GetCoursesBySearchRequest = {
      categories: [],
      levels: [],
      search: "",
      sortField: SortFieldCourse.PUBLISHED_DATE,
      pageOptions: {
        order: OrderType.DESC,
        page: 1,
        take: 4,
      },
    }
    const dataResponse = await getCoursesDetailById(id)
    const chapterLecturesRes = await getChapterLecturesByCourseId(id, true)
    setChapterLectures(chapterLecturesRes)
    setCourse(dataResponse)
  }
    ;

  const handleAddCartItem = async () => {
    const token = await getAccessToken()
    if (token) {

      await addCartItem({
        promotionCourseId: null,
        courseId: id,
      })
    } else {
      //   toastWarn({ message: 'Hãy đăng nhập trước khi thêm vào giỏ hàng' })
    }
  }

  useEffect(() => {
    getCourse()
  }, [id])
  // useFocusEffect(
  //     React.useCallback(() => {
  //         getCourse()
  //     }, [])
  // );

  console.log("[coruseDetail]", course)
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#ef4444' : '#fff';
    const color = item.id === selectedId ? 'white' : '#000';

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id);
          //   navigation.navigate('eight', { id: item.id });
        }}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", width: "100%" }}>
      {course && <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={28} />
          </TouchableOpacity>
          <Icon name="shopping-cart" size={28} />
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
          <View style={{ marginLeft: 20, flexDirection: "row", justifyContent: 'space-between', alignItems: "center", marginBottom: 10 }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{course.title}</Text>
            <View style={styles.priceTag}>
              <Text style={{ marginLeft: 15, color: "#fff", fontWeight: 'bold', fontSize: 16 }}>{formatCurrency(course.price)}đ</Text>
            </View>
          </View>
          <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 15 }}>Nội dung khóa học</Text>
            <FlatList
              data={chapterLectures}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              extraData={selectedId}
            />
          </View>
          <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 15 }}>Khóa học này bao gồm</Text>
            <View style={styles.containerSub}>
              <Icon name="access-time" size={25} />
              <Text style={styles.containerText}>{course.totalLength / 60} giờ video theo yêu cầu</Text>
            </View>
            <View style={styles.containerSub}>
              <Icon name="tv" size={25} />
              <Text style={styles.containerText}>{course.totalChapter} video bài giảng</Text>
            </View>
            <View style={styles.containerSub}>
              <Icon name="phone-iphone" size={25} />
              <Text style={styles.containerText}>Truy cập trên thiết bị di động và máy tính</Text>
            </View>
            <View style={styles.containerSub}>
              <Icon name="speed" size={25} />
              <Text style={styles.containerText}>Quyền truy cập suốt đời</Text>
            </View>
          </View>
          <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Yêu cầu</Text>
            <Text style={{ marginHorizontal: 15, fontSize: 18 }}>{course.prepareMaterial}</Text>
          </View>
          <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Miêu tả</Text>
            <Text style={{ marginHorizontal: 15, fontSize: 18 }}>{course.description}</Text>
          </View>
          {/* <View style={{flexDirection:"row", alignItems:"center",paddingHorizontal:20, marginTop:20}}>
                <View style={styles.borderBtn}>
                    <Text style={styles.borderBtnText}>-</Text>
                </View>
                <Text style={{fontSize:20,marginHorizontal:10,fontWeight:"bold",marginBottom:20}}>1</Text>
                <View style={styles.borderBtn}>
                    <Text style={styles.borderBtnText}>+</Text>
                </View>
            </View> */}
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <View style={styles.buyBtn}>
              <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }} onPress={handleAddCartItem}>Thêm vào giỏ hàng</Text>
            </View>
          </View>
        </View>
      </ScrollView>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  image: {
    flex: 0.45,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tinyLogo: {
    width: 400,
    height: 250,
    borderRadius: 15,
    resizeMode: "contain",
    flex: 1,
  },
  details: {
    flex: 0.55,
    backgroundColor: '#F1F1F1',
    marginHorizontal: 7,
    marginBottom: 7,
    borderRadius: 20,
    marginTop: 20,
    paddingTop: 30,
  },
  priceTag: {
    backgroundColor: "#FB641B",
    width: 90,
    height: 40,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    justifyContent: "center",
  },
  container: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginBottom: 10,
    marginHorizontal: 15,
  },
  text: {
    fontSize: 20,
    textDecorationLine: "underline",
    overflow: "hidden",
    width: "70%",

  },
  time: {
    fontSize: 20
  },
  containerSub: {
    flexDirection: "row",
    justifyContent: 'flex-start',
    marginHorizontal: 15,
    marginBottom: 10,
  },
  containerText: {
    fontSize: 18,
    color: '#808080',
    marginLeft: 20,
  },
  borderBtn: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  borderBtnText: {
    fontWeight: "bold",
    fontSize: 28
  },
  buyBtn: {
    width: 200,
    height: 50,
    backgroundColor: '#FB641B',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 20,
  }

})
export default Detail
