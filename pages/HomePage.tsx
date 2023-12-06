import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Categories from '../components/HomePage/Categories';
import Careers from '../components/Careers';
import MostPopular from '../components/HomePage/MostPopular';
import { CourseFilterResponse } from '../apis/courses/types';
import { getCourseByCustomer } from '../apis/courses/api';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../libs/const/color';
import HomeHeader from '../components/HomePage/HomeHeader';
import { getAccessToken, getUserRole } from '../libs/core/handle-token';
import { Image } from 'native-base';
import KeepLearning from '../components/HomePage/KeepLearning';
import { getAllInstructors } from '../apis/instructor/api';
import { useFocusEffect } from 'expo-router';
import { UserRole } from '../apis/auth/types';
import { getCourseForLearnerSearchByUser } from '../apis/learner/api';

export default function HomePage({ path }: { path: string }) {
  const [userRole, setUserRole] = useState<UserRole | null>();
  const [userLogin, setuserLogin] = useState(false);

  // const [token, setToken] = useState<string | null>();
  const [ownList, setOwnList] = useState<CourseFilterResponse[]>([]);
  const navigation = useNavigation();

  const handleGetUserRole = async () => {
    try {
      const role = await getUserRole();
      setUserRole(role);
    } catch (error) {
      console.log('[HomePage - role errorr] ', error);
      setUserRole(null);
    }
  };

  const handleCheckIsLogin = async () => {
    try {
      const token = await getAccessToken();
      if (token) {
        setuserLogin(true);
      } else setuserLogin(false);
    } catch (error) {
      console.log('[HomePage - login error] ', error);
    }
  };

  const getUserCourse = async () => {
    try {
      if (!userLogin) {
        setOwnList([]);
      } else if (userRole === 'Customer')
        setOwnList(await getCourseByCustomer());
      else if (userRole === 'Learner')
        setOwnList((await getCourseForLearnerSearchByUser('')).data);
    } catch (error) {
      console.log('[HomePage - get user course error] ', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setUserRole(null);
      handleCheckIsLogin();
      handleGetUserRole();
    }, [])
  );

  useEffect(() => {
    if (userRole) getUserCourse();
    if (!userRole) setOwnList([]);
  }, [userLogin, userRole]);

  return (
    <ScrollView
      style={{
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
      }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <HomeHeader />

      <Image
        source={require('../assets/images/poster.png')}
        alt="Poster"
        height={'200'}
        resizeMode="cover"
        borderWidth={2}
        borderColor={COLORS.MAINPINK}
        marginTop={4}
      />
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={styles.posterTitle}>
          Cùng nhau khám phá Giáng Sinh Lung Linh nào!
        </Text>
        <Text style={styles.posterContent}>
          Khám phá niềm đam mê nghệ thuật cùng chúng mình và tận hưởng mùa đông
          sáng tạo với các khóa học vẽ độc đáo. Từ hôm nay, giảm giá đặc biệt
          cho mùa Giáng Sinh.
        </Text>
      </View>

      <View style={styles.categories}>
        <View style={styles.containerHeaders}>
          <Text style={styles.headerTitles}>Thể Loại</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('courseList');
            }}
          >
            <Text style={styles.seeAll}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        <Categories />
      </View>

      <View style={styles.courses}>
        <View style={styles.containerHeaders}>
          <Text style={styles.headerTitles}>
            Những Khóa học&nbsp;
            <Text style={{ color: '#dc2626' }}>mới</Text>
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('courseList');
            }}
          >
            <Text style={styles.seeAll}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        <MostPopular ownList={ownList} />
      </View>

      {ownList.length >= 1 ? (
        <View style={styles.courses}>
          <View style={styles.containerHeaders}>
            <Text style={styles.headerTitles}>Tiếp tục với những bài học</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('three');
              }}
            >
              <Text style={styles.seeAll}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <KeepLearning ownList={ownList} />
        </View>
      ) : (
        ''
      )}
      {/* <View style={styles.career}>
        <Text style={styles.headerTitles}>Danh sách khóa học</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ten');
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 15,
              marginTop: 10,
              color: '#0EA5E7',
            }}
          >
            Xem tất cả
          </Text>
        </TouchableOpacity>
      </View> */}
      {/* <Careers /> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerHeaders: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitles: {
    fontSize: 24,
    fontWeight: 'bold',
    maxWidth: '65%',
    marginBottom: 16,
  },
  seeAll: {
    color: COLORS.SELECTYELLOW,
    fontSize: 16,
  },
  posterTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    width: '78%',
    padding: 12,
    paddingBottom: 0,
    color: '#1f8acd',
  },
  posterContent: {
    padding: 12,
    paddingTop: 8,
  },

  categories: {
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 10,
  },
  courses: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
});
