import { Button, Center, FormControl, Input, Modal } from 'native-base';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import { COLORS } from '../../libs/const/color';
import { CreateCourseFeedbackBodyRequest } from '../../apis/course-feedback/types';
import { createCourseFeedback } from '../../apis/course-feedback/apis';
import { showMessage } from 'react-native-flash-message';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  ChangePasswordLearnerBodyRequest,
  CreateLearnerBodyRequest,
  UpdateLearnerBodyRequest,
} from '../../apis/learner/types';
import {
  changePasswordLearner,
  createLearner,
  updateLearner,
} from '../../apis/learner/api';
import { ResponseError } from '../../libs/types';

const ChildrenModal = ({
  getMyChildren,
  setPressedChild,
  setPassword,
  pressChild,
  username,
  firstname,
  middlename,
  lastname,
  password,
}: {
  username: string;
  password: string;
  firstname: string;
  middlename: string;
  lastname: string;
  pressChild: string;
}) => {
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const createValidationSchema = Yup.object().shape({
    userName: Yup.string().trim().required('Không được để trống tên đăng nhập'),
    firstName: Yup.string().trim().required('Không được để trống tên'),
    lastName: Yup.string().trim().required('Không được để trống họ'),
    middleName: Yup.string().trim().required('Không được để trống tên đệm'),
    password: Yup.string()
      .trim()
      .required('Không được để trống mật khẩu')
      .min(8, 'Mật khẩu phải có độ dài nhỏ nhất là 8')
      .matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        'Mật khẩu phải bao gồm ít nhất 1 ký tự thường, ký tự in hoa và số hoặc ký tự đặc biệt'
      )
      .max(32, 'Mật khẩu phải có độ dài tối đa là 32'),
  });

  const updateValidationSchema = Yup.object().shape({
    userName: Yup.string().trim().required('Không được để trống tên đăng nhập'),
    firstName: Yup.string().trim().required('Không được để trống tên'),
    lastName: Yup.string().trim().required('Không được để trống họ'),
    middleName: Yup.string().trim().required('Không được để trống tên đệm'),
    newPassword: Yup.string()
      .min(8, 'Mật khẩu mới phải có độ dài nhỏ nhất là 8')
      .matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        'Mật khẩu mới phải bao gồm ít nhất 1 ký tự thường, ký tự in hoa và số hoặc ký tự đặc biệt'
      )
      .max(32, 'Mật khẩu mới phải có độ dài tối đa là 32'),
    confirmNewPassword: Yup.string().oneOf(
      [Yup.ref('newPassword'), null],
      'Mật khẩu mới và xác nhận mật khẩu mới phải giống nhau'
    ),
  });

  const handleCreate = async (body: CreateLearnerBodyRequest) => {
    try {
      setLoading(true);
      await createLearner(body);
      setLoading(false);
      setPressedChild('');
      showMessage({
        message: 'Tạo tài khoản của bé thành công ',
        type: 'success',
        duration: 2500,
      });
      getMyChildren();
    } catch (error) {
      const msg = error as ResponseError;
      const msgError = msg.response?.data?.message;
      console.log('[ChildrenModal - create child error] ', msgError, error);
      setLoading(false);
      setPressedChild('');
      showMessage({
        message: msgError || 'Không thể tạo tài khoản',
        type: 'warning',
        duration: 2500,
      });
    }
    setPressedChild('');
    setPassword('');
  };

  const handleUpdate = async ({
    firstName,
    lastName,
    middleName,
    userName,
    newPassword,
    confirmNewPassword,
  }: {
    userName: string;
    firstName: string;
    lastName: string;
    middleName: string;
    newPassword: string;
    confirmNewPassword: string;
  }) => {
    const body: UpdateLearnerBodyRequest = {
      userName: userName,
      learnerId: pressChild,
      firstName: firstName,
      lastName: lastName,
      middleName: middleName,
    };

    const pass: ChangePasswordLearnerBodyRequest = {
      learnerId: pressChild,
      newPassword: newPassword,
      confirmNewPassword: confirmNewPassword,
    };

    const isChangedInfo =
      !(userName === username) ||
      !(firstName === firstname) ||
      !(middleName === middlename) ||
      !(lastname === lastname);
    try {
      setLoading(true);
      if (isChangedInfo) await updateLearner(body);
      if (newPassword) await changePasswordLearner(pass);
      setLoading(false);
      setPressedChild('');
      showMessage({
        message: 'Thông tin của bé đã thay đổi',
        type: 'success',
        duration: 2500,
      });
      getMyChildren();
    } catch (error) {
      const msg = error as ResponseError;
      const msgError = msg.response?.data?.message;
      console.log('[ChildrenModal - update child error] ', msgError, error);
      setLoading(false);
      setPressedChild('');
      showMessage({
        message: msgError || 'Thông tin chưa thể thay đổi',
        type: 'danger',
        duration: 2500,
      });
    }
    setPressedChild('');
  };

  return (
    <Center>
      <Modal
        isOpen={pressChild !== ''}
        onClose={() => setPressedChild('')}
        avoidKeyboard
        size={'xl'}
      >
        <Formik
          validateOnChange={false}
          enableReinitialize={true}
          validationSchema={
            pressChild === 'empty'
              ? createValidationSchema
              : updateValidationSchema
          }
          initialValues={{
            userName: username,
            firstName: firstname,
            middleName: middlename,
            lastName: lastname,
            password: '',
            newPassword: '',
            confirmNewPassword: '',
          }}
          onSubmit={(value) => {
            if (pressChild !== '') {
              if (pressChild === 'empty') handleCreate(value);
              else handleUpdate(value);
            }
          }}
        >
          {({ handleChange, handleSubmit, values, errors, isValid, dirty }) => (
            <>
              <Modal.Content maxWidth="400px">
                <Modal.Header style={styles.header}>
                  <Text
                    style={{ color: 'white', fontSize: 16, fontWeight: '600' }}
                  >
                    {pressChild === 'empty' ? 'Tạo' : 'Cập nhật'} tài khoản cho
                    bé
                  </Text>
                </Modal.Header>
                <Modal.Body style={styles.body}>
                  <View style={[styles.userInfo]}>
                    <View style={styles.infoContainer}>
                      <Text style={styles.label}>
                        <Text style={{ backgroundColor: '#ffffff97' }}>
                          Tên đăng nhập
                        </Text>
                      </Text>
                      <Input
                        value={values.userName}
                        onChangeText={handleChange('userName')}
                        variant="filled"
                        placeholder="Nhập Tên đăng nhập ở đây"
                        borderRadius={10}
                        paddingLeft={4}
                        borderWidth={1}
                        borderColor={'#00000041'}
                      />
                      {errors.userName && (
                        <Text style={{ fontSize: 10, color: 'red' }}>
                          {errors.userName}
                        </Text>
                      )}
                    </View>
                    {pressChild === 'empty' && (
                      <View style={styles.infoContainer}>
                        <Text style={styles.label}>
                          <Text style={{ backgroundColor: '#ffffff97' }}>
                            Mật khẩu
                          </Text>
                        </Text>
                        <Input
                          value={values.password}
                          onChangeText={handleChange('password')}
                          variant="filled"
                          placeholder="Nhập mật khẩu ở đây"
                          borderRadius={10}
                          paddingLeft={4}
                          secureTextEntry={true}
                          borderWidth={1}
                          borderColor={'#00000041'}
                        />
                        {errors.password && (
                          <Text style={{ fontSize: 10, color: 'red' }}>
                            {errors.password}
                          </Text>
                        )}
                      </View>
                    )}
                    {pressChild !== '' && pressChild !== 'empty' && (
                      <>
                        <View style={styles.infoContainer}>
                          <Text style={styles.label}>
                            <Text style={{ backgroundColor: '#ffffff97' }}>
                              Mật khẩu Mới
                            </Text>
                          </Text>
                          <Input
                            value={values.newPassword}
                            onChangeText={handleChange('newPassword')}
                            variant="filled"
                            placeholder="Nhập mật khẩu mới ở đây"
                            borderRadius={10}
                            paddingLeft={4}
                            secureTextEntry={true}
                            borderWidth={1}
                            borderColor={'#00000041'}
                          />
                          {errors.newPassword && (
                            <Text style={{ fontSize: 10, color: 'red' }}>
                              {errors.newPassword}
                            </Text>
                          )}
                        </View>
                        <View style={styles.infoContainer}>
                          <Text style={styles.label}>
                            <Text style={{ backgroundColor: '#ffffff97' }}>
                              Xác nhận Mật khẩu Mới
                            </Text>
                          </Text>
                          <Input
                            value={values.confirmNewPassword}
                            onChangeText={handleChange('confirmNewPassword')}
                            variant="filled"
                            placeholder="Xác nhận lại mật khẩu mới ở đây"
                            borderRadius={10}
                            paddingLeft={4}
                            secureTextEntry={true}
                            borderWidth={1}
                            borderColor={'#00000041'}
                          />
                          {errors.confirmNewPassword && (
                            <Text style={{ fontSize: 10, color: 'red' }}>
                              {errors.confirmNewPassword}
                            </Text>
                          )}
                        </View>
                      </>
                    )}

                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'center',
                        width: '80%',
                        justifyContent: 'space-between',
                        padding: 4,
                      }}
                    >
                      <View style={styles.nameContainer}>
                        <Text style={styles.label}>
                          <Text style={{ backgroundColor: '#ffffff97' }}>
                            Tên
                          </Text>
                        </Text>
                        <Input
                          value={values.firstName}
                          onChangeText={handleChange('firstName')}
                          variant="filled"
                          placeholder="Tên"
                          borderRadius={10}
                          paddingLeft={4}
                          borderWidth={1}
                          borderColor={'#00000041'}
                        />
                        {errors.firstName && (
                          <Text style={{ fontSize: 10, color: 'red' }}>
                            {errors.firstName}
                          </Text>
                        )}
                      </View>
                      <View style={styles.nameContainer}>
                        <Text style={styles.label}>
                          <Text style={{ backgroundColor: '#ffffff97' }}>
                            Tên đệm
                          </Text>
                        </Text>
                        <Input
                          value={values.middleName}
                          onChangeText={handleChange('middleName')}
                          variant="filled"
                          placeholder="Tên đệm"
                          paddingLeft={4}
                          borderRadius={10}
                          borderWidth={1}
                          borderColor={'#00000041'}
                        />
                        {errors.middleName && (
                          <Text style={{ fontSize: 10, color: 'red' }}>
                            {errors.middleName}
                          </Text>
                        )}
                      </View>
                      <View style={styles.nameContainer}>
                        <Text style={styles.label}>
                          <Text style={{ backgroundColor: '#ffffff97' }}>
                            Họ
                          </Text>
                        </Text>
                        <Input
                          value={values.lastName}
                          onChangeText={handleChange('lastName')}
                          variant="filled"
                          placeholder="Họ"
                          paddingLeft={4}
                          borderRadius={10}
                          borderWidth={1}
                          borderColor={'#00000041'}
                        />
                        {errors.lastName && (
                          <Text style={{ fontSize: 10, color: 'red' }}>
                            {errors.lastName}
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                </Modal.Body>
                <Modal.Footer style={styles.footer}>
                  <Button.Group space={2}>
                    <Button
                      variant="ghost"
                      colorScheme="blueGray"
                      onPress={() => {
                        setPressedChild('');
                      }}
                    >
                      Hủy
                    </Button>
                    <Button
                      style={[
                        styles.reviewBtn,
                        !dirty && { backgroundColor: 'grey' },
                      ]}
                      disabled={loading || !dirty}
                      onPress={handleSubmit}
                    >
                      {loading ? (
                        <ActivityIndicator size={'small'} color={'#fff'} />
                      ) : (
                        <Text style={{ color: '#fff', fontWeight: '600' }}>
                          {pressChild === 'empty' ? 'Tạo mới' : 'Cập nhật'}
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

export default ChildrenModal;

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
  infoContainer: {
    width: '80%',
    alignSelf: 'center',
    padding: 4,
  },
  nameContainer: {
    width: '30%',
    alignSelf: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: -8,
    zIndex: 1,
  },
  userInfo: {
    width: '100%',
  },
});
