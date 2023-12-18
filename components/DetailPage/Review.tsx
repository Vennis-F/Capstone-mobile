import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import HTML from 'react-native-render-html';
import { getCoursesFeedback } from '../../apis/course-feedback/apis';
import { OrderType, PageOptions } from '../../libs/types';
import { CourseFeedbackFilterResponse } from '../../apis/course-feedback/types';
import { Button } from 'native-base';
import { COLORS } from '../../libs/const/color';
import { formatStringtoDate, timeSince } from '../../libs/core/handle-time';
import StarRating from '../RatingStars';

const Review = ({ course, id }) => {
  const [reviews, setReviews] = useState<CourseFeedbackFilterResponse[]>([]);
  const [sortPressed, setSortPressed] = useState(OrderType.DESC);

  const handleGetReviews = async () => {
    const pageOptions: PageOptions = {
      order: sortPressed,
      page: 1,
      take: 5,
    };
    try {
      const response = await getCoursesFeedback(id, pageOptions);
      setReviews(response.data);
    } catch (error) {
      console.log('[Review - get reviews error] ', error);
    }
  };

  useEffect(() => {
    handleGetReviews();
  }, [id, sortPressed]);

  console.log('[Review - reviews] ', reviews);
  return (
    <View style={styles.container}>
      <Text style={styles.review}>Đánh giá về khóa học</Text>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => {
            setSortPressed(OrderType.DESC);
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Mới nhất</Text>
        </Button>
        <Button
          onPress={() => {
            setSortPressed(OrderType.ASC);
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Cũ nhất</Text>
        </Button>
      </View>
      {reviews.map((review, index) => {
        return (
          <View style={styles.reviewContainer} key={index}>
            <View style={styles.userInfo}>
              <Image
                source={require('../../assets/images/avatar.png')}
                alt="avatar"
                style={styles.avatar}
              />
              <Text style={styles.userName}>
                {review.updatedBy && review.insertedBy}
              </Text>
              <Text style={styles.timeAgo}>
                {timeSince(new Date(review.updatedDate && review.insertedDate))}{' '}
              </Text>
            </View>
            <Text style={styles.description}>{review.description}</Text>
            <View style={styles.stars}>
              <StarRating rating={review.ratedStar} />
              <Text style={styles.starNumber}>{review.ratedStar}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    minHeight: 400,
  },
  review: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingBottom: 8,
  },
  button: {
    width: 90,
    height: 40,
    marginBottom: 8,
    borderRadius: 30,
    backgroundColor: COLORS.MAINPINK,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  reviewContainer: {
    borderTopWidth: 1,
    borderTopColor: '#0000002a',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    gap: 12,
    marginVertical: 12,
    alignItems: 'center',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 100,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    maxWidth: '70%',
  },
  timeAgo: {
    marginLeft: 'auto',
    color: 'grey',
  },
  description: {
    fontSize: 14,
  },
  stars: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  starNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0000007e',
  },
});

export default Review;
