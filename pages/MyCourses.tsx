import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProgressBar from '../components/ProgressBar';
import {
  CourseFilterResponse,
  CourseLearnerFilterResponse,
} from '../apis/courses/types';
import {
  UserRole,
  getUserMainInfo,
  getUserRole,
} from '../libs/core/handle-token';
import { showErrorAlert } from '../libs/core/handle-show.-mesage';
import { getCourseByCustomer } from '../apis/courses/api';
import { getCourseForLearnerSearchByUser } from '../apis/learner/api';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { getImage } from '../apis/image/components/apis';
import { useFocusEffect } from 'expo-router';
import { COLORS } from '../libs/const/color';
import MyCourse from '../components/MyCourses/MyCourse';
import { Button } from 'native-base';
import ReviewModal from '../components/MyCourses/ReviewModal';
import ReportModal from '../components/MyCourses/ReportModal';

export default function MyCourses() {
  const [showReviewModal, setShowReviewModal] = useState('');
  const [showReportModal, setShowReportModal] = useState('');

  const [courses, setCourses] = useState<
    CourseLearnerFilterResponse[] | CourseFilterResponse[]
  >([]);

  const getCourses = async () => {
    const userInfo = await getUserMainInfo();
    const userRole = userInfo?.role;
    try {
      if (userRole === UserRole.CUSTOMER)
        setCourses(await getCourseByCustomer());
      else if (userRole === UserRole.LEARNER)
        setCourses((await getCourseForLearnerSearchByUser('')).data);
    } catch (error) {
      console.log('another error ', error);
    }
  };

  // useEffect(() => {
  //   getCourses();
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      getCourses();
    }, [])
  );

  const renderItem = ({ item }) => {
    return (
      <MyCourse
        item={item}
        setShowReviewModal={setShowReviewModal}
        setShowReportModal={setShowReportModal}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 20 }}>
        Khóa học của tôi
      </Text>
      <FlatList
        data={courses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <ReviewModal
        setShowReviewModal={setShowReviewModal}
        showReviewModal={showReviewModal}
      />

      <ReportModal
        setShowReportModal={setShowReportModal}
        showReportModal={showReportModal}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: 270,
    width: '100%',
    backgroundColor: '#ffffff',
    paddingTop: 10,
  },
});
