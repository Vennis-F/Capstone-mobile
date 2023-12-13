import { Button, Center, Modal } from 'native-base';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput } from 'react-native';
import { COLORS } from '../../libs/const/color';
import { showMessage } from 'react-native-flash-message';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { CreateCourseReportBodyRequest } from '../../apis/course-report/types';
import { createCourseReportByCustomerOrLearner } from '../../apis/course-report/apis';

const ReportModal = ({ showReportModal, setShowReportModal }) => {
  const [loading, setLoading] = useState(false);

  const newValidationSchema = Yup.object().shape({
    description: Yup.string()
      .required('Xin hãy viết chi tiết phản hồi của bạn')
      .min(20, 'Phải hồi phải có trên 20 từ'),
  });

  const handleReport = async (body: CreateCourseReportBodyRequest) => {
    if (showReportModal) {
      try {
        setLoading(true);
        await createCourseReportByCustomerOrLearner(showReportModal, body);
        setLoading(false);
        setShowReportModal('');
        showMessage({
          message: 'Cảm ơn bạn vì đã báo cáo cải thiện khoá học',
          type: 'success',
          duration: 2500,
        });
      } catch (error) {
        setLoading(false);
        setShowReportModal('');
        showMessage({
          message: 'Báo cáo khoá học không thành công',
          type: 'warning',
          duration: 2500,
        });
        console.log('[ReportModal - Create Report error] ', error);
      }
    }
  };

  return (
    <Center>
      <Modal
        isOpen={showReportModal !== ''}
        onClose={() => setShowReportModal('')}
        avoidKeyboard
        size={'xl'}
      >
        <Formik
          validationSchema={newValidationSchema}
          initialValues={{
            description: '',
          }}
          onSubmit={(value) => {
            handleReport(value);
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
                  <TextInput
                    onBlur={handleBlur('description')}
                    value={values.description}
                    onChangeText={handleChange('description')}
                    multiline
                    style={styles.input}
                    placeholder="Hãy để lại phản hồi của bạn về khóa học ở đây để giúp chúng tôi cải thiện"
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
                        setShowReportModal('');
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
                          Báo cáo
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

export default ReportModal;

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: 'red',
  },
  body: {
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#00000044',
    padding: 8,
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
