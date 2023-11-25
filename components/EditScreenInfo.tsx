import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Colors from '../constants/Colors';
import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';
import Icon from 'react-native-vector-icons/FontAwesome';
import Categories from './Categories';
import Careers from './Careers';
import MostPopular from './MostPopular';
import CateTop from './CateTop';
import TopCourses from './TopCourses';
import TopSale from './TopSale';
import { Category } from '../apis/category/types';
import { getCategories } from '../apis/category/api';
import axios from 'axios';
import { FlatList } from 'native-base';
import {
  Course,
  GetCoursesBySearchRequest,
  OrderType,
  SortFieldCourse,
} from '../apis/courses/types';
import { getCoursesBySearch } from '../apis/courses/api';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function EditScreenInfo({ path }: { path: string }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isClicked, setIsClicked] = useState(false);
  const [searchText, setSearchText] = useState<string>('');
  const [coursesSearch, setCoursesSearch] = useState<Course[]>([]);
  const navigation = useNavigation();

  const handleGetCategories = async () => {
    const catesRes = await getCategories('true');
    setCategories(catesRes);
    // axios.get(`https://capstone-be-7fef96e86ef9.herokuapp.com/category?active=true`).then(data=>console.log(data)).catch(err=>console.log(err))
  };

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

  useEffect(() => {
    handleGetCategories();
  }, []);

  // const handlePress = () => {
  //   // Xử lý logic khi nút được nhấn
  //   console.log("Nút See All được nhấn");
  // };
  // const handleSearch = () => {
  //   // Xử lý logic khi nút được nhấn
  //   console.log("Nút search đã được nhấn");
  // };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#f8f6f0',
        marginTop: -30,
      }}
    >
      <View style={styles.header}>
        <View>
          <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#FB641B' }}>
            Xin chào, Mẫn Nhi
          </Text>
          <Text style={{ fontSize: 19, fontWeight: 'bold', marginTop: 5 }}>
            Cùng nhau vẽ nào!
          </Text>
        </View>
        <Ionicons name="md-cart-outline" size={36} />
      </View>
      <ScrollView>
        <View style={{ marginTop: 30, flexDirection: 'row' }}>
          <View style={styles.searchContainer}>
            <TextInput
              style={{ marginLeft: 30 }}
              placeholder="Tìm kiếm khóa học"
              underlineColorAndroid="transparent"
              value={searchText}
              onChangeText={(text) => {
                setSearchText(text);
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setIsClicked(!isClicked);
              }}
            >
              <Icon
                name="search"
                size={23}
                style={{ marginRight: 20, opacity: 0.5 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        {coursesSearch.length > 0 ? (
          <View style={styles.dropdownArea}>
            <FlatList
              data={coursesSearch}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={styles.coursesItem}
                  onPress={() => {
                    navigation.navigate('eight', { id: item.id });
                  }}
                >
                  <Text>{item.title}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        ) : null}
        <View style={styles.categories}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
            Thể Loại&nbsp;
            <Text style={{ color: '#dc2626' }}>mới nhất</Text>
          </Text>
        </View>
        <Categories categories={categories} />
        <View style={styles.career}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
            Danh sách khóa học
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ten');
            }}
          >
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 15,
                marginTop: 10,
                color: '#0EA5E7',
              }}
            >
              Xem tất cả
            </Text>
          </TouchableOpacity>
        </View>
        <Careers />
        <View style={styles.career}>
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
            Những Khóa học mới
          </Text>
        </View>
        <MostPopular />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchContainer: {
    height: 50,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#00000033',
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categories: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  career: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdownArea: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginTop: 0,
    backgroundColor: '#fff',
    elevation: 5,
    alignSelf: 'center',
  },
  coursesItem: {
    width: '80%',
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#8e8e8e',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
