import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  View,
  Text,
  SafeAreaView,
  
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Colors from '../constants/Colors';
import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';
import Icon from "react-native-vector-icons/FontAwesome";
import Categories from './Categories';
import Careers from './Careers';
import MostPopular from './MostPopular';
import CateTop from './CateTop';
import TopCourses from './TopCourses';
import TopSale from './TopSale';
import { Category } from '../apis/category/types';
import { getCategories } from '../apis/category/api';
import axios from 'axios';

export default function EditScreenInfo({ path }: { path: string }) {
  const [categories, setCategories] = useState<Category[]>([])

  const handleGetCategories = async ()=>{

    const catesRes = await getCategories("true")
    setCategories(catesRes)
    // axios.get(`https://capstone-be-7fef96e86ef9.herokuapp.com/category?active=true`).then(data=>console.log(data)).catch(err=>console.log(err))
  };
  

  useEffect(()=>{
    handleGetCategories()
  },[])


  const handlePress = () => {
    // Xử lý logic khi nút được nhấn
    console.log("Nút See All được nhấn");
  };
  const handleSearch = () => {
    // Xử lý logic khi nút được nhấn
    console.log("Nút search đã được nhấn");
  };
  return (
    <SafeAreaView
    style={{ flex: 1, paddingHorizontal: 20, backgroundColor: "white" }}
  >
    <View style={styles.header}>
      <View>
        <Text style={{ fontSize: 25, fontWeight: "bold", color: "#FB641B" }}>
          Hello, Mustain!
        </Text>
        <Text style={{ fontSize: 19, fontWeight: "bold", marginTop: 5 }}>
          Ready to become better?
        </Text>
      </View>
      <Icon name="shopping-cart" size={25} />
    </View>
    <ScrollView>
      <View style={{ marginTop: 30, flexDirection: "row" }}>
        <View style={styles.searchContainer}>
          <TextInput
            style={{ marginLeft: 30 }}
            placeholder="Search your courses"
          />
          <TouchableOpacity onPress={handleSearch}>
            <Icon name="search" size={23} style={{ marginRight: 20 }} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.categories}>
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>Thể Loại</Text>
        {/* <TouchableOpacity onPress={handlePress}>
          <Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 10 }}>
            See All
          </Text>
        </TouchableOpacity> */}
      </View>
      <Categories categories={categories}/>
      <View style={styles.career}>
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>
          Danh sách khóa học
        </Text>
        <TouchableOpacity onPress={handlePress}>
          <Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 10 }}>
            See All
          </Text>
        </TouchableOpacity>
      </View>
      <Careers />
      <View style={styles.career}>
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>
          Những Khóa học mới
        </Text>
        <TouchableOpacity onPress={handlePress}>
          <Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 10 }}>
            See All
          </Text>
        </TouchableOpacity>
      </View>
      <MostPopular />
      {/* <View style={styles.career}>
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>Top Courses</Text>
        <TouchableOpacity onPress={handlePress}>
          <Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 10 }}>
            See All
          </Text>
        </TouchableOpacity>
      </View>
      <CateTop />
      <TopCourses />
      <View style={styles.career}>
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>
          Top Sale Courses
        </Text>
        <TouchableOpacity onPress={handlePress}>
          <Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 10 }}>
            See All
          </Text>
        </TouchableOpacity>
      </View>
      <TopSale /> */}
    </ScrollView>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 55,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchContainer: {
    height: 50,
    backgroundColor: "#CECADA",
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categories: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  career: {
    marginTop: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
