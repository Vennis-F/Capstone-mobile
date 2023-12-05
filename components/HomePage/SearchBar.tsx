import { Ionicons } from '@expo/vector-icons';
import {
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../libs/const/color';
import { useEffect, useState } from 'react';
import {
  Course,
  GetCoursesBySearchRequest,
  OrderType,
  SortFieldCourse,
} from '../../apis/courses/types';
import { useNavigation } from 'expo-router';
import { getCoursesBySearch } from '../../apis/courses/api';

export default function SearchBar({ isClicked, setIsClicked }) {
  const [searchText, setSearchText] = useState<string>('');
  const [coursesSearch, setCoursesSearch] = useState<Course[]>([]);
  // const [isClicked, setIsClicked] = useState(false);

  const navigation = useNavigation();

  const getCourse = async () => {
    const bodyRequest: GetCoursesBySearchRequest = {
      categories: [],
      levels: [],
      search: searchText,
      sortField: SortFieldCourse.PUBLISHED_DATE,
      pageOptions: {
        order: OrderType.DESC,
        page: 1,
        take: 5,
      },
    };
    const dataResponse = await getCoursesBySearch(bodyRequest);
    setCoursesSearch([...dataResponse.data]);
  };

  useEffect(() => {
    if (searchText === '') setCoursesSearch([]);
    else getCourse();
  }, [searchText]);

  return (
    <>
      <View style={{ marginTop: 24, flexDirection: 'row', gap: 12 }}>
        <TouchableOpacity
          style={styles.searchContainer}
          onPress={() => {
            setIsClicked(true);
          }}
        >
          <Icon
            name="search"
            size={23}
            color={COLORS.MAINPINK}
            style={{ marginRight: 20, opacity: 0.5 }}
          />
          <TextInput
            onFocus={() => {
              setIsClicked(true);
            }}
            placeholder="Tìm kiếm khóa học"
            underlineColorAndroid="transparent"
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text);
            }}
            style={{ width: '80%' }}
          />
        </TouchableOpacity>
      </View>
      {coursesSearch.length > 0 && isClicked ? (
        <View style={styles.dropdownArea}>
          {coursesSearch.map((item, index) => (
            <TouchableOpacity
              style={styles.coursesItem}
              onPress={() => {
                navigation.navigate('courseDetail', { id: item.id });
              }}
              key={index}
            >
              <Text>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    height: 50,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#00000033',
    borderRadius: 12,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  dropdownArea: {
    width: '85%',
    borderRadius: 10,
    marginTop: 0,
    backgroundColor: '#ffffffef',
    elevation: 20,
    zIndex: 9999,
    paddingVertical: 8,
  },
  coursesItem: {
    width: '80%',
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#8e8e8e86',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
