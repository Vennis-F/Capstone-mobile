import React from 'react';
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



export default function EditScreenInfo({ path }: { path: string }) {
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
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>Categories</Text>
        <TouchableOpacity onPress={handlePress}>
          <Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 10 }}>
            See All
          </Text>
        </TouchableOpacity>
      </View>
      <Categories />
      <View style={styles.career}>
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>
          Start Your Career
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
          Most Popular Courses
        </Text>
        <TouchableOpacity onPress={handlePress}>
          <Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 10 }}>
            See All
          </Text>
        </TouchableOpacity>
      </View>
      <MostPopular />
      <View style={styles.career}>
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
      <TopSale />
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
