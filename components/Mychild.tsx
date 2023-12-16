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
import Notification from './Notification';

const Item = ({ item, children, setNotification, notification }) => {
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
      setNotification({
        message: 'Đã cập nhật khóa học cho bé',
        type: 'success',
      });
      getChildrenFromCourse();
    } catch (error) {
      setNotification({
        message: 'Cập nhật khóa học không thành công',
        type: 'danger',
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
          {/* <View style={{ flexDirection: 'row', gap: 6 }}>
            <Foundation name="graph-bar" size={24} color="#919090" />
            <Text style={[styles.provider]}>Tiến trình của bé</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <View style={styles.progressBar}>
              <View
                style={[styles.progress, { width: `${progressPercent}%` }]}
              ></View>
            </View>
            <Text>
              {progressChapter}/{item.totalChapter}
            </Text>
          </View> */}
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
  const [notification, setNotification] = useState(null);

  const closeNotification = () => {
    setNotification(null);
  };

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

  console.log(children);
  return (
    <ScrollView style={styles.container}>
      {courses.map((item, index) => (
        <Item
          item={item}
          key={index}
          children={children}
          notification={notification}
          setNotification={setNotification}
        />
      ))}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 40,
    paddingHorizontal: 12,
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
    height: 184,
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
