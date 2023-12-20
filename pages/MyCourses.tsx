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
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { getImage } from '../apis/image/components/apis';
import { useFocusEffect } from 'expo-router';
import { COLORS } from '../libs/const/color';
import MyCourse from '../components/MyCourses/MyCourse';
import { Button } from 'native-base';
import ReviewModal from '../components/MyCourses/ReviewModal';
import ReportModal from '../components/MyCourses/ReportModal';
import Achievements from '../components/MyCourses/Achievements';

export default function MyCourses() {
  const [showReviewModal, setShowReviewModal] = useState('');
  const [showReportModal, setShowReportModal] = useState('');
  const [showAchievement, setShowAchievement] = useState(false);

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
      setShowAchievement(false);
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
      <View style={styles.header}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          {showAchievement ? 'Chứng chỉ của tôi' : 'Khóa học của tôi'}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setShowAchievement(!showAchievement);
          }}
          style={[
            styles.icon,
            showAchievement ? { backgroundColor: 'white' } : null,
          ]}
        >
          <FontAwesome5
            name="medal"
            size={26}
            color={showAchievement ? COLORS.MAINPINK : 'white'}
          />
        </TouchableOpacity>
      </View>
      {!showAchievement && courses.length >= 1 && (
        <FlatList
          data={courses}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}

      {showAchievement && <Achievements />}

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
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
  icon: {
    borderWidth: 2,
    borderColor: COLORS.MAINPINK,
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.MAINPINK,
  },
});
