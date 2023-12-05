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
import { useNavigation, useRoute } from '@react-navigation/native';

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

const Item = ({ item, onPress, ownListId }) => {
  const progressChapter = Math.round(item.totalChapter / 1.5);
  const progressPercent = (progressChapter / item.totalChapter) * 100;

  const isOwned = ownListId.includes(item.id);
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
          <Text numberOfLines={2} style={[styles.title]}>
            {item.title}
          </Text>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            <FontAwesome name="user-circle-o" size={20} color="#787676" />
            <Text numberOfLines={1} style={[styles.provider]}>
              {item.author}
            </Text>
          </View>
          <Text style={[styles.price, { color: '#2A60DD' }]}>
            {formatCurrency(item.discount ? item.discountPrice : item.price)}VNĐ
          </Text>
        </View>
        <View>
          {isOwned && (
            <Ionicons
              name="bookmark"
              size={26}
              color={COLORS.MAINPINK}
              style={{ marginTop: -4 }}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const List = ({
  ownList = [],
  searchText,
}: {
  ownList: CourseFilterResponse[];
  searchText: string;
}) => {
  const route = useRoute();
  const params = route.params;
  const selectedCategories = params?.selectedCategories;
  const selectedLevels = params?.selectedLevels;
  const sort = params?.sort;
  const sortField = sort?.sortField;
  const order = sort?.order;

  const navigation = useNavigation();
  const [coursesSearch, setCoursesSearch] = useState<Course[]>([]);

  const ownListId = ownList.map((course) => {
    return course.id;
  });

  const getCourse = async () => {
    const bodyRequest: GetCoursesBySearchRequest = {
      categories: selectedCategories || [],
      levels: selectedLevels || [],
      search: searchText,
      sortField: sortField || SortFieldCourse.PUBLISHED_DATE,
      pageOptions: {
        order: order || OrderType.DESC,
        page: 1,
        take: 100,
      },
    };
    const dataResponse = await getCoursesBySearch(bodyRequest);
    setCoursesSearch([...dataResponse.data]);
  };

  useEffect(() => {
    getCourse();
  }, [searchText]);

  useEffect(() => {
    getCourse();
  }, [selectedCategories, selectedLevels, sort]);

  return (
    <SafeAreaView style={styles.container}>
      {coursesSearch.map((item, index) => (
        <Item
          item={item}
          key={index}
          ownListId={ownListId}
          onPress={() => {
            navigation.navigate('courseDetail', {
              id: item.id,
              ownListId: ownListId,
            });
          }}
        />
      ))}
      {coursesSearch.length < 1 && (
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, textAlign: 'center', width: '70%' }}>
            Không có kết quả cho tìm kiếm hoặc bộ lọc của bạn
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
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
    gap: 10,
  },
  imgContainer: {
    height: 120,
    width: 120,
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
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
    width: '55%',
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

export default List;
