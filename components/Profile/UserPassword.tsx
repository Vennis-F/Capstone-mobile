import { useState } from 'react';
import { Button, Input } from 'native-base';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { ChangePasswordUserBodyRequest } from '../../apis/user/types';
import { changePasswordUser } from '../../apis/user/apis';
import { showMessage } from 'react-native-flash-message';
import * as Yup from 'yup';
import { Formik } from 'formik';

const UserPassword = () => {
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async (body: ChangePasswordUserBodyRequest) => {
    try {
      setLoading(true);
      await changePasswordUser(body);
      showMessage({
        message: 'Cập nhật mật khẩu thành công',
        type: 'success',
        duration: 2000, // Thời gian hiển thị (2 giây)
      });
      setLoading(false);
    } catch (error) {
      showMessage({
        message: 'Cập nhật mật khẩu không thành công',
        type: 'warning',
        duration: 2000, // Thời gian hiển thị (2 giây)
      });
      setLoading(false);
    }
  };

  const newValidationSchema = Yup.object().shape({
    currentPassword: Yup.string().required(
      'Không được để trống mật khẩu hiện tại'
    ),
    newPassword: Yup.string()
      .required('Không được để trống mật khẩu mới')
      .min(8, 'Mật khẩu mới phải có độ dài nhỏ nhất là 8')
      .matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        'Mật khẩu mới phải bao gồm ít nhất 1 ký tự thường, ký tự in hoa và số hoặc ký tự đặc biệt'
      )
      .max(32, 'Mật khẩu mới phải có độ dài tối đa là 32')
      .test(
        'not-same',
        'Mật khẩu mới và mật khẩu hiện tại không được giống nhau',
        function (value) {
          return value !== this.parent.currentPassword;
        }
      ),
    confirmNewPassword: Yup.string()
      .required('Không được để trống xác nhận mật khẩu mới')
      .oneOf(
        [Yup.ref('newPassword'), null],
        'Mật khẩu mới và xác nhận mật khẩu mới phải giống nhau'
      ),
  });

  return (
    <View style={[styles.userInfo]}>
      <Formik
        validationSchema={newValidationSchema}
        initialValues={{
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        }}
        onSubmit={(values) => {
          handleUpdatePassword(values);
        }}
      >
        {({
          handleReset,
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
          dirty,
        }) => (
          <>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>
                <Text style={{ backgroundColor: '#ffffff97' }}>
                  Mật khẩu hiện tại
                </Text>
              </Text>
              <Input
                isDisabled={loading}
                onBlur={handleBlur('currentPassword')}
                value={values.currentPassword}
                onChangeText={handleChange('currentPassword')}
                variant="outline"
                type="password"
                placeholder="Nhập Mật khẩu hiện tại ở đây"
                borderRadius={10}
                paddingLeft={4}
              />
              {errors.currentPassword && (
                <Text style={{ fontSize: 10, color: 'red' }}>
                  {errors.currentPassword}
                </Text>
              )}
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>
                <Text style={{ backgroundColor: '#ffffff97' }}>
                  Mật khẩu mới
                </Text>
              </Text>
              <Input
                isDisabled={loading}
                onBlur={handleBlur('newPassword')}
                value={values.newPassword}
                onChangeText={handleChange('newPassword')}
                variant="outline"
                type="password"
                placeholder="Nhập Mật khẩu mới ở đây"
                borderRadius={10}
                paddingLeft={4}
              />
              {errors.newPassword && (
                <Text style={{ fontSize: 10, color: 'red' }}>
                  {errors.newPassword}
                </Text>
              )}
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                width: '80%',
                justifyContent: 'space-between',
                padding: 4,
              }}
            ></View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>
                <Text style={{ backgroundColor: '#ffffff97' }}>
                  Xác nhận mật khẩu mới
                </Text>
              </Text>
              <Input
                isDisabled={loading}
                onBlur={handleBlur('confirmNewPassword')}
                value={values.confirmNewPassword}
                onChangeText={handleChange('confirmNewPassword')}
                variant="outline"
                type="password"
                placeholder="Xác nhận mật khẩu mới  "
                paddingLeft={4}
                borderRadius={10}
              />
              {errors.confirmNewPassword && (
                <Text style={{ fontSize: 10, color: 'red' }}>
                  {errors.confirmNewPassword}
                </Text>
              )}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '80%',
                alignSelf: 'center',
                marginVertical: 8,
              }}
            >
              <Button
                style={[
                  styles.buttonPassword,
                  (!dirty || !isValid) && { backgroundColor: 'grey' },
                ]}
                borderRadius={8}
                paddingBottom={3}
                onPress={handleSubmit}
                onPressOut={() => {
                  setTimeout(() => {
                    handleReset();
                  }, 2000);
                }}
                disabled={!isValid || !dirty || loading}
              >
                {loading ? (
                  <ActivityIndicator size={'small'} color={'#fff'} />
                ) : (
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                    Đổi mật khẩu
                  </Text>
                )}
              </Button>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default UserPassword;

const styles = StyleSheet.create({
  infoContainer: {
    width: '80%',
    alignSelf: 'center',
    padding: 4,
  },
  userInfo: {
    paddingVertical: 16,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderColor: '#00000023',
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: -8,
    zIndex: 1,
  },
  buttonPassword: {
    width: '60%',
    backgroundColor: '#ef4444',
    borderWidth: 1,
    borderColor: '#fff',
  },
});
