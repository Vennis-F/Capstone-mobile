import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
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
import { ResponseError, UserRole } from '../libs/types';
import { getRandomRangeInt } from '../libs/core/handle-price';
import { getUserRole } from '../libs/core/handle-token';
import { getCoursesDetailById } from '../apis/courses/api';
import { GetCourseDetailResponse } from '../apis/courses/types';
import QuestionTopic from '../components/VideoPlayer.tsx/QuestionTopic';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import QuestionModal from '../components/VideoPlayer.tsx/QuestionModal';
import AnswerModal from '../components/VideoPlayer.tsx/AnswerModal';
import { generateCertifcate } from '../apis/achivement/api';
import { showMessage } from 'react-native-flash-message';
import AchieveCourse from '../components/VideoPlayer.tsx/AchieveCourse';

export default function VideoPlayer() {
  const video = useRef<Video>(null);
  const route = useRoute();
  const courseId = route.params?.id as string;

  const [isPreloading, setIsPreloading] = useState(false);
  const [course, setCourse] = useState<GetCourseDetailResponse>();
  const [panel, setPanel] = useState('chapter');

  const [chapterLectures, setChapterLectures] = useState<
    ChapterLectureFilter[]
  >([]);
  const [currChapterLecture, setCurrChapterLecture] =
    useState<ChapterLectureFilter | null>(null);
  const [isComplete, setIsComplete] = useState(true);
  const [interval, setInterval] = useState(400);
  const [role, setRole] = useState<UserRole | null>(null);
  const [roleChange, setRoleChange] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState('');
  const [showAnswerModal, setShowAnswerModal] = useState('');

  const [refresh, setRefresh] = useState(false);

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (
      status.isLoaded &&
      status.isPlaying &&
      currChapterLecture &&
      !isComplete &&
      !isPreloading
    ) {
      const videoDuration = status.durationMillis;
      const playbackPosition = status.positionMillis;
      const eightyPercent = (videoDuration as number) * 0.8;

      if (playbackPosition >= eightyPercent) {
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

  const handleGeneratePdf = async (
    newChapterLectures: ChapterLectureFilter[]
  ) => {
    let totalCompleteds = 0;
    newChapterLectures.forEach((chapterLecture) => {
      if (chapterLecture.isCompleted) totalCompleteds += 1;
    });

    if (newChapterLectures.length === totalCompleteds) {
      try {
        await generateCertifcate(courseId);
        showMessage({
          message:
            'Chúc mừng bạn đã hoàn thành khóa học, bạn đã được nhận chứng chỉ',
          type: 'info',
          duration: 3200,
        });
      } catch (error) {
        const msg = error as ResponseError;
        const msgError = msg.response?.data?.message;
        console.log(
          '[VideoPlayer - create Certificate error] ',
          error,
          msgError
        );
      }
    }
  };

  const handleGetChapterLectureStudy = async (isGenerate: boolean) => {
    try {
      if (!isGenerate) {
        const currChapterLecturesRes = await getChapterLectureOfLearnerStudy(
          courseId
        );
        setChapterLectures(
          currChapterLecturesRes.sort((a, b) => a.index - b.index)
        );
      } else {
        const currChapterLecturesRes = await getChapterLectureOfLearnerStudy(
          courseId
        );
        await handleGeneratePdf(currChapterLecturesRes);
        setChapterLectures(
          currChapterLecturesRes.sort((a, b) => a.index - b.index)
        );
      }
    } catch (error) {
      console.log('[VideoPlayer - get Chapters error] ', error);
    }
  };

  const handleSaveCompleteChapterLecture = async (chapterLectureId: string) => {
    try {
      const chapterLecture = chapterLectures.find(
        (chapterLecturee) => chapterLecturee.id === chapterLectureId
      ) as ChapterLectureFilter;

      if (!chapterLecture.isCompleted && !isPreloading)
        await saveUserLectureCompleted(chapterLecture.id);
      setIsComplete(true);
      handleGetChapterLectureStudy(true);
    } catch (error) {
      const errorResponse = error as ResponseError;
      const msgError = errorResponse?.response?.data?.message || error;
      console.log('[VideoPlayer - Save compelete error] ', msgError, error);
    }
  };

  const getCourse = async () => {
    if (courseId) {
      try {
        const dataResponse = await getCoursesDetailById(courseId);
        setCourse(dataResponse);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useAuthMiddleware();

  const handleGetRole = async () => {
    const userRole = await getUserRole();
    if (role !== userRole) setRoleChange(true);
    else setRoleChange(false);
    setRole(userRole);
  };

  useFocusEffect(
    useCallback(() => {
      handleGetChapterLectureStudy(false);
      getCourse();
    }, [courseId])
  );

  useEffect(() => {
    if (roleChange) handleGetChapterLectureStudy(false);
  }, [roleChange]);

  useFocusEffect(
    useCallback(() => {
      setPanel('chapter');
      handleGetRole();
    }, [])
  );

  useEffect(() => {
    const isInclude = chapterLectures.some((chapter) => {
      return (
        JSON.stringify(currChapterLecture?.id) === JSON.stringify(chapter.id)
      );
    });
    if (
      (chapterLectures && (!currChapterLecture || !isInclude)) ||
      roleChange
    ) {
      const uncompleteChapter =
        chapterLectures.find((chapter) => chapter.isCompleted === false) ||
        chapterLectures[chapterLectures.length - 1] ||
        null;
      setCurrChapterLecture(uncompleteChapter);
      setRoleChange(false);
    }
  }, [chapterLectures]);

  useEffect(() => {
    setIsPreloading(true);
    const checkcomplete = currChapterLecture?.isCompleted === true;
    setIsComplete(checkcomplete);
    setInterval(getRandomRangeInt(400, 650));
  }, [currChapterLecture]);

  return (
    <View style={styles.container}>
      {currChapterLecture && currChapterLecture.video && (
        <View style={styles.videoContainer}>
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
        </View>
      )}

      {isPreloading && (
        <ActivityIndicator
          style={styles.loadingScreen}
          size={100}
          color={COLORS.MAINPINK}
        />
      )}
      {course && (
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 22 }}>{course.title}</Text>
          <Text style={{ color: 'grey', fontSize: 16 }}>
            {course.author.replace(/ +(?= )/g, '')}
          </Text>
        </View>
      )}
      <View style={styles.panelContainer}>
        <TouchableOpacity
          onPress={() => {
            setPanel('chapter');
          }}
          style={[
            styles.panel,
            panel === 'chapter' ? { borderBottomWidth: 2 } : null,
          ]}
        >
          <Text
            style={[
              styles.panelText,
              panel === 'chapter' ? { fontWeight: 'bold' } : null,
            ]}
          >
            Bài Giảng
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setPanel('question');
          }}
          style={[
            styles.panel,
            panel === 'question' ? { borderBottomWidth: 2 } : null,
          ]}
        >
          <Text
            style={[
              styles.panelText,
              panel === 'question' ? { fontWeight: 'bold' } : null,
            ]}
          >
            Câu Hỏi
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setPanel('achieve');
          }}
          style={[
            styles.panel,
            panel === 'achieve' ? { borderBottomWidth: 2 } : null,
          ]}
        >
          <Text
            style={[
              styles.panelText,
              panel === 'achieve' ? { fontWeight: 'bold' } : null,
            ]}
          >
            Thành Tựu
          </Text>
        </TouchableOpacity>

        {panel === 'question' && (
          <TouchableOpacity
            onPress={() => {
              setShowQuestionModal(currChapterLecture?.id || '');
            }}
            style={{ marginLeft: 'auto' }}
          >
            <MaterialCommunityIcons
              name="chat-plus"
              size={28}
              color={COLORS.MAINPINK}
            />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingTop: 12, marginBottom: 30 }}
      >
        {chapterLectures &&
          panel === 'chapter' &&
          chapterLectures.map((item, index) => {
            const backgroundColor =
              item.id === currChapterLecture?.id
                ? COLORS.MAINPINKSUPERBLUR
                : '#fff';
            const fontWeight =
              item.id === currChapterLecture?.id ? 'bold' : '500';
            return (
              <Chapter
                key={index}
                index={index}
                item={item}
                onPress={() => {
                  setTimeout(() => {
                    setCurrChapterLecture(item as ChapterLectureFilter);
                  }, 550);
                }}
                fontWeight={fontWeight}
                backgroundColor={backgroundColor}
              />
            );
          })}
        {panel === 'question' && (
          <QuestionTopic
            setRefresh={setRefresh}
            refresh={refresh}
            courseId={courseId}
            setShowAnswerModal={setShowAnswerModal}
          />
        )}
        {panel === 'achieve' && <AchieveCourse courseId={courseId} />}
      </ScrollView>
      <QuestionModal
        setShowQuestionModal={setShowQuestionModal}
        showQuestionModal={showQuestionModal}
        setRefresh={setRefresh}
      />
      <AnswerModal
        showAnswerModal={showAnswerModal}
        setShowAnswerModal={setShowAnswerModal}
        setRefresh={setRefresh}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    width: '100%',
  },
  videoContainer: {
    width: '100%',
    height: 250,
    backgroundColor: '#0000001c',
  },
  video: {
    width: '100%',
    height: 250,
  },
  loadingScreen: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
    backgroundColor: '#000',
    width: '100%',
    height: 250,
  },
  panelContainer: {
    flexDirection: 'row',
    paddingHorizontal: 4,
    paddingRight: 20,
    alignItems: 'center',
  },
  panel: {
    paddingBottom: 12,
    paddingHorizontal: 16,
    marginLeft: 4,
  },
  panelText: {
    fontSize: 16,
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
