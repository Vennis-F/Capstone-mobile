import React, { useEffect, useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Course,
  GetCoursesBySearchRequest,
  OrderType,
  SortCourseBy,
  SortFieldCourse,
} from '../apis/courses/types';
import { getCoursesBySearch } from '../apis/courses/api';
import { Ionicons } from '@expo/vector-icons';
import StarRating from './RatingStars';

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, { backgroundColor }]}
  >
    <View style={styles.little}>
      <View>
        <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
        <Text style={[styles.provider, { color: textColor }]}>
          <Ionicons name="md-logo-youtube" size={16} color={textColor} />
          &nbsp;{item.totalChapter} Bài học
        </Text>
        <Text style={[styles.provider, { color: textColor, opacity: 0.8 }]}>
          <Ionicons name="md-stats-chart-sharp" size={16} color={textColor} />
          &nbsp;{item.level}
        </Text>
        {/* <Text style={[styles.provider, { color: textColor }]}>
          <Icon name="star" size={15} />
          &nbsp;
          {item.ratedStar}
        </Text> */}
        <StarRating rating={item.ratedStar} />
      </View>
      <View>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: item.thumbnailUrl,
          }}
          alt="Course Thumbnail"
        />
      </View>
    </View>
  </TouchableOpacity>
);

const Careers = () => {
  const [selectedId, setSelectedId] = useState();
  const [listCourses, setListCourses] = useState<Course[]>([]);
  const navigation = useNavigation();
  const getCourse = async () => {
    const bodyRequest: GetCoursesBySearchRequest = {
      categories: [],
      levels: [],
      search: '',
      sortField: SortFieldCourse.PUBLISHED_DATE,
      pageOptions: {
        order: OrderType.DESC,
        page: 1,
        take: 5,
      },
    };
    const dataResponse = await getCoursesBySearch(bodyRequest);
    setListCourses([...dataResponse.data]);
  };

  useEffect(() => {
    getCourse();
  }, []);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#ef4444' : '#fff';
    const color = item.id === selectedId ? 'white' : '#000';

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id);
          navigation.navigate('eight', { id: item.id });
        }}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={listCourses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: 270,
  },
  item: {
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#0000001b',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'justify',
  },
  provider: {
    color: '#DCDCDE',
    marginBottom: 2,
  },
  little: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tinyLogo: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
});

export default Careers;
