import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { getImage } from '../../apis/image/components/apis';
import { useFocusEffect, useNavigation } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../libs/const/color';
import { OrderType, PageOptions } from '../../apis/courses/types';
import { getCoursesFeedback } from '../../apis/course-feedback/apis';
import { useCallback, useEffect, useState } from 'react';
import { CourseFeedbackFilterResponse } from '../../apis/course-feedback/types';
import { ResponseError } from '../../libs/types';

const MyCourse = ({ item, setShowReviewModal, setShowReportModal }) => {
  const navigation = useNavigation();

  const handleGetReviews = async () => {
    const pageOptions: PageOptions = {
      order: OrderType.DESC,
      page: 1,
      take: 48,
    };
    try {
      const response = await getCoursesFeedback(item.id, pageOptions);

      const userReviews: string[] = response.data.map(
        (review) => review.updatedBy
      );
    } catch (error) {
      const errorResponse = error as ResponseError;
      const msgError = errorResponse?.response?.data?.message || error.message;
      console.log('[My Course - get reviews error] ', msgError);
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleGetReviews();
    }, [])
  );
  return (
    <View style={[styles.item]}>
      <View style={styles.little}>
        <TouchableOpacity
          style={{ maxWidth: '50%' }}
          onPress={() => {
            navigation.navigate('videoPlayer', {
              id: item.id,
            });
          }}
        >
          <Image
            style={styles.tinyLogo}
            source={{
              uri: getImage(item.thumbnailUrl),
            }}
            alt="Course Thumbnail"
          />
        </TouchableOpacity>
        <View
          style={{
            width: '50%',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('videoPlayer', {
                id: item.id,
              });
            }}
          >
            <Text style={[styles.title, { color: COLORS.MAINPINK }]}>
              {item.title}
            </Text>
            <Text style={[styles.provider]}>
              <Ionicons name="md-logo-youtube" size={16} color="#ef4444" />
              &nbsp;{item.totalChapter} Bài học
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                marginTop: 12,
              }}
            >
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progress,
                    { width: `${item.completedPercent || 0}%` },
                  ]}
                ></View>
              </View>
              <Text>
                {Math.round((item.completedPercent * item.totalChapter) / 100)}/
                {item.totalChapter}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.icons}>
            <TouchableOpacity
              onPress={() => {
                setShowReviewModal(item.id);
              }}
            >
              <MaterialIcons name="rate-review" size={24} color={'grey'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowReportModal(item.id);
              }}
            >
              <Ionicons name="flag" size={20} color="grey" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MyCourse;

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 12,
    marginHorizontal: 24,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#0000001b',
    backgroundColor: '#fff',
  },
  little: {
    flexDirection: 'row',
    gap: 28,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  provider: {
    color: 'grey',
    marginBottom: 2,
  },
  tinyLogo: {
    height: 140,
    width: 140,
    borderRadius: 12,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  progressBar: {
    width: '70%',
    backgroundColor: '#e2e2e2',
    height: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#00000022',
  },
  progress: {
    height: '100%',
    borderRadius: 16,
    backgroundColor: COLORS.BLUE,
  },
});
