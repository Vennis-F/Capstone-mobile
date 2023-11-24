import * as React from 'react';
import {Text, StyleSheet, View,SafeAreaView,FlatList,TouchableOpacity} from 'react-native';

import { Video, ResizeMode } from 'expo-av';
import { Checkbox, HStack } from 'native-base';
import  Icon  from 'react-native-vector-icons/MaterialIcons';
const Courses = [
  {
    id: "1",
    title: "Bài 1 : Cách vẽ con bò",
    time: "4 phút",
   
  },
  {
    id: "2",
    title: "Bài 2",
    time: "3 phút",

  },
  {
    id: "3",
    title: "Bài 3",
    time: "5 phút",
    
  },
];
const Questions = [
  {
    id: "1",
    question: "Tôi là ai?",
  },
  {
    id: "2",
    question: "Mày là ai?",
  },
];
const QuestionItem = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, { backgroundColor, paddingHorizontal: 20 }]}
  >
    {/* Render your question item as needed */}
    <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.question}</Text>
  </TouchableOpacity>
);

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, { backgroundColor ,paddingHorizontal:20}]}
  >
      <View style={styles.box}>
        <View style={{marginRight:20, marginTop:16}}>
          <Checkbox shadow={2} value='test' >
          </Checkbox>
        </View>
        <View >
          <Text style={{fontSize:20,fontWeight:"bold"}}>{item.title}</Text>
          <View style={styles.boxSub}>
           <Icon name='ondemand-video' size={20}/> 
            <Text style={{fontSize:15,marginLeft:10}}>{item.time}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
)
export default function YoutubePlayer() {
  const categories = ["Nội dung khóa học","Đặt câu hỏi"]
  const video = React.useRef(null);
  const [categoryIndex, setCategoryIndex] =React.useState(0)
  const [status, setStatus] = React.useState({});
  const [selectedId, setSelectedId] = React.useState();
  const renderQuestionItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#CECADA" : "#fff";
    const color = item.id === selectedId ? "white" : "black";

    return (
      <QuestionItem
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };
  const CategoryList = () => {
    return (
      <View style={styles.categoryContainer}>
        {categories.map((item,index)=> (
          <TouchableOpacity key={index} onPress={() =>setCategoryIndex(index)}>
          <Text key={index} style={[styles.categoryText, categoryIndex == index && styles.categoryTextSelected]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      )
    }
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#CECADA" : "#fff";
    const color = item.id === selectedId ? "white" : "black";
    
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
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
        
      />
      {/* <View >
        <Text style={{fontSize:20,fontWeight:'bold',paddingHorizontal:20,marginBottom:15}}>Nội dung khóa học</Text>
      </View> */}
      <CategoryList />
      {categoryIndex === 0 ? (
        <FlatList
          data={Courses}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
      ) : (
        <FlatList
          data={Questions}
          renderItem={renderQuestionItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: '#FFF',
    width:'100%'
  },
  video: {
    width: "100%",
    height: 250,
   
  },
  box:{
    marginBottom:15,
    flexDirection:'row',
    justifyContent :'flex-start'
  },
  boxSub:{
    flexDirection:'row',
    justifyContent :'flex-start'
  },
  categoryContainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    paddingHorizontal:20
  },
  categoryText:{
    fontSize:20,
    fontWeight:"bold",
    marginBottom:20
  },
  categoryTextSelected:{
    color:'#FB641B',
    paddingBottom:5,
    borderBottomWidth:2,
    borderColor: '#FB641B',
  }

});
