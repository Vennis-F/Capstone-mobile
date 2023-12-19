import { View, Text, StyleSheet } from 'react-native';
import { getUserMainInfo } from '../../libs/core/handle-token';
import { UserRole } from '../../libs/types';
import { getCourseByCustomer } from '../../apis/courses/api';
import { getCourseForLearnerSearchByUser } from '../../apis/learner/api';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  CourseFilterResponse,
  CourseLearnerFilterResponse,
} from '../../apis/courses/types';
import { getCertificate, getListAchievements } from '../../apis/achivement/api';
import { ViewAchievementReponse } from '../../apis/achivement/types';
import * as Print from 'expo-print';
import { Button } from 'native-base';
import { COLORS } from '../../libs/const/color';
import { FontAwesome5 } from '@expo/vector-icons';

const AchieveCourse = ({ courseId }) => {
  const [course, setCourse] = useState<
    CourseLearnerFilterResponse | CourseFilterResponse
  >();
  const [achieve, setAchieve] = useState<ViewAchievementReponse>();
  const [uri, setUri] = useState();

  const getCourses = async () => {
    const userInfo = await getUserMainInfo();
    const userRole = userInfo?.role;
    try {
      if (userRole === UserRole.CUSTOMER) {
        const myCourses = await getCourseByCustomer();
        setCourse(myCourses.find((course) => course.id === courseId));
      } else if (userRole === UserRole.LEARNER) {
        const myCourses = (await getCourseForLearnerSearchByUser('')).data;
        setCourse(myCourses.find((course) => course.id === courseId));
      }
    } catch (error) {
      console.log('[AchieveCourse - get course error] ', error);
    }
  };

  const handleGetCertificates = async () => {
    try {
      if (course && course.isCertified) {
        const response = await getListAchievements();
        setAchieve(
          response.find((achieve) => achieve.courseName === course.title)
        );
      }
    } catch (error) {
      console.log('[AchieveCourse - get certificates error] ', error);
    }
  };

  const handleGetACetificate = async () => {
    try {
      if (achieve) {
        const response = await getCertificate(achieve.path);
        const blob = new Blob([response], { type: 'application/pdf' });
        const filereaderinstance = new FileReader();
        filereaderinstance.readAsDataURL(blob);
        filereaderinstance.onload = () => {
          const base64 = filereaderinstance.result;
          // console.log(base64);
          setUri(base64);
        };
      }
    } catch (error) {
      console.log('[AchieveCourse - Get A Certificate error] ', error);
    }
  };

  const printToFile = async () => {
    try {
      await Print.printAsync({ uri: uri });
    } catch (error) {
      console.log('[AchieveCourse - print error] ', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getCourses();
    }, [])
  );

  useEffect(() => {
    handleGetCertificates();
  }, [course]);

  useEffect(() => {
    handleGetACetificate();
  }, [achieve]);

  return (
    <View>
      {course && achieve && (
        <View style={{ marginTop: 12, padding: 20 }}>
          {uri && (
            <View style={styles.certificateBox}>
              <FontAwesome5
                name="medal"
                size={48}
                color={COLORS.BLUESTEEL}
                style={styles.icon}
              />
              <Text style={styles.congrats}>
                Chúc mừng {achieve.customerName || achieve.learnerName}
              </Text>
              <Text style={styles.text}>Đã xuất sắc hoàn thành khóa học: </Text>
              <Text style={styles.title}>{course.title}</Text>
              <Text style={{ marginBottom: 12 }}>
                Đã hoàn thành {course.totalChapter} trên tổng{' '}
                {course.totalChapter} Bài giảng
              </Text>
              <Button
                style={styles.btn}
                onPress={() => {
                  printToFile();
                }}
              >
                <Text style={styles.btnText}>Xem Chứng chỉ</Text>
              </Button>
            </View>
          )}
        </View>
      )}
      {!achieve && (
        <View style={{ margin: 25 }}>
          <View
            style={[styles.certificateBox, { borderColor: COLORS.BLUESTEEL }]}
          >
            <Text style={styles.empty}>
              Hãy hoàn thành toàn bộ khóa học để nhận được chứng chỉ nhé
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
                gap: 8,
                marginTop: 12,
              }}
            >
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progress,
                    { width: `${course?.completedPercent || 0}%` },
                  ]}
                ></View>
              </View>
              <Text>{course?.completedPercent} / 100%</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default AchieveCourse;

const styles = StyleSheet.create({
  certificateBox: {
    borderWidth: 4,
    borderColor: COLORS.MAINPINK,
    padding: 30,
    borderRadius: 20,
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    top: -1,
    right: 8,
  },
  congrats: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    paddingHorizontal: 12,
    marginBottom: 12,
    color: COLORS.MAINPINK,
  },
  text: {
    fontSize: 16,
  },
  title: {
    textTransform: 'capitalize',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: COLORS.BLUESTEEL,
  },
  btn: {
    marginTop: 12,
    width: 150,
    height: 48,
    alignSelf: 'center',
    borderRadius: 32,
    backgroundColor: COLORS.SELECTYELLOW,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  empty: {
    fontSize: 16,
    textTransform: 'capitalize',
    textAlign: 'center',
    marginBottom: 12,
  },
  progressBar: {
    width: '60%',
    backgroundColor: '#e2e2e2',
    height: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#00000022',
  },
  progress: {
    height: '100%',
    borderRadius: 16,
    backgroundColor: COLORS.MAINPINK,
  },
});
