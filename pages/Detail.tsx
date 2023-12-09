import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { GetCourseDetailResponse } from '../apis/courses/types';
import {
  checkCourseIsOwnedByCourseId,
  getCoursesDetailById,
} from '../apis/courses/api';
import { getAccessToken, getUserRole } from '../libs/core/handle-token';
import { getChapterLecturesByCourseId } from '../apis/chapter-lecture/api';
import { ChapterLecture } from '../apis/chapter-lecture/types';
import { formatCurrency } from '../libs/core/handle-price';
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import StarRating from '../components/RatingStars';
import Notification from '../components/Notification';
import { UserRole } from '../apis/auth/types';
import DetailHeader from '../components/DetailPage/DetailHeader';
import { COLORS } from '../libs/const/color';
import Description from '../components/DetailPage/Description';
import Content from '../components/DetailPage/Content';
import { Button } from 'native-base';
import { addCartItem } from '../apis/cart/apis';
import Review from '../components/DetailPage/Review';

const Detail = ({}) => {
  const [userRole, setUserRole] = useState<UserRole | null>();
  const [course, setCourse] = useState<GetCourseDetailResponse>();
  const [chapterLectures, setChapterLectures] = useState<ChapterLecture[]>([]);
  const [notification, setNotification] = useState(null);
  // tab: content, description, review
  const [pressedTab, setPressedTab] = useState('description');

  const route = useRoute();
  const id = route.params?.id as string;
  const ownListId = route.params?.ownListId;
  const prevPage = route.params?.prevPage;
  const [isOwned, setIsOwned] = useState(false);

  const handleAddCartItem = async () => {
    const token = await getAccessToken();
    if (token && userRole === 'Customer') {
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

  const handleGetUserRole = async () => {
    try {
      setUserRole(await getUserRole());
    } catch (error) {
      console.log('[Detail - user role error] ', error);
    }
  };

  const getCourse = async () => {
    const dataResponse = await getCoursesDetailById(id);
    const chapterLecturesRes = await getChapterLecturesByCourseId(id, true);
    setChapterLectures(chapterLecturesRes);
    setCourse(dataResponse);
  };

  const handleCheckCourseIsOwned = async () => {
    if (!userRole) return;
    if (userRole === 'Customer') {
      const response = await checkCourseIsOwnedByCourseId(id);
      setIsOwned(response.status);
    } else if (userRole === 'Learner' && ownListId) {
      setIsOwned(ownListId.includes(course?.id));
    }
  };

  useEffect(() => {
    setPressedTab('description');
    getCourse();
    handleGetUserRole();
  }, [id]);

  useEffect(() => {
    handleCheckCourseIsOwned();
  }, [handleCheckCourseIsOwned, id]);

  const closeNotification = () => {
    setNotification(null);
  };

  console.log('[courseDetail]', course);
  console.log('[Detail - prev page] ', prevPage);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
        width: '100%',
        paddingTop: 12,
      }}
    >
      <StatusBar translucent={true} />
      {course && (
        <ScrollView>
          <DetailHeader
            prevPage={prevPage}
            course={course}
            id={id}
            isOwned={isOwned}
            userRole={userRole}
          />

          <View style={styles.details}>
            <Text style={styles.rating}>
              <StarRating rating={course.ratedStar} />
              &nbsp; {course.ratedStar}
            </Text>
            <View style={styles.mainInfo}>
              <Text style={styles.title}>{course.title}</Text>
              <View style={styles.reviewDetailContainer}>
                <View style={styles.reviewDetail}>
                  <FontAwesome5
                    name="chalkboard-teacher"
                    size={22}
                    color="grey"
                  />
                  <Text style={{ color: 'grey' }}>{course.author}</Text>
                </View>
                <View style={styles.reviewDetail}>
                  <Ionicons name="ios-play-circle" size={28} color="grey" />
                  <Text style={{ color: 'grey' }}>
                    {course.totalChapter} Bài học
                  </Text>
                </View>
                <View style={styles.reviewDetail}>
                  <FontAwesome name="user-circle-o" size={24} color="grey" />
                  <Text style={{ color: 'grey' }}>
                    {course.totalBought} Học sinh
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.tabBarContainer}>
              <TouchableOpacity
                onPress={() => {
                  setPressedTab('description');
                }}
                style={[
                  styles.tabBar,
                  pressedTab === 'description' ? styles.tabBarColor : null,
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    pressedTab === 'description' ? styles.tabTextColor : null,
                  ]}
                >
                  Mô tả
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPressedTab('content');
                }}
                style={[
                  styles.tabBar,
                  pressedTab === 'content' ? styles.tabBarColor : null,
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    pressedTab === 'content' ? styles.tabTextColor : null,
                  ]}
                >
                  Nội dung
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setPressedTab('review');
                }}
                style={[
                  styles.tabBar,
                  pressedTab === 'review' ? styles.tabBarColor : null,
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    pressedTab === 'review' ? styles.tabTextColor : null,
                  ]}
                >
                  Đánh giá
                </Text>
              </TouchableOpacity>
            </View>

            {pressedTab === 'content' ? (
              <Content chapterLectures={chapterLectures} course={course} />
            ) : (
              ''
            )}
            {pressedTab === 'description' ? (
              <Description course={course} />
            ) : (
              ''
            )}
            {pressedTab === 'review' ? (
              <Review course={course} id={course.id} />
            ) : (
              ''
            )}
          </View>
          {notification && (
            <Notification
              message={notification.message}
              type={notification.type}
              onClose={closeNotification}
            />
          )}
        </ScrollView>
      )}
      {course && !isOwned && userRole === 'Customer' && (
        <View style={styles.buyTab}>
          {userRole === 'Customer' && !isOwned && (
            <View style={styles.priceContainer}>
              <Text style={styles.totalPrice}>Giá tiền</Text>
              <Text style={styles.price}>
                {formatCurrency(course?.price)} VNĐ
              </Text>
            </View>
          )}
          <Button style={styles.buyButton} onPress={handleAddCartItem}>
            <Text style={styles.buyButtonText}>Thêm vào giỏ hàng</Text>
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  details: {
    marginTop: -34,
    backgroundColor: '#fff',
    marginBottom: 7,
    paddingTop: 20,
    paddingHorizontal: 24,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#0000001d',
  },
  rating: {
    marginTop: 12,
    alignSelf: 'flex-end',
    color: '#ffd147',
    fontWeight: '600',
    fontSize: 18,
  },
  mainInfo: {
    flexDirection: 'column',
    maxWidth: '100%',
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginBottom: 8,
  },
  reviewDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reviewDetail: {
    flexDirection: 'row',
    gap: 6,
    maxWidth: '30%',
    alignItems: 'center',
  },
  tabBarContainer: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#00000044',
    marginBottom: 12,
  },
  tabBar: {
    width: '30%',
    alignItems: 'center',
    height: 42,
  },
  tabBarColor: {
    borderBottomWidth: 4,
    borderBottomColor: COLORS.MAINPINK,
  },
  tabText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tabTextColor: {
    color: COLORS.MAINPINK,
  },
  priceTag: {
    backgroundColor: 'rgb(234, 179, 8)',
    height: 40,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    justifyContent: 'center',
    paddingRight: 8,
  },
  buyTab: {
    height: 110,
    borderWidth: 2,
    borderColor: '#00000023',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {},
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'grey',
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.MAINPINK,
  },
  buyButton: {
    height: 50,
    width: 180,
    backgroundColor: COLORS.MAINPINK,
    borderRadius: 60,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  toCourseButton: {
    height: 50,
    width: 220,
    backgroundColor: COLORS.MAINPINK,
    borderRadius: 60,
  },
  toCourseButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
export default Detail;
