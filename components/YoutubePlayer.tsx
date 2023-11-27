import * as React from 'react';
import { Text, StyleSheet, View, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native';

import { Video, ResizeMode, AVPlaybackStatusToSet, AVPlaybackStatus } from 'expo-av';
import { Checkbox, HStack } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../libs/const/color';
import { router } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import { GetCourseDetailResponse, GetCoursesBySearchRequest, OrderType, SortFieldCourse } from '../apis/courses/types';
import { getCoursesDetailById } from '../apis/courses/api';
import { getAccessToken } from '../libs/core/handle-token';
import { addCartItem } from '../apis/cart/apis';
import { ChapterLecture, ChapterLectureFilter } from '../apis/chapter-lecture/types';
import { getChapterLectureOfLearnerStudy, saveUserLectureCompleted } from '../apis/chapter-lecture/api';
import { useAuthMiddleware } from './useAuthMiddleware';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Dimensions } from 'react-native';
const Questions = [
  {
    id: "1",
    username: "Nguyen Hoang Loc",
    title: "Bài này hay quá ạ",
    content: 'Bài giảng số 1',
    time: '24-11-2023'
  },
  {
    id: "2",
    username: "Nguyen Hoang Anh",
    title: "Bài bổ ích quá",
    content: 'Bài giảng số 1',
    time: '10-11-2023'
  },
  {
    id: "3",
    username: "Nguyen Minh Khôi",
    title: "Bài 10 điểm",
    content: 'Bài giảng số 1',
    time: '01-11-2023'
  },
  {
    id: "4",
    username: "Nguyen Minh Khôi",
    title: "Bài 10 điểm",
    content: 'Bài giảng số 1',
    time: '01-11-2023'
  },
];

const QuestionItem = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, { backgroundColor, paddingHorizontal: 20, borderRadius: 10, marginHorizontal: 20, marginBottom: 10 }]}
  >
    <View style={styles.question}>
      <View>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
          }}
        />
      </View>
      <View style={{ marginLeft: -50 }}>
        <Text style={{ fontSize: 19, fontWeight: "bold" }}>{item.username}</Text>
        <Text style={{ fontSize: 14 }}>{item.title}</Text>
      </View>
      <View>
        <Icon name='chat' size={22} />
      </View>
    </View>
    <View style={styles.questionSub}>
      <Text>{item.content} - </Text>
      <Text>{item.time}</Text>
    </View>
  </TouchableOpacity>
);

const Item = ({ item, onPress, backgroundColor, textColor }) => (

  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, { backgroundColor, paddingHorizontal: 20 }]}
  >
    <View style={styles.box}>
      <View style={{ marginRight: 20, marginTop: 16 }}>
        <Checkbox shadow={2} value='test' isChecked={item.isCompleted} isDisabled={true} >
        </Checkbox>
      </View>
      <View >
        <Text style={{ fontSize: 18 }}>{item.title}</Text>
        <View style={styles.boxSub}>
          <Icon name='ondemand-video' size={20} />
          <Text style={{ fontSize: 15, marginLeft: 10 }}>{Math.floor(item.totalContentLength / 60)} phút</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
)
export default function YoutubePlayer() {
  const categories = ["Nội dung khóa học", "Đặt câu hỏi"]
  const video = React.useRef<Video>(null);
  const [categoryIndex, setCategoryIndex] = React.useState(0)
  const [status, setStatus] = React.useState({});
  const [selectedId, setSelectedId] = React.useState();
  const route = useRoute();
  const [chapterLectures, setChapterLectures] = React.useState<ChapterLectureFilter[]>([])
  const [currChapterLecture, setCurrChapterLecture] = React.useState<ChapterLectureFilter | null>(null)
  const courseId = route.params?.id as string;
  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     checkVideoProgress();
  //   }, 5000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  // const checkVideoProgress = async () => {
  //   if (video.current) {
  //     const status = await video.current.getStatusAsync();

  //     if (status.isLoaded && !status.isPlaying) {
  //       const videoDuration = status.durationMillis;
  //       const playbackPosition = status.positionMillis;
  //       const eightyPercent = (videoDuration as number) * 0.8;

  //       console.log(videoDuration, playbackPosition)
  //       if (playbackPosition >= eightyPercent && currChapterLecture && !currChapterLecture.isCompleted) {
  //         console.log('User reached 80% of the video!');
  //         handleSaveCompleteChapterLecture(currChapterLecture.id)
  //       }
  //     }
  //   }
  // };
  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded && !status.isPlaying) {
      const videoDuration = status.durationMillis;
      const playbackPosition = status.positionMillis;
      const eightyPercent = (videoDuration as number) * 0.8;

      console.log(videoDuration, playbackPosition)
      if (playbackPosition >= eightyPercent && currChapterLecture && !currChapterLecture.isCompleted) {
        console.log('User reached 80% of the video!');
        handleSaveCompleteChapterLecture(currChapterLecture.id)
      }
    }
  };

  useAuthMiddleware()

  function setOrientation() {
    if (Dimensions.get('window').height > Dimensions.get('window').width) {
      //Device is in portrait mode, rotate to landscape mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
    else {
      //Device is in landscape mode, rotate to portrait mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }

  const renderQuestionItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#CECADA" : COLORS.GRAY_300;
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

  console.log("[Detail id]", courseId)

  const handleGetChapterLectureStudy = async () => {
    const currChapterLecturesRes = await getChapterLectureOfLearnerStudy(courseId)
    setChapterLectures(currChapterLecturesRes.sort((a, b) => a.index - b.index))
  }

  const CategoryList = () => {
    return (
      <View style={styles.categoryContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => setCategoryIndex(index)}>
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
        onPress={() => { setSelectedId(item.id); setCurrChapterLecture(item as ChapterLectureFilter) }}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  const handleSaveCompleteChapterLecture = async (chapterLectureId: string) => {
    await saveUserLectureCompleted(chapterLectureId)
    handleGetChapterLectureStudy()
  }

  React.useEffect(() => {
    handleGetChapterLectureStudy()
  }, [])

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          // uri: 'https://capstone-be-7fef96e86ef9.herokuapp.com/video?id=chapter-lectures/videos/1ec1386d-db7b-4bd9-814c-503e8648249e.mp4',
          uri: `https://capstone-be-7fef96e86ef9.herokuapp.com/video?id=${currChapterLecture && currChapterLecture.video
            ? currChapterLecture.video
            : 'chapter-lectures/videos/dded2a31-a980-4727-88a8-aa328cedc3e9.mp4'
            }`,
        }}
        useNativeControls
        // onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        // resizeMode={ResizeMode.CONTAIN}
        resizeMode={ResizeMode.COVER}
        onFullscreenUpdate={setOrientation}
      // onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      <CategoryList />
      {categoryIndex === 0 ? (
        <FlatList
          data={chapterLectures}
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
    backgroundColor: COLORS.WHITE,
    width: '100%'
  },
  video: {
    width: "100%",
    height: 250,

  },
  box: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  boxSub: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20
  },
  categoryText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20
  },
  categoryTextSelected: {
    color: COLORS.RED_500,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: COLORS.RED_500,
  },
  tinyLogo: {
    width: 45,
    height: 45,
    borderRadius: 60,
    marginTop: 5
  },
  question: {
    flexDirection: 'row',
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
  },
  questionSub: {
    flexDirection: 'row',
    justifyContent: "flex-start",
    marginLeft: 60,
    paddingBottom: 10
  }

});
