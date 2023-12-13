import { Button, Center, FormControl, Input, Modal } from 'native-base';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import { COLORS } from '../../libs/const/color';
import { CreateCourseFeedbackBodyRequest } from '../../apis/course-feedback/types';
import { createCourseFeedback } from '../../apis/course-feedback/apis';
import { showMessage } from 'react-native-flash-message';
import * as Yup from 'yup';
import { Formik } from 'formik';

const ReviewModal = ({ showReviewModal, setShowReviewModal }) => {
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const newValidationSchema = Yup.object().shape({
    review: Yup.string()
      .required('Xin hãy viết đánh giá của bạn')
      .min(20, 'Bài đánh giá phải có trên 20 từ'),
  });

  const handleFeedback = async (value) => {
    const body: CreateCourseFeedbackBodyRequest = {
      description: value.review.trim(),
      ratedStar: rating,
    };
    if (showReviewModal) {
      try {
        setLoading(true);
        await createCourseFeedback(showReviewModal, body);
        setLoading(false);
        setShowReviewModal('');
        showMessage({
          message: 'Cảm ơn bạn vì đã đánh giá khoá học',
          type: 'success',
          duration: 2500,
        });
      } catch (error) {
        setLoading(false);
        setShowReviewModal('');
        showMessage({
          message: 'Đánh giá khoá học không thành công',
          type: 'warning',
          duration: 2500,
        });
        console.log('[ReviewModal - Create Feedback error] ', error);
      }
    }
  };

  useEffect(() => {
    setRating(0);
  }, [showReviewModal]);

  return (
    <Center>
      <Modal
        isOpen={showReviewModal !== ''}
        onClose={() => setShowReviewModal('')}
        avoidKeyboard
        size={'xl'}
      >
        <Formik
          validationSchema={newValidationSchema}
          initialValues={{
            review: '',
          }}
          onSubmit={(value) => {
            handleFeedback(value);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
            dirty,
          }) => (
            <>
              <Modal.Content maxWidth="400px">
                <Modal.Header style={styles.header}>
                  <Text
                    style={{ color: 'white', fontSize: 16, fontWeight: '600' }}
                  >
                    Báo Cáo Khóa Học
                  </Text>
                </Modal.Header>
                <Modal.Body style={styles.body}>
                  <StarRating
                    rating={rating}
                    onChange={setRating}
                    enableHalfStar={false}
                  />
                  <TextInput
                    onBlur={handleBlur('review')}
                    value={values.review}
                    onChangeText={handleChange('review')}
                    multiline
                    style={styles.input}
                    placeholder="Hãy cho chúng tôi biết trải nghiệm cá nhân của riêng bạn khi tham gia khóa học này"
                  />
                  {errors.review && (
                    <Text style={{ fontSize: 12, color: 'red' }}>
                      {errors.review}
                    </Text>
                  )}
                </Modal.Body>
                <Modal.Footer style={styles.footer}>
                  <Button.Group space={2}>
                    <Button
                      variant="ghost"
                      colorScheme="blueGray"
                      onPress={() => {
                        setShowReviewModal('');
                      }}
                    >
                      Hủy
                    </Button>
                    <Button
                      style={[
                        styles.reviewBtn,
                        (!isValid || !dirty) && { backgroundColor: 'grey' },
                      ]}
                      onPress={handleSubmit}
                      disabled={!isValid || loading}
                    >
                      {loading ? (
                        <ActivityIndicator size={'small'} color={'#fff'} />
                      ) : (
                        <Text style={{ color: '#fff', fontWeight: '600' }}>
                          Đánh Giá
                        </Text>
                      )}
                    </Button>
                  </Button.Group>
                </Modal.Footer>
              </Modal.Content>
            </>
          )}
        </Formik>
      </Modal>
    </Center>
  );
};

export default ReviewModal;

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: COLORS.MAINPINK,
  },
  body: {
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#00000044',
    padding: 8,
    marginTop: 20,
    marginHorizontal: 12,
  },
  footer: {
    borderTopWidth: 0,
  },
  reviewBtn: {
    backgroundColor: COLORS.MAINPINK,
    marginLeft: 20,
  },
});
