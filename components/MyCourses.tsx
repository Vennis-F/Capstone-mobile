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
import ProgressBar from './ProgressBar';
import {
  CourseFilterResponse,
  CourseLearnerFilterResponse,
} from '../apis/courses/types';
import { UserRole, getUserRole } from '../libs/core/handle-token';
import { showErrorAlert } from '../libs/core/handle-show.-mesage';
import { getCourseByCustomer } from '../apis/courses/api';
import { getCourseForLearnerSearchByUser } from '../apis/learner/api';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getImage } from '../apis/image/components/apis';
import { useFocusEffect } from 'expo-router';

const Item = ({ item, onPress, backgroundColor, textColor }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[styles.item]}
      onPress={() => {
        navigation.navigate('youtubePlayer', { id: item.id });
      }}
    >
      <View style={styles.little}>
        <View style={{ maxWidth: '50%' }}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: getImage(item.thumbnailUrl),
            }}
            alt="Course Thumbnail"
          />
        </View>
        <View
          style={{
            maxWidth: '50%',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <View>
            <Text style={[styles.title, { color: textColor }]}>
              {item.title}
            </Text>
            <Text style={[styles.provider, { color: textColor }]}>
              <Ionicons name="md-logo-youtube" size={16} color="#ef4444" />
              &nbsp;{item.totalChapter} Bài học
            </Text>
          </View>
          <View style={styles.startToLearn}>
            <Text style={{ color: '#fff', fontSize: 16 }}>Bắt đầu học</Text>
            <Ionicons name="md-play-forward" size={20} color="#fff" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function MyCourses() {
  const [selectedId, setSelectedId] = useState();
  const [courses, setCourses] = useState<
    CourseLearnerFilterResponse[] | CourseFilterResponse[]
  >([]);

  const getCourses = async () => {
    const userRole = await getUserRole();
    // if (!userRole)
    //   showErrorAlert('Hãy đăng nhập và tôi sẽ cho trả về khóa học của bạn ạ');

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
    const backgroundColor = item.id === selectedId ? '#050514' : '#CECADA';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
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
        extraData={selectedId}
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
    paddingTop: 40,
  },
  item: {
    padding: 20,
    marginVertical: 12,
    marginHorizontal: 24,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#0000001b',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  provider: {
    color: '#DCDCDE',
    marginBottom: 2,
  },
  little: {
    flexDirection: 'row',
    gap: 28,
  },
  tinyLogo: {
    height: 140,
    width: 140,
    borderRadius: 12,
  },
  startToLearn: {
    backgroundColor: '#ef4444cd',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    minWidth: 60,
    maxWidth: 160,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
