import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Course,
  CourseFilterResponse,
  GetCoursesBySearchRequest,
  OrderType,
  SortFieldCourse,
} from '../../apis/courses/types';
import { getCoursesBySearch } from '../../apis/courses/api';
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import StarRating from '../RatingStars';
import { getImage } from '../../apis/image/components/apis';
import { formatCurrency } from '../../libs/core/handle-price';
import { COLORS } from '../../libs/const/color';
import { getAccessToken } from '../../libs/core/handle-token';

const Item = ({ item, onPress }) => {
  console.log(item.author);
  const progressChapter = Math.round(item.totalChapter / 1.5);
  const progressPercent = (progressChapter / item.totalChapter) * 100;
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item]}>
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
          <Text style={styles.learning}>Đang học</Text>
          <Text style={[styles.title]}>{item.title}</Text>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            <MaterialIcons name="video-library" size={24} color="#919090" />
            <Text style={[styles.provider]}>
              Có {item.totalChapter} bài học{' '}
            </Text>
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
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const KeepLearning = ({
  ownList = [],
}: {
  ownList: CourseFilterResponse[];
}) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {ownList.slice(-2).map((item, index) => (
        <Item
          item={item}
          key={index}
          onPress={() => {
            navigation.navigate('eight', { id: item.id });
          }}
        />
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    justifyContent: 'space-between',
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

export default KeepLearning;
