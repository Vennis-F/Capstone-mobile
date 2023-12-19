import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { getImage } from '../../apis/image/components/apis';
import { timeSince } from '../../libs/core/handle-time';
import HTML from 'react-native-render-html';
import {
  QuestionAnswerFilterResponse,
  SearchFilterQuestionAnswerBodyRequest,
  SortFieldSearchFilterQuestionTopic,
} from '../../apis/question-topic/types';
import { OrderType } from '../../libs/types';
import { searchFilterQuestionAnswer } from '../../apis/question-topic/api';
import { useEffect, useState } from 'react';

const AnswerTopic = ({ questionId, repFresh, setRepFresh }) => {
  const [answers, setAnswers] = useState<QuestionAnswerFilterResponse[]>([]);

  const handleGetAnswer = async () => {
    const body: SearchFilterQuestionAnswerBodyRequest = {
      active: true,
      questionTopicId: questionId,
      sortField: SortFieldSearchFilterQuestionTopic.UPDATED_DATE,
      pageOptions: {
        order: OrderType.ASC,
        page: 1,
        take: 20,
      },
    };
    try {
      const response = await searchFilterQuestionAnswer(body);
      setAnswers(response.data);
    } catch (error) {
      console.log('[AnswerTopic - get answer error] ', error);
    }
  };

  useEffect(() => {
    if (questionId) {
      handleGetAnswer();
    }
  }, [questionId]);

  useEffect(() => {
    if (repFresh) {
      handleGetAnswer();
      setRepFresh(false);
    }
  }, [repFresh]);

  return (
    <View>
      {answers &&
        answers.map((answer, index) => {
          const user = answer.user;
          const learner = answer.learner;
          const imgUrl = user?.avatar
            ? { uri: getImage(user.avatar) }
            : require('../../assets/images/avatar.png');

          const userFullName = user
            ? `${user?.lastName.trim()} ${user?.middleName.trim()} ${user?.firstName.trim()} `
            : `${learner?.lastName.trim()} ${learner?.middleName.trim()} ${learner?.firstName.trim()} `;
          return (
            <View key={index} style={styles.container}>
              <View style={styles.header}>
                <Image source={imgUrl} style={styles.image} />
                <View style={styles.headerInfo}>
                  <View style={styles.box}>
                    <Text style={styles.userName}>{userFullName}</Text>
                    <Text style={styles.timeAgo}>
                      {timeSince(new Date(answer.updatedDate))}
                    </Text>
                  </View>
                  <HTML
                    source={{ html: answer.description }}
                    contentWidth={300}
                    tagsStyles={{
                      h2: {
                        fontSize: 14,
                        paddingHorizontal: 8,
                        fontStyle: 'italic',
                        margin: 0,
                      },
                      strong: {
                        fontWeight: '500',
                      },
                      p: {
                        fontSize: 14,
                        paddingHorizontal: 8,
                        fontStyle: 'italic',
                        margin: 0,
                      },
                    }}
                  />
                </View>
              </View>
            </View>
          );
        })}
    </View>
  );
};

export default AnswerTopic;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginHorizontal: 12,
    marginTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#00000052',
    width: '80%',
    alignSelf: 'flex-end',
  },
  header: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginBottom: 4,
  },
  headerInfo: {
    width: '80%',
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 999,
  },
  box: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeAgo: {
    color: 'grey',
    fontSize: 13,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
  },
});
