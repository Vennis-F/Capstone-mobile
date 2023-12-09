import { Button, Input, KeyboardAvoidingView } from 'native-base';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { UpdateProfileBodyRequest } from '../../apis/user/types';
import { updateProfile } from '../../apis/user/apis';
import { showMessage } from 'react-native-flash-message';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useFocusEffect } from 'expo-router';

const UserDetail = ({ userData, getUserProfile }) => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [firstname, setFirstname] = useState<string>('');
  const [middlename, setMiddlename] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const [loading, setLoading] = useState(false);

  const handleUpdate = async (body: UpdateProfileBodyRequest) => {
    try {
      setLoading(true);
      await updateProfile(body);
      showMessage({
        message: 'Cập nhật thông tin thành công',
        type: 'success',
        duration: 2000, // Thời gian hiển thị (2 giây)
      });
      setLoading(false);
    } catch (error) {
      showMessage({
        message: 'Không thể cập nhật thông tin',
        type: 'warning',
        duration: 2000, // Thời gian hiển thị (2 giây)
      });
      setLoading(false);
    }
    await getUserProfile();
  };

  useFocusEffect(
    React.useCallback(() => {
      setEmail(userData?.email);
      setUsername(userData?.userName);
      setFirstname(userData?.firstName);
      setMiddlename(userData?.middleName);
      setLastname(userData?.lastName);
      setPhone(userData?.phoneNumber);
    }, [userData])
  );

  const newCharacterValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('Không được để trống tên'),
    lastName: Yup.string().required('Không được để trống họ'),
    middleName: Yup.string().required('Không được để trống tên đệm'),
    phoneNumber: Yup.string()
      .trim()
      .required('Không được để trống số điện thoại')
      .matches(/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ'),
    userName: Yup.string()
      .when('conditionFieldName', {
        is: username !== '',
        then: Yup.string().required('Không được để trống tên đăng nhập'),
      })
      .nullable(true),
  });

  return (
    <KeyboardAvoidingView style={[styles.userInfo]} behavior="height">
      {userData && (
        <Formik
          enableReinitialize={true}
          validationSchema={newCharacterValidationSchema}
          initialValues={{
            firstName: firstname,
            middleName: middlename,
            lastName: lastname,
            phoneNumber: phone,
            userName: username,
          }}
          onSubmit={(values) => {
            handleUpdate(values);
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
                  <Text style={{ backgroundColor: '#ffffff97' }}>Email</Text>
                </Text>
                <Input
                  value={email}
                  variant="filled"
                  placeholder="Nhập Email ở đây"
                  isReadOnly={true}
                  borderRadius={10}
                  paddingLeft={4}
                />
                {/* {errorText1 && (
                  <Text style={{ color: 'red' }}>{errorText1}</Text>
                )} */}
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.label}>
                  <Text style={{ backgroundColor: '#ffffff97' }}>
                    Tên đăng nhập
                  </Text>
                </Text>
                <Input
                  isDisabled={loading}
                  onBlur={handleBlur('userName')}
                  value={values.userName}
                  onChangeText={handleChange('userName')}
                  variant="outline"
                  placeholder="Nhập Tên đăng nhập ở đây"
                  borderRadius={10}
                  paddingLeft={4}
                />
                {errors.userName && (
                  <Text style={{ fontSize: 10, color: 'red' }}>
                    {errors.userName}
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
              >
                <View style={styles.nameContainer}>
                  <Text style={styles.label}>
                    <Text style={{ backgroundColor: '#ffffff97' }}>Tên</Text>
                  </Text>
                  <Input
                    isDisabled={loading}
                    onBlur={handleBlur('firstName')}
                    value={values.firstName}
                    onChangeText={handleChange('firstName')}
                    variant="outline"
                    placeholder="Tên"
                    borderRadius={10}
                    paddingLeft={4}
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
                    isDisabled={loading}
                    onBlur={handleBlur('middleName')}
                    value={values.middleName}
                    onChangeText={handleChange('middleName')}
                    variant="outline"
                    placeholder="Tên đệm"
                    paddingLeft={4}
                    borderRadius={10}
                  />
                  {errors.middleName && (
                    <Text style={{ fontSize: 10, color: 'red' }}>
                      {errors.middleName}
                    </Text>
                  )}
                </View>
                <View style={styles.nameContainer}>
                  <Text style={styles.label}>
                    <Text style={{ backgroundColor: '#ffffff97' }}>Họ</Text>
                  </Text>
                  <Input
                    isDisabled={loading}
                    onBlur={handleBlur('lastName')}
                    value={values.lastName}
                    onChangeText={handleChange('lastName')}
                    variant="outline"
                    placeholder="Họ"
                    paddingLeft={4}
                    borderRadius={10}
                  />
                  {errors.lastName && (
                    <Text style={{ fontSize: 10, color: 'red' }}>
                      {errors.lastName}
                    </Text>
                  )}
                </View>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.label}>
                  <Text style={{ backgroundColor: '#ffffff97' }}>
                    Số điện thoại
                  </Text>
                </Text>
                <Input
                  isDisabled={loading}
                  onBlur={handleBlur('phoneNumber')}
                  value={values.phoneNumber}
                  onChangeText={handleChange('phoneNumber')}
                  variant="outline"
                  placeholder="Nhập Số điện thoại ở đây"
                  paddingLeft={4}
                  borderRadius={10}
                />
                {errors.phoneNumber && (
                  <Text style={{ fontSize: 10, color: 'red' }}>
                    {errors.phoneNumber}
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
                  style={styles.buttonReset}
                  borderRadius={10}
                  paddingBottom={3}
                  onPress={handleReset}
                >
                  <Text style={{ color: 'blue', fontWeight: 'bold' }}>
                    Đặt lại
                  </Text>
                </Button>
                <Button
                  style={[
                    styles.buttonUpdate,
                    (!dirty || !isValid) && { backgroundColor: 'grey' },
                  ]}
                  borderRadius={8}
                  paddingBottom={3}
                  onPress={handleSubmit}
                  disabled={!isValid || !dirty || loading}
                >
                  {loading ? (
                    <ActivityIndicator size={'small'} color={'#fff'} />
                  ) : (
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                      Cập nhật
                    </Text>
                  )}
                </Button>
              </View>
            </>
          )}
        </Formik>
      )}
    </KeyboardAvoidingView>
  );
};

export default UserDetail;

const styles = StyleSheet.create({
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
    paddingVertical: 16,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderColor: '#00000023',
  },
  buttonReset: {
    width: '40%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'blue',
  },
  buttonUpdate: {
    width: '40%',
    backgroundColor: '#ef4444',
    borderWidth: 1,
    borderColor: '#fff',
  },
});
