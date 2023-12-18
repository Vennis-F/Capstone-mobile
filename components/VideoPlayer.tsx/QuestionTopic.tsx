import { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {
  searchFilterQuestionAnswer,
  searchFilterQuestionTopic,
} from '../../apis/question-topic/api';
import {
  QuestionAnswerFilterResponse,
  QuestionTopicFilterResponse,
  SearchFilterQuestionAnswerBodyRequest,
  SearchFilterQuestionTopicBodyRequest,
  SortFieldSearchFilterQuestionTopic,
} from '../../apis/question-topic/types';
import { OrderType } from '../../libs/types';
import { useFocusEffect } from 'expo-router';
import { getImage } from '../../apis/image/components/apis';
import { timeSince } from '../../libs/core/handle-time';
import HTML from 'react-native-render-html';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../libs/const/color';
import AnswerTopic from './AnswerTopic';
import { Button } from 'native-base';

const QuestionTopic = ({
  courseId,
  refresh,
  setRefresh,
  setShowAnswerModal,
}) => {
  const [questions, setQuestions] = useState<QuestionTopicFilterResponse[]>([]);
  const [questionId, setQuestionId] = useState('');
  const [repFresh, setRepFresh] = useState(false);

  const handleGetQuestions = async () => {
    const body: SearchFilterQuestionTopicBodyRequest = {
      active: true,
      courseId: courseId,
      sortField: SortFieldSearchFilterQuestionTopic.UPDATED_DATE,
      pageOptions: {
        order: OrderType.DESC,
        page: 1,
        take: 20,
      },
    };
    try {
      const response = await searchFilterQuestionTopic(body);
      setQuestions(response.data);
    } catch (error) {
      console.log('[QuestionTopic - get question error] ', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleGetQuestions();
      setQuestionId('');
    }, [])
  );

  useEffect(() => {
    if (refresh) {
      handleGetQuestions();
      setRepFresh(true);
      setRefresh(false);
    }
  }, [refresh]);

  return (
    <View>
      {questions.length < 1 && (
        <Text style={styles.EmptyText}>
          Hiện khóa học chưa có câu hỏi nào. Hãy đặt câu hỏi nếu có thắc mắc
          nhé.
        </Text>
      )}
      {questions &&
        questions.map((question, index) => {
          const user = question.user;
          const learner = question.learner;

          const imgUrl = user?.avatar
            ? getImage(user.avatar)
            : getImage('../../assets/images/avatar.png');

          const userFullName = user
            ? `${user?.lastName.trim()} ${user?.middleName.trim()} ${user?.firstName.trim()} `
            : `${learner?.lastName.trim()} ${learner?.middleName.trim()} ${learner?.firstName.trim()} `;
          return (
            <View key={index}>
              <TouchableOpacity
                onPress={() => {
                  if (!questionId || questionId !== question.id) {
                    setQuestionId(question.id);
                  } else {
                    setQuestionId('');
                  }
                }}
                style={styles.container}
              >
                <View style={styles.header}>
                  <Image source={{ uri: imgUrl }} style={styles.image} />
                  <View style={styles.headerInfo}>
                    <View style={styles.box}>
                      <Text numberOfLines={1} style={styles.titleText}>
                        {question.title}
                      </Text>
                      <Text style={styles.timeAgo}>
                        {timeSince(new Date(question.updatedDate))}
                      </Text>
                    </View>
                    <View style={styles.box}>
                      <Text style={styles.userName}>{userFullName}</Text>
                      <View style={styles.replies}>
                        <Ionicons
                          name="chatbubble-ellipses"
                          size={24}
                          color={COLORS.MAINPINKBLUR}
                        />
                        <Text>{question.totalLengthQuestionAnswers}</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <HTML
                  source={{ html: question.description }}
                  contentWidth={300}
                  tagsStyles={{
                    h2: {
                      fontSize: 16,
                      paddingHorizontal: 8,
                      fontStyle: 'italic',
                      margin: 0,
                      lineHeight: 24,
                    },
                    strong: {
                      fontWeight: '500',
                    },
                    p: {
                      fontSize: 16,
                      paddingHorizontal: 8,
                      margin: 0,
                      fontStyle: 'italic',
                    },
                  }}
                />
              </TouchableOpacity>
              {questionId === question.id && (
                <AnswerTopic
                  questionId={questionId}
                  repFresh={repFresh}
                  setRepFresh={setRepFresh}
                />
              )}
              {questionId === question.id && (
                <Button
                  onPress={() => {
                    setShowAnswerModal(question.id);
                  }}
                  style={styles.repBtn}
                >
                  <Text
                    style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}
                  >
                    Trả lời
                  </Text>
                </Button>
              )}
            </View>
          );
        })}
    </View>
  );
};

export default QuestionTopic;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginHorizontal: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#00000052',
    borderRadius: 20,
    marginBottom: 12,
  },
  EmptyText: {
    fontSize: 20,
    marginHorizontal: 40,
    textAlign: 'center',
    marginTop: 30,
  },
  header: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
  },
  headerInfo: {
    width: '80%',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#0000008a',
  },
  image: {
    height: 52,
    width: 52,
    borderRadius: 999,
  },
  box: {
    width: '100%',
    paddingRight: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
    maxWidth: '80%',
  },
  timeAgo: {
    color: 'grey',
    fontSize: 13,
  },
  userName: {
    color: 'grey',
    fontSize: 12,
    maxWidth: '80%',
  },
  replies: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  repBtn: {
    width: 80,
    marginLeft: 'auto',
    marginRight: 20,
    backgroundColor: COLORS.MAINPINKBLUR,
    marginBottom: 20,
    marginTop: 12,
  },
});
