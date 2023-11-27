import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Course,
  GetCourseDetailResponse,
  GetCoursesBySearchRequest,
  OrderType,
  SortFieldCourse,
} from '../apis/courses/types';
import {
  checkCourseIsOwnedByCourseId,
  getCourseById,
  getCoursesBySearch,
  getCoursesDetailById,
} from '../apis/courses/api';
import { getAccessToken } from '../libs/core/handle-token';
import { addCartItem } from '../apis/cart/apis';
import { useNavigation } from '@react-navigation/native';
import { getChapterLecturesByCourseId } from '../apis/chapter-lecture/api';
import { ChapterLecture } from '../apis/chapter-lecture/types';
import { formatCurrency } from '../libs/core/handle-price';
import { secondsToMinutesString } from '../libs/core/handle-time';
import { Ionicons } from '@expo/vector-icons';
import StarRating from './RatingStars';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import Notification from './Notification';
import { getImage } from '../apis/image/components/apis';
import HTML from 'react-native-render-html';

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.container}>
      <View style={styles.chapterTitle}>
        <Icon name="live-tv" size={24} />
        <Text style={styles.text}>{item.title}</Text>
      </View>
      <Text style={styles.time}>
        {secondsToMinutesString(item.totalContentLength)}
      </Text>
    </View>
  </TouchableOpacity>
);

