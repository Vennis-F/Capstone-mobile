import { Button, Center, Modal } from 'native-base';
import { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from 'react-native';
import { COLORS } from '../../libs/const/color';
import { showMessage } from 'react-native-flash-message';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { CreateCourseReportBodyRequest } from '../../apis/course-report/types';
import { createCourseReportByCustomerOrLearner } from '../../apis/course-report/apis';
import {
  createCustomerDrawing,
  updateCustomerDrawingImage,
} from '../../apis/customer-drawing/api';
import {
  CreateCustomerDrawingBodyRequest,
  CustomerDrawing,
} from '../../apis/customer-drawing/types';
import { ResponseError } from '../../libs/types';
import * as ImagePicker from 'expo-image-picker';

const DrawingModal = ({
  showDrawingModal,
  setShowDrawingModal,
  getMyDrawings,
  getDrawings,
}) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [body, setBody] = useState(null);

  const newValidationSchema = Yup.object().shape({
    title: Yup.string().required('Hãy thêm tiêu đề cho tranh vẽ của bạn'),
    description: Yup.string()
      .required('Hãy thêm miêu tả chi tiết cho bức tranh')
      .min(20, 'Phải hồi phải có trên 15 từ'),
  });

  const handleCreateDrawing = async (
    values: CreateCustomerDrawingBodyRequest
  ) => {
    if (showDrawingModal) {
      try {
        return await createCustomerDrawing(showDrawingModal, values);
      } catch (error) {
        console.log('[DrawingModal - Create Drawing error] ', error);
      }
    }
  };

  const handleUploadDrawing = async (customerDrawingId: string) => {
    if (customerDrawingId && body) {
      try {
        console.log(body);
        await updateCustomerDrawingImage(customerDrawingId, body);
        setImage(null);
      } catch (error) {
        const errorResponse = error as ResponseError;
        const msgError =
          errorResponse?.response?.data?.message || 'Không thể Update';
        console.log('[Upload drawing - error] ', msgError, error);
      }
    }
  };

  const handleSubmitDrawing = async (
    values: CreateCustomerDrawingBodyRequest
  ) => {
    if (values && body && showDrawingModal) {
      try {
        setLoading(true);
        const customerDrawing: CustomerDrawing | null =
          (await handleCreateDrawing(values)) || null;
        await handleUploadDrawing(customerDrawing?.id || '');
        setLoading(false);
        setShowDrawingModal('');
        getDrawings();
        getMyDrawings();
        showMessage({
          message: 'Bài dự thi của bạn đã được gửi đi',
          type: 'success',
          duration: 2500,
        });
      } catch (error) {
        setLoading(false);
        showMessage({
          message: 'Bài dự thi gửi không thành công',
          type: 'warning',
          duration: 2500,
        });
        console.log('[DrawingModal - Submit error] ', error);
      }
    } else {
      showMessage({
        message: 'Hãy cung cấp đầy đủ thông tin và hình ảnh',
        type: 'warning',
        duration: 3500,
      });
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      allowsEditing: true,
    });
    if (!result.canceled) {
      var photo = {
        uri: result.assets[0].uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      };
      var imageData = new FormData();
      imageData.append('file', photo);

      setBody(imageData);
      setImage(result.assets[0].uri);
    }
  };

  return (
    <Center>
      <Modal
        isOpen={showDrawingModal !== ''}
        onClose={() => {
          setShowDrawingModal('');
        }}
        avoidKeyboard
        size={'xl'}
      >
        <Formik
          validationSchema={newValidationSchema}
          initialValues={{
            title: '',
            description: '',
          }}
          onSubmit={(values) => {
            handleSubmitDrawing(values);
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
              <Modal.Content
                maxWidth="400px"
                style={{ marginBottom: 'auto', marginTop: 160 }}
              >
                <Modal.Header style={styles.header}>
                  <Text
                    style={{ color: 'white', fontSize: 16, fontWeight: '600' }}
                  >
                    Đăng tải bài vẽ
                  </Text>
                </Modal.Header>
                <Modal.Body style={styles.body}>
                  <TextInput
                    onBlur={handleBlur('title')}
                    value={values.title}
                    onChangeText={handleChange('title')}
                    style={styles.title}
                    placeholder="Hãy đặt tên cho bức vẽ"
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
                    placeholder={'Hãy mô tả chi tiết về bức tranh của bạn'}
                  />
                  {errors.description && (
                    <Text style={{ fontSize: 12, color: 'red' }}>
                      {errors.description}
                    </Text>
                  )}

                  <View style={styles.imageContainer}>
                    {image && (
                      <>
                        <Image source={{ uri: image }} style={styles.image} />
                      </>
                    )}
                    <Button
                      disabled={loading}
                      style={styles.buttonUpload}
                      borderRadius={8}
                      paddingBottom={3}
                      onPress={(file) => {
                        pickImage(file);
                      }}
                    >
                      <Text style={styles.btnUploadText}>Tải ảnh lên</Text>
                    </Button>
                  </View>
                </Modal.Body>
                <Modal.Footer style={styles.footer}>
                  <Button.Group space={2}>
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
                          Đăng tải
                        </Text>
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      colorScheme="blueGray"
                      onPress={() => {
                        setShowDrawingModal('');
                      }}
                      style={styles.cancelBtn}
                    >
                      <Text style={{ color: '#fff', fontWeight: '600' }}>
                        Hủy
                      </Text>
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

export default DrawingModal;

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.MAINPINK,
  },
  body: {
    padding: 20,
  },
  title: {
    borderWidth: 1,
    borderColor: '#00000044',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#00000044',
    borderRadius: 12,
    padding: 12,
  },
  imageContainer: {
    flexDirection: 'row',
    gap: 24,
    alignSelf: 'flex-start',
    marginTop: 20,
  },
  image: {
    width: 180,
    height: 140,
    alignSelf: 'center',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#00000057',
    resizeMode: 'center',
  },
  buttonUpload: {
    height: 42,
    marginTop: 'auto',
    backgroundColor: COLORS.SELECTYELLOW,
  },
  btnUploadText: {
    color: '#fff',
    fontWeight: 'bold',
    maxWidth: 100,
  },
  footer: {
    borderTopWidth: 0,
    justifyContent: 'flex-start',
  },
  reviewBtn: {
    backgroundColor: COLORS.MAINPINK,
    marginRight: 20,
  },
  cancelBtn: {
    backgroundColor: '#f34c4c',
  },
});
