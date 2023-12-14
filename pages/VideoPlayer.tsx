import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { Checkbox } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../libs/const/color';
import { useRoute } from '@react-navigation/native';

import { ChapterLectureFilter } from '../apis/chapter-lecture/types';
import {
  getChapterLectureOfLearnerStudy,
  saveUserLectureCompleted,
} from '../apis/chapter-lecture/api';
import { useAuthMiddleware } from '../components/useAuthMiddleware';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Dimensions } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { ActivityIndicator } from 'react-native';
import Chapter from '../components/VideoPlayer.tsx/Chapter';
import { ResponseError } from '../libs/types';
import { getRandomInt, getRandomRangeInt } from '../libs/core/handle-price';

export default function VideoPlayer() {
  const video = useRef<Video>(null);
  const route = useRoute();
  const courseId = route.params?.id as string;

  const [isPreloading, setIsPreloading] = useState(false);

  const [chapterLectures, setChapterLectures] = useState<
    ChapterLectureFilter[]
  >([]);
  const [currChapterLecture, setCurrChapterLecture] =
    useState<ChapterLectureFilter | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [interval, setInterval] = useState(400);

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (
      status.isLoaded &&
      status.isPlaying &&
      currChapterLecture &&
      !isComplete
    ) {
      const videoDuration = status.durationMillis;
      const playbackPosition = status.positionMillis;
      const eightyPercent = (videoDuration as number) * 0.8;

      console.log(eightyPercent, playbackPosition);
      if (playbackPosition >= eightyPercent) {
        console.log('User reached 80% of the video!');
        setIsComplete(true);
        handleSaveCompleteChapterLecture(currChapterLecture.id);
      }
    }
  };

  function setOrientation() {
    if (Dimensions.get('window').height > Dimensions.get('window').width) {
      //Device is in portrait mode, rotate to landscape mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      //Device is in landscape mode, rotate to portrait mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }

  const handleGetChapterLectureStudy = async () => {
    try {
      const currChapterLecturesRes = await getChapterLectureOfLearnerStudy(
        courseId
      );
      setChapterLectures(
        currChapterLecturesRes.sort((a, b) => a.index - b.index)
      );
    } catch (error) {
      console.log('[VideoPlayer - get Chapters error] ', error);
    }
  };

  const handleSaveCompleteChapterLecture = async (chapterLectureId: string) => {
    try {
      await saveUserLectureCompleted(chapterLectureId);
      setIsComplete(true);
      console.log(chapterLectureId);
      handleGetChapterLectureStudy();
    } catch (error) {
      const errorResponse = error as ResponseError;
      const msgError = errorResponse?.response?.data?.message || error;
      console.log('[VideoPlayer - Save compelete error] ', errorResponse);
    }
  };

  useAuthMiddleware();

  useFocusEffect(
    useCallback(() => {
      handleGetChapterLectureStudy();
    }, [courseId])
  );

  // useEffect(() => {
  //   if (chapterLectures) {
  //     const uncompleteChapter =
  //       chapterLectures.find((chapter) => chapter.isCompleted === false) ||
  //       null;
  //     setCurrChapterLecture(uncompleteChapter);
  //   }
  // }, [courseId, chapterLectures]);

  useEffect(() => {
    const isInclude = chapterLectures.some((chapter) => {
      return (
        JSON.stringify(currChapterLecture?.id) === JSON.stringify(chapter.id)
      );
    });

    if (chapterLectures && (!currChapterLecture || !isInclude)) {
      const uncompleteChapter =
        chapterLectures.find((chapter) => chapter.isCompleted === false) ||
        chapterLectures[chapterLectures.length - 1] ||
        null;
      setCurrChapterLecture(uncompleteChapter);
    }
  }, [chapterLectures]);

  useEffect(() => {
    setIsComplete(currChapterLecture?.isCompleted || false);
    setInterval(getRandomRangeInt(400, 650));
  }, [currChapterLecture]);

  return (
    <View style={styles.container}>
      {currChapterLecture && currChapterLecture.video && (
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: `https://capstone-be-7fef96e86ef9.herokuapp.com/video?id=${currChapterLecture.video}`,
          }}
          useNativeControls
          shouldPlay={false}
          progressUpdateIntervalMillis={interval}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
          resizeMode={ResizeMode.CONTAIN}
          onFullscreenUpdate={setOrientation}
          onLoadStart={() => setIsPreloading(true)}
          onReadyForDisplay={() => setIsPreloading(false)}
        />
      )}

      {isPreloading && (
        <ActivityIndicator
          style={styles.loadingScreen}
          size={122}
          color={COLORS.MAINPINK}
        />
      )}

      {chapterLectures.map((item, index) => {
        const backgroundColor =
          item.id === currChapterLecture?.id ? '#e49712' : '#fff';
        return (
          <Chapter
            key={index}
            item={item}
            onPress={() => {
              setCurrChapterLecture(item as ChapterLectureFilter);
            }}
            backgroundColor={backgroundColor}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
    width: '100%',
  },
  video: {
    width: '100%',
    height: 250,
  },
  loadingScreen: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
    backgroundColor: '#00000062',
    width: '100%',
    height: 250,
  },

  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  categoryText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
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
    marginTop: 5,
  },
  question: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  questionSub: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 60,
    paddingBottom: 10,
  },
});
