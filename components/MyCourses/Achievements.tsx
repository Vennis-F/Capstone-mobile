import { View, Text, StyleSheet } from 'react-native';
import { getUserMainInfo } from '../../libs/core/handle-token';
import { UserRole } from '../../libs/types';
import { getCourseByCustomer } from '../../apis/courses/api';
import { getCourseForLearnerSearchByUser } from '../../apis/learner/api';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  CourseFilterResponse,
  CourseLearnerFilterResponse,
} from '../../apis/courses/types';
import { getCertificate, getListAchievements } from '../../apis/achivement/api';
import { ViewAchievementReponse } from '../../apis/achivement/types';
import * as Print from 'expo-print';
import { Button, ScrollView } from 'native-base';
import { COLORS } from '../../libs/const/color';
import { FontAwesome5 } from '@expo/vector-icons';
import Achieve from './Achieve';

const Achievements = () => {
  const [achievements, setAchievements] = useState<ViewAchievementReponse[]>(
    []
  );
  const [uri, setUri] = useState();

  const handleGetCertificates = async () => {
    try {
      const response = await getListAchievements();
      setAchievements(response);
    } catch (error) {
      console.log('[AchieveCourse - get certificates error] ', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleGetCertificates();
    }, [])
  );

  return (
    <ScrollView>
      {achievements.length >= 1 &&
        achievements.map((achieve, index) => {
          return (
            <View key={index}>
              <Achieve achieve={achieve} />
            </View>
          );
        })}
    </ScrollView>
  );
};

export default Achievements;

const styles = StyleSheet.create({});
