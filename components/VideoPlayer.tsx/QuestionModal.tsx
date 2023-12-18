import { Button, Center, Modal } from 'native-base';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput } from 'react-native';
import { COLORS } from '../../libs/const/color';
import { showMessage } from 'react-native-flash-message';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { CreateCourseReportBodyRequest } from '../../apis/course-report/types';
import { createCourseReportByCustomerOrLearner } from '../../apis/course-report/apis';
import { CreateQuestionTopicBodyRequest } from '../../apis/question-topic/types';
import { createQuestionTopic } from '../../apis/question-topic/api';

const QuestionModal = ({
  showQuestionModal,
  setShowQuestionModal,
  setRefresh,
}) => {
  const [loading, setLoading] = useState(false);

  const newValidationSchema = Yup.object().shape({
    title: Yup.string().required('Hãy đặt tựa đề cho câu hỏi của bạn'),
    description: Yup.string()
      .required('Xin hãy viết chi tiết câu hỏi của bạn')
      .min(10, 'Phải hồi phải có trên 10 từ'),
  });

  const handleCreateQuestion = async (body: CreateQuestionTopicBodyRequest) => {
    if (showQuestionModal) {
      try {
        setLoading(true);
        await createQuestionTopic(showQuestionModal, body);
        setLoading(false);
        setShowQuestionModal('');
        setRefresh(true);
        showMessage({
          message: 'Đặt câu hỏi thành công',
          type: 'success',
          duration: 2500,
        });
      } catch (error) {
        setLoading(false);
        setShowQuestionModal('');
        showMessage({
          message: 'Đặt câu hỏi không thành công',
          type: 'warning',
          duration: 2500,
        });
        console.log('[QuestionModal - Create Question error] ', error);
      }
    }
  };

  return (
    <Center>
      <Modal
        isOpen={showQuestionModal !== ''}
        onClose={() => setShowQuestionModal('')}
        avoidKeyboard
        size={'xl'}
      >
        <Formik
          validationSchema={newValidationSchema}
          initialValues={{
            title: '',
            description: '',
          }}
          onSubmit={(value) => {
            handleCreateQuestion(value);
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
                    Đặt Câu Hỏi Cho Bài Giảng
                  </Text>
                </Modal.Header>
                <Modal.Body style={styles.body}>
                  <TextInput
                    onBlur={handleBlur('title')}
                    value={values.title}
                    onChangeText={handleChange('title')}
                    style={styles.input}
                    placeholder="Hãy đặt tựa đề cho câu hỏi"
                  />
                  {errors.title && (
                    <Text style={{ fontSize: 12, color: 'red' }}>
                      {errors.title}
                    </Text>
                  )}
                  <TextInput
                    onBlur={handleBlur('description')}
                    value={values.description}
                    onChangeText={handleChange('description')}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    style={styles.input}
                    placeholder="Hãy viết chi tiết thắc mắc của bạn ở đây"
                  />
                  {errors.description && (
                    <Text style={{ fontSize: 12, color: 'red' }}>
                      {errors.description}
                    </Text>
                  )}
                </Modal.Body>
                <Modal.Footer style={styles.footer}>
                  <Button.Group space={2}>
                    <Button
                      variant="ghost"
                      colorScheme="blueGray"
                      onPress={() => {
                        setShowQuestionModal('');
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
                          Đặt câu hỏi
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

export default QuestionModal;

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: COLORS.MAINPINK,
  },
  body: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    borderColor: '#00000044',
    padding: 8,
    marginHorizontal: 12,
    marginTop: 12,
  },
  footer: {
    borderTopWidth: 0,
  },
  reviewBtn: {
    backgroundColor: COLORS.MAINPINK,
    marginLeft: 20,
  },
});
