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
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import CourseListHeader from '../components/CourseList/CourseListHeader';
import List from '../components/CourseList/List';

export default function CourseList({ path }: { path: string }) {
  const [userRole, setUserRole] = useState<UserRole | null>();
  const [ownList, setOwnList] = useState<CourseFilterResponse[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  const handleGetUserRole = async () => {
    try {
      setUserRole(await getUserRole());
    } catch (error) {
      console.log('[HomePage - user role error] ', error);
    }
  };

  const getUserCourse = async () => {
    try {
      if (!userRole) {
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
      handleGetUserRole();
    }, [])
  );

  useEffect(() => {
    getUserCourse();
  }, [userRole]);

  return (
    <ScrollView
      style={{
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        paddingTop: 24,
      }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <StatusBar translucent={true} />

      <CourseListHeader searchText={searchText} setSearchText={setSearchText} />

      <View style={styles.courses}>
        <View style={styles.containerHeaders}>
          <Text style={styles.headerTitles}>Danh sách khóa học</Text>
        </View>
      </View>
      <List ownList={ownList} searchText={searchText} />
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
