import { Button, Center, Modal } from 'native-base';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput } from 'react-native';
import { COLORS } from '../../libs/const/color';
import { showMessage } from 'react-native-flash-message';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { CreateQuestionAnswerBodyRequest } from '../../apis/question-topic/types';
import { createQuestionAnswer } from '../../apis/question-topic/api';

const AnswerModal = ({ showAnswerModal, setShowAnswerModal, setRefresh }) => {
  const [loading, setLoading] = useState(false);

  const newValidationSchema = Yup.object().shape({
    description: Yup.string().required('Xin hãy viết câu trả lời của bạn'),
  });

  const handleCreateAnswer = async (body: CreateQuestionAnswerBodyRequest) => {
    if (showAnswerModal) {
      try {
        setLoading(true);
        await createQuestionAnswer(body);
        setLoading(false);
        setShowAnswerModal('');
        setRefresh(true);
        showMessage({
          message: 'Câu trả lời đã được gửi thành công',
          type: 'success',
          duration: 2500,
        });
      } catch (error) {
        setLoading(false);
        setShowAnswerModal('');
        showMessage({
          message: 'Gửi câu trả lời không thành công',
          type: 'warning',
          duration: 2500,
        });
        console.log('[AnswerModal - Create Answer error] ', error);
      }
    }
  };

  return (
    <Center>
      <Modal
        isOpen={showAnswerModal !== ''}
        onClose={() => setShowAnswerModal('')}
        avoidKeyboard
        size={'xl'}
      >
        <Formik
          enableReinitialize={true}
          validationSchema={newValidationSchema}
          initialValues={{
            description: '',
            questionTopicId: showAnswerModal,
          }}
          onSubmit={(value) => {
            handleCreateAnswer(value);
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
                    Trả Lời Cho Câu Hỏi trên
                  </Text>
                </Modal.Header>
                <Modal.Body style={styles.body}>
                  <TextInput
                    onBlur={handleBlur('description')}
                    value={values.description}
                    onChangeText={handleChange('description')}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    style={styles.input}
                    placeholder="Hãy viết câu trả lời của bạn ở đây"
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
                        setShowAnswerModal('');
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

export default AnswerModal;

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: COLORS.SELECTYELLOW,
  },
  body: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    borderColor: '#00000044',
    padding: 8,
    marginHorizontal: 4,
  },
  footer: {
    borderTopWidth: 0,
  },
  reviewBtn: {
    backgroundColor: COLORS.MAINPINK,
    marginLeft: 20,
  },
});