const Detail = ({ }) => {
  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState();
  const [course, setCourse] = useState<GetCourseDetailResponse>();
  const [chapterLectures, setChapterLectures] = useState<ChapterLecture[]>([]);
  const route = useRoute();
  const [notification, setNotification] = useState(null);
  const id = route.params?.id as string;
  const [isOwned, setIsOwned] = useState(false)
  console.log('[Detail id]', id);

  const getCourse = async () => {
    const bodyRequest: GetCoursesBySearchRequest = {
      categories: [],
      levels: [],
      search: '',
      sortField: SortFieldCourse.PUBLISHED_DATE,
      pageOptions: {
        order: OrderType.DESC,
        page: 1,
        take: 4,
      },
    };
    const dataResponse = await getCoursesDetailById(id);
    const chapterLecturesRes = await getChapterLecturesByCourseId(id, true);
    setChapterLectures(chapterLecturesRes);
    setCourse(dataResponse);
  };

  const handleAddCartItem = async () => {
    const token = await getAccessToken();
    if (token) {
      try {
        await addCartItem({
          promotionCourseId: null,
          courseId: id,
        });
        setNotification({
          message: 'Thêm vào giỏ hàng thành công',
          type: 'success',
        });
      } catch (error) {
        setNotification({
          message: 'Không thể thêm vào giỏ hàng',
          type: 'danger',
        });
      }
    } else {
      setNotification({
        message: 'Không thể thêm vào giỏ hàng',
        type: 'danger',
      });
    }
  };

  const handleCheckCourseIsOwned = async () => {
    if (!(await getAccessToken())) return;
    const response = await checkCourseIsOwnedByCourseId(id)
    setIsOwned(response.status)
  }

  useEffect(() => {
    getCourse();
  }, [id]);

  useEffect(() => {
    handleCheckCourseIsOwned()
  }, [handleCheckCourseIsOwned, id])

  const closeNotification = () => {
    setNotification(null);
  };

  console.log('[coruseDetail]', isOwned);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#ef4444' : '#fff';
    const color = item.id === selectedId ? 'white' : '#000';

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id);
        }}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#f8f6f0', width: '100%' }}
    >
      {course && (
        <>
          <ImageBackground
            style={styles.tinyLogo}
            source={{
              uri: getImage(course.thumbnailUrl),
            }}
          >
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon
                  name="arrow-back"
                  size={28}
                  color={'white'}
                  style={styles.icons}
                />
              </TouchableOpacity>
              <Ionicons
                name="md-cart-outline"
                size={32}
                color={'white'}
                style={styles.icons}
              />
            </View>

            <View style={{ alignItems: 'flex-end' }}>
              {isOwned ? <View style={styles.addCartBtn}>
                <Text
                  style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}
                  onPress={() => {
                    navigation.navigate('eleven', { id: id });
                  }}
                >
                  Chuyển đến khóa học
                </Text>
              </View> : <View style={styles.addCartBtn}>
                <Text
                  style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}
                  onPress={handleAddCartItem}
                >
                  Thêm vào giỏ hàng
                </Text>
              </View>}

            </View>
          </ImageBackground>
          <ScrollView>
            <View style={styles.details}>
              <View
                style={{
                  marginLeft: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 10,
                  maxWidth: '100%',
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    maxWidth: '60%',
                    color: 'rgb(239, 68, 68)',
                  }}
                >
                  {course.title}
                </Text>
                <View style={{ maxWidth: '38%', flexDirection: 'column' }}>
                  <View style={styles.priceTag}>
                    <Text
                      style={{
                        marginLeft: 15,
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}
                    >
                      {formatCurrency(
                        course.discount ? course.discountPrice : course.price
                      )}
                      VND
                    </Text>
                  </View>
                  {course.discount ? (
                    <Text
                      style={{
                        marginLeft: 15,
                        color: '#000',
                        fontWeight: '600',
                        fontSize: 16,
                        textDecorationLine: 'line-through',
                      }}
                    >
                      {formatCurrency(course.price)} VND
                    </Text>
                  ) : (
                    ''
                  )}
                </View>
              </View>
              <View
                style={{
                  marginLeft: 20,
                  flexDirection: 'row',
                  gap: 48,
                  marginBottom: 8,
                }}
              >
                <Text
                  style={{ color: '#f8e472', fontWeight: '600', fontSize: 16 }}
                >
                  <StarRating rating={course.ratedStar} />
                  &nbsp; {course.ratedStar}
                </Text>
                <Text style={{ fontWeight: '500', fontSize: 16 }}>
                  {course.totalBought} Học sinh
                </Text>
              </View>

              <Text style={{ paddingLeft: 20, paddingRight: 4, fontSize: 16 }}>
                <Text style={{ fontWeight: '600' }}>Giảng viên: </Text>
                {course.author}
              </Text>

              <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
                <Text
                  style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15 }}
                >
                  Nội dung khóa học
                </Text>
                <FlatList
                  data={chapterLectures}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                  extraData={selectedId}
                />
              </View>
              <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                <Text
                  style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15 }}
                >
                  Khóa học này bao gồm
                </Text>
                <View style={styles.containerSub}>
                  <Icon name="access-time" size={24} />
                  <Text style={styles.containerText}>
                    {Math.round(course.totalLength / 60)} giờ video theo yêu cầu
                  </Text>
                </View>
                <View style={styles.containerSub}>
                  <Icon name="tv" size={24} />
                  <Text style={styles.containerText}>
                    {course.totalChapter} video bài giảng
                  </Text>
                </View>
                <View style={styles.containerSub}>
                  <Icon name="phone-iphone" size={24} />
                  <Text style={styles.containerText}>
                    Truy cập trên thiết bị di động và máy tính
                  </Text>
                </View>
                <View style={styles.containerSub}>
                  <Ionicons name="infinite" size={24} />
                  <Text style={styles.containerText}>
                    Quyền truy cập suốt đời
                  </Text>
                </View>
              </View>
              <View style={{ paddingHorizontal: 20, marginTop: 10, marginBottom: -20 }}>
                <Text
                  style={{ fontSize: 20, fontWeight: 'bold' }}
                >
                  Yêu cầu
                </Text>
                <HTML
                  source={{ html: course.prepareMaterial }}
                  contentWidth={300}
                />
              </View>
              <View
                style={{
                  paddingHorizontal: 20,
                  marginTop: 12,
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}
                >
                  Miêu tả
                </Text>
                <HTML
                  source={{ html: course.description }}
                  contentWidth={300}
                />
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
            </View>
          </ScrollView>
          {notification && (
            <Notification
              message={notification.message}
              type={notification.type}
              onClose={closeNotification}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icons: {
    borderWidth: 1,
    borderColor: '#0000005c',
    borderRadius: 8,
    backgroundColor: '#0000002a',
    padding: 2,
  },
  image: {
    flex: 0.45,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tinyLogo: {
    height: 250,
    borderRadius: 15,
    resizeMode: 'contain',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  details: {
    flex: 0.55,
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginBottom: 7,
    borderRadius: 20,
    paddingTop: 20,
    borderWidth: 1,
    borderColor: '#0000001d',
  },
  priceTag: {
    backgroundColor: 'rgb(234, 179, 8)',
    height: 40,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    justifyContent: 'center',
    paddingRight: 8,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginHorizontal: 15,
    alignItems: 'center',
  },
  chapterTitle: {
    flexDirection: 'row',
    gap: 16,
    maxWidth: '70%',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  time: {
    fontSize: 16,
  },
  containerSub: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  containerText: {
    fontSize: 18,
    color: '#808080',
    marginLeft: 12,
  },
  borderBtn: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  borderBtnText: {
    fontWeight: 'bold',
    fontSize: 28,
  },
  buyBtn: {
    width: 90,
    height: 50,
    backgroundColor: '#ffffffa5',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 8,
    marginRight: 12,
  },
  addCartBtn: {
    width: 160,
    height: 50,
    backgroundColor: '#ef4444b5',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 20,
    marginRight: 12,
  },
});
export default Detail;
