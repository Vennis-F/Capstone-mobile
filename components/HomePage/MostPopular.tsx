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
} from '@expo/vector-icons';
import StarRating from '../RatingStars';
import { getImage } from '../../apis/image/components/apis';
import { formatCurrency } from '../../libs/core/handle-price';
import { COLORS } from '../../libs/const/color';
import { getAccessToken } from '../../libs/core/handle-token';

const Item = ({
  item,
  onPress,
  backgroundColor,
  textColor,
  ownListId = [],
}) => {
  const isOwn = ownListId.includes(item?.id);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.item, { backgroundColor }]}
    >
      <View style={styles.little}>
        <ImageBackground
          blurRadius={2}
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
        >
          <View style={{ maxWidth: '40%' }}>
            <View style={styles.stars}>
              <View style={{ flexDirection: 'row', gap: 4 }}>
                <AntDesign name="star" color={'#FFDD21'} size={20} />
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                  {item.ratedStar}.0
                </Text>
              </View>
            </View>
          </View>
          {isOwn ? (
            <View style={styles.playIt}>
              <MaterialCommunityIcons
                name="book-play"
                size={26}
                color={COLORS.MAINPINK}
              />
            </View>
          ) : (
            ''
          )}
        </ImageBackground>
        <View style={styles.infoContainer}>
          <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            <FontAwesome name="user-circle-o" size={20} color="#787676" />
            <Text style={[styles.provider, { color: textColor }]}>
              {item.author}
            </Text>
          </View>

          {/* <StarRating rating={item.ratedStar} /> */}
          <Text style={[styles.price, { color: '#2A60DD' }]}>
            {formatCurrency(item.price)}VNĐ
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const MostPopular = ({ ownList = [] }: { ownList: CourseFilterResponse[] }) => {
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
    try {
      const dataResponse = await getCoursesBySearch(bodyRequest);
      setListCourses([...dataResponse.data]);
    } catch (error) {
      console.log('[MostPopular - get course error] ', error);
    }
  };

  useEffect(() => {
    getCourse();
  }, []);

  const ownListId = ownList.map((course) => {
    return course.id;
  });

  const renderItem = ({ item }) => {
    const backgroundColor = '#fff';
    const color = '#000';

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id);
          navigation.navigate('courseDetail', {
            prevPage: 'home',
            id: item.id,
            ownListId: ownListId,
          });
        }}
        backgroundColor={backgroundColor}
        textColor={color}
        ownListId={ownListId}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
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
    marginRight: 24,
    width: 250,
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
  little: {
    flexDirection: 'column',
    width: '100%',
  },
  imgContainer: {
    height: 172,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tinyLogo: {},
  iconS: {
    backgroundColor: '#CADACE',
  },
  infoContainer: {
    paddingVertical: 8,
  },
  provider: {
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
});

export default MostPopular;
