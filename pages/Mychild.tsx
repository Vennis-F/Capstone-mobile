import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from 'react-native';

import { CourseFilterResponse } from '../apis/courses/types';
import { useFocusEffect } from 'expo-router';
import { Foundation, MaterialIcons } from '@expo/vector-icons';
import { getCourseByCustomer } from '../apis/courses/api';
import { ScrollView, Select } from 'native-base';
import { getImage } from '../apis/image/components/apis';
import { COLORS } from '../libs/const/color';
import {
  LearnerFilterResponse,
  UpdateLearnerCourseBodyRequest,
} from '../apis/learner/types';
import {
  getLearnerIsLearningCourseByCourseId,
  getLearnersByUser,
  updateLearnerCourse,
} from '../apis/learner/api';
import Notification from '../components/Notification';
import { ResponseError } from '../libs/types';
import { showMessage } from 'react-native-flash-message';

const Item = ({ item, children }) => {
  const progressChapter = Math.round(item.totalChapter / 1.5);
  const progressPercent = (progressChapter / item.totalChapter) * 100;
  const [selectedChild, setSelectedChild] = useState<string>('');

  const getChildrenFromCourse = async () => {
    setSelectedChild(
      (await getLearnerIsLearningCourseByCourseId(item.id)).learnerId
    );
  };

  const handleChildAssign = async (newChildId: string) => {
    const body: UpdateLearnerCourseBodyRequest = {
      courseId: item.id,
      currentLearnerId: selectedChild,
      newLearnerId: newChildId,
    };
    try {
      await updateLearnerCourse(body);
      showMessage({
        message: 'Đã cập nhật khóa học cho bé',
        type: 'success',
        duration: 2500,
      });
      getChildrenFromCourse();
    } catch (error) {
      const msg = error as ResponseError;
      const msgError = msg.response?.data?.message;
      console.log('[Mychild - update asign child] ', msg, error);
      showMessage({
        message: 'Khoá học không thể cập nhật',
        type: 'warning',
        duration: 2500,
      });
    }
  };

  useEffect(() => {
    getChildrenFromCourse();
  });

  return (
    <TouchableOpacity style={[styles.item]}>
      <View style={styles.little}>
        <ImageBackground
          style={styles.imgContainer}
          imageStyle={{
            borderRadius: 20,
            borderColor: '#0000006c',
            borderWidth: 1,
          }}
          source={{
            uri: getImage(item.thumbnailUrl),
          }}
          alt="Course Thumbnail"
        ></ImageBackground>
        <View style={styles.infoContainer}>
          <Text style={[styles.title]}>{item.title}</Text>
          <Select
            selectedValue={selectedChild || ''}
            accessibilityLabel="Khóa học dành cho bé"
            placeholder="Khóa học dành cho bé"
            width={'90%'}
            _selectedItem={{
              bg: COLORS.MAINPINK,
            }}
            onValueChange={(changedValue) => handleChildAssign(changedValue)}
          >
            {children.map((child, index) => (
              <Select.Item
                label={`${child.lastName} ${child.middleName} ${child.firstName}`}
                value={child.id}
                key={index}
              />
            ))}
          </Select>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function MyChild() {
  const [courses, setCourses] = useState<CourseFilterResponse[]>([]);
  const [children, setChildren] = useState<LearnerFilterResponse[]>([]);

  const getMyCourses = async () => {
    setCourses(await getCourseByCustomer());
  };

  const getMyChildren = async () => {
    setChildren(await getLearnersByUser());
  };

  useFocusEffect(
    React.useCallback(() => {
      getMyCourses();
      getMyChildren();
    }, [])
  );
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Khoá học của bé</Text>
      {courses.map((item, index) => (
        <Item item={item} key={index} children={children} />
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  item: {
    marginVertical: 8,
    marginRight: 24,
    width: '100%',
    borderWidth: 2,
    borderColor: '#00000032',
    borderRadius: 20,
    padding: 8,
  },
  little: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  imgContainer: {
    height: 144,
    width: 144,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 2,
    textTransform: 'capitalize',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 2,
  },
  tinyLogo: {},
  iconS: {
    backgroundColor: '#CADACE',
  },
  infoContainer: {
    paddingVertical: 8,
    width: '60%',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  provider: {
    fontSize: 16,
    marginBottom: 4,
  },
  stars: {
    backgroundColor: '#fff',
    margin: 12,
    padding: 6,
    borderWidth: 1,
    borderColor: '#0000002a',
    borderRadius: 12,
  },
  playIt: {
    backgroundColor: '#fff',
    margin: 12,
    borderWidth: 1,
    borderColor: '#0000002a',
    width: 36,
    height: 36,
    alignItems: 'center',
    padding: 4,
    borderRadius: 12,
  },
  learning: {
    fontSize: 14,
    color: '#F4C002',
    backgroundColor: '#ffbf002f',
    width: 80,
    padding: 4,
    textAlign: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ffffff6e',
  },
  progressBar: {
    width: '70%',
    backgroundColor: '#e2e2e2',
    height: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#00000022',
  },
  progress: {
    height: '100%',
    borderRadius: 16,
    backgroundColor: COLORS.BLUE,
  },
});
