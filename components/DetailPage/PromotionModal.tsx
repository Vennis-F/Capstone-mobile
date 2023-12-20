import { Button, Center, Modal } from 'native-base';
import { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { COLORS } from '../../libs/const/color';
import { showMessage } from 'react-native-flash-message';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { CreateQuestionAnswerBodyRequest } from '../../apis/question-topic/types';
import { createQuestionAnswer } from '../../apis/question-topic/api';
import { View } from '../Themed';
import { Entypo } from '@expo/vector-icons';
import { PromotionCourse } from '../../apis/promotion/types';
import { checkPromotionCourseCanApplyByCode } from '../../apis/promotion/api';

const PromotionModal = ({
  showPromtionModal,
  setShowPromtionModal,
  availablePromotion,
  courseId,
  setCurrPromotion,
}: {
  showPromtionModal: boolean;
  setShowPromtionModal: React.Dispatch<React.SetStateAction<boolean>>;
  availablePromotion: PromotionCourse[];
  courseId: string;
  setCurrPromotion: React.Dispatch<
    React.SetStateAction<PromotionCourse | undefined>
  >;
}) => {
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  const [list, setList] = useState(false);

  const newValidationSchema = Yup.object().shape({
    code: Yup.string().required('Xin hãy nhập mã giảm giá'),
  });

  const handleCheckCode = async ({ code }: { code: string }) => {
    if (showPromtionModal && code && courseId) {
      try {
        setLoading(true);
        const { promotionCourse } = await checkPromotionCourseCanApplyByCode(
          courseId,
          code
        );
        setLoading(false);
        if (promotionCourse) {
          setCurrPromotion(promotionCourse);
          setCode('');
          setShowPromtionModal(false);
          showMessage({
            message: 'Áp mã giảm giá thành công!',
            type: 'success',
            duration: 2500,
          });
        } else {
          showMessage({
            message: 'Mã giảm giá không tồn tại',
            type: 'warning',
            duration: 2500,
          });
        }
      } catch (error) {
        setLoading(false);
        setShowPromtionModal(false);
        showMessage({
          message: 'Không thể áp dụng mã giảm giá',
          type: 'warning',
          duration: 2500,
        });
        console.log('[PromtionModal - Create Answer error] ', error);
      }
    }
  };

  return (
    <Modal
      style={styles.modal}
      isOpen={showPromtionModal}
      onClose={() => {
        setList(false);
        setCode('');
        setShowPromtionModal(false);
      }}
      avoidKeyboard
      size={'xl'}
    >
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        enableReinitialize={true}
        validationSchema={newValidationSchema}
        initialValues={{
          code: code,
        }}
        onSubmit={(value) => {
          handleCheckCode(value);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <>
            <Modal.Content maxWidth="400px">
              <Modal.Header style={styles.header}>
                <Text
                  style={{ color: 'white', fontSize: 16, fontWeight: '600' }}
                >
                  Nhập mã giảm giá của bạn ở đây
                </Text>
              </Modal.Header>
              <Modal.Body style={styles.body}>
                <View style={{ width: '70%' }}>
                  <View style={styles.inputContainer}>
                    <TextInput
                      onBlur={handleBlur('code')}
                      value={values.code}
                      onChangeText={handleChange('code')}
                      style={styles.input}
                      placeholder="Mã giảm giá"
                    />
                    <TouchableOpacity onPress={() => setList(!list)}>
                      <Entypo
                        name="select-arrows"
                        size={24}
                        color={
                          availablePromotion.length >= 1
                            ? COLORS.MAINPINK
                            : 'grey'
                        }
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.code && (
                    <Text style={{ fontSize: 12, color: 'red', marginLeft: 4 }}>
                      {errors.code}
                    </Text>
                  )}
                  {availablePromotion.length >= 1 && list && (
                    <View style={styles.promotionContainer}>
                      {availablePromotion.map((myPromotion, index) => {
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              setCode(myPromotion.promotion.code);
                            }}
                            key={index}
                            style={styles.promotion}
                          >
                            <Text>
                              Giảm {myPromotion.promotion.discountPercent} % -
                              (còn{' '}
                              {myPromotion.promotion.amount - myPromotion.used}{' '}
                              lượt)
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  )}
                </View>
                <Button
                  style={[
                    styles.reviewBtn,
                    !isValid && { backgroundColor: 'grey' },
                  ]}
                  onPress={handleSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator size={'small'} color={'#fff'} />
                  ) : (
                    <Text style={{ color: '#fff', fontWeight: '600' }}>
                      Áp dụng
                    </Text>
                  )}
                </Button>
              </Modal.Body>
            </Modal.Content>
          </>
        )}
      </Formik>
    </Modal>
  );
};

export default PromotionModal;

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    top: 20,
  },
  header: {
    alignItems: 'center',
    backgroundColor: COLORS.BLUESTEEL,
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00000044',
    padding: 8,
    marginHorizontal: 4,
  },
  input: {
    width: '90%',
  },
  footer: {
    borderTopWidth: 0,
  },
  promotionContainer: {
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#00000044',
    borderTopWidth: 0,
    marginLeft: 4,
    width: '100%',
  },
  promotion: {
    marginVertical: 8,
  },
  reviewBtn: {
    width: '25%',
    height: 46,
    backgroundColor: COLORS.BLUESTEEL,
    marginLeft: 20,
  },
});
