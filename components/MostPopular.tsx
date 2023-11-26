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
  GetCoursesBySearchRequest,
  OrderType,
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
      <ImageBackground
        style={styles.imgContainer}
        imageStyle={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
        source={{
          uri: item.thumbnailUrl,
        }}
        alt="Course Thumbnail"
      />
      <View style={styles.infoContainer}>
        <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
        <Text style={[styles.provider, { color: textColor }]}>
          {item.author}
        </Text>
        <Text style={[styles.provider, { color: textColor }]}>
          <Ionicons name="md-stats-chart-sharp" size={16} color={textColor} />
          &nbsp;{item.level}
        </Text>
        {/* <Text style={[styles.provider, { color: textColor }]}>
          <Icon style={styles.iconS} name="star" size={15} />
          &nbsp;
          {item.ratedStar}
        </Text> */}
        <StarRating rating={item.ratedStar} />
      </View>
    </View>
  </TouchableOpacity>
);

const MostPopular = () => {
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
        take: 4,
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
        horizontal
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
  },
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
    maxWidth: 280,
    borderWidth: 1,
    borderColor: '#00000024',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 2,
  },

  little: {
    flexDirection: 'column',
    width: '100%',
    borderRadius: 16,
  },
  imgContainer: {
    width: '100%',
    height: 120,
  },
  tinyLogo: {},
  iconS: {
    backgroundColor: '#CADACE',
  },
  infoContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  provider: {
    marginBottom: 4,
  },
});

export default MostPopular;
