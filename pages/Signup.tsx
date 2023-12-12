import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';

import { Input, Button, ScrollView, KeyboardAvoidingView } from 'native-base';
import { AntDesign, Entypo } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import { customerSignUp } from '../apis/auth/api';
import { CustomerSignupRequest } from '../apis/auth/types';
import { COLORS } from '../libs/const/color';

import { Formik } from 'formik';
import { object, string } from 'yup';
import { ResponseError } from '../libs/types';
import { showMessage } from 'react-native-flash-message';

const Signup = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const loginValidationSchema = object().shape({
    firstName: string().trim().required('Không được để trống tên'),
    lastName: string().trim().required('Không được để trống họ'),
    middleName: string().trim().required('Không được để trống tên đệm'),
    password: string()
      .trim()
      .required('Không được để trống mật khẩu')
      .min(8, 'Mật khẩu phải có độ dài nhỏ nhất là 8')
      .matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        'Mật khẩu phải bao gồm ít nhất 1 ký tự thường, ký tự in hoa và số hoặc ký tự đặc biệt'
      )
      .max(32, 'Mật khẩu phải có độ dài tối đa là 32'),
    phoneNumber: string()
      .trim()
      .required('Không được để trống số điện thoại')
      .matches(/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ'),
    email: string()
      .trim()
      .required('Không được để trống Email')
      .email('Email không hợp lệ'),
  });

  const handleReset = () => {
    setLoading(false);
  };

  const handleSignup = async ({
    firstName,
    middleName,
    lastName,
    phoneNumber,
    password,
    email,
  }: {
    firstName: string;
    middleName: string;
    lastName: string;
    phoneNumber: string;
    password: string;
    email: string;
  }) => {
    const body: CustomerSignupRequest = {
      firstName: firstName.trim(),
      middleName: middleName.trim(),
      lastName: lastName.trim(),
      phoneNumber: phoneNumber.trim(),
      email: email.trim(),
      password: password.trim(),
      role: 'Customer',
    };
    try {
      setLoading(true);
      await customerSignUp(body);
      showMessage({
        message: 'Tài khoản đang chờ xác thực',
        type: 'success',
        duration: 3000,
      });
      handleReset();
      navigation.navigate('confirmOTP', { email: email });
    } catch (error) {
      setLoading(false);
      const errorResponse = error as ResponseError;
      const msgError =
        errorResponse?.response?.data?.message ||
        'Đăng ký tài khoản không thành côngr';
      showMessage({
        message: msgError || 'Đăng ký tài khoản không thành công',
        type: 'warning',
        duration: 3000,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: '#f8f6f0',
        width: '100%',
      }}
      behavior="height"
    >
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={require('../assets/images/wallpaper.png')}
          alt="Poster"
          style={styles.imgWallpaper}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('login');
            }}
            style={styles.backIcon}
          >
            <AntDesign name="leftcircle" size={36} color="#ffffffd9" />
          </TouchableOpacity>
          <View style={styles.iconContainer}>
            <Image
              source={require('../assets/images/singupLogo.png')}
              alt="Icon"
              style={styles.icon}
            />
          </View>
        </ImageBackground>
        <View style={styles.container}>
          <View style={styles.Middle}>
            <Text style={styles.SignupText}>Đăng ký</Text>
          </View>

          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{
              firstName: '',
              middleName: '',
              lastName: '',
              phoneNumber: '',
              password: '',
              email: '',
            }}
            onSubmit={(values) => {
              handleSignup(values);
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
            }) => (
              <>
                {/* Name input field */}
                <View style={styles.buttonStyle}>
                  <View>
                    <Text style={styles.emailInput}>Tên</Text>
                    <Input
                      isDisabled={loading}
                      onBlur={handleBlur('firstName')}
                      value={values.firstName}
                      onChangeText={handleChange('firstName')}
                      variant="outline"
                      placeholder="Tên"
                      borderRadius={10}
                      _light={{
                        placeholderTextColor: 'blueGray.400',
                      }}
                      _dark={{
                        placeholderTextColor: 'blueGray.50',
                      }}
                    />
                    {errors.firstName && (
                      <Text style={{ fontSize: 10, color: 'red' }}>
                        {errors.firstName}
                      </Text>
                    )}
                  </View>
                </View>

                {/* Username or email input field */}
                <View style={styles.buttonStyle2}>
                  <View>
                    <Text style={styles.emailInput}>Tên đệm</Text>
                    <Input
                      isDisabled={loading}
                      onBlur={handleBlur('middleName')}
                      value={values.middleName}
                      onChangeText={handleChange('middleName')}
                      variant="outline"
                      placeholder="Nhập Tên đệm"
                      borderRadius={10}
                      _light={{
                        placeholderTextColor: 'blueGray.400',
                      }}
                      _dark={{
                        placeholderTextColor: 'blueGray.50',
                      }}
                    />
                    {errors.middleName && (
                      <Text style={{ fontSize: 10, color: 'red' }}>
                        {errors.middleName}
                      </Text>
                    )}
                  </View>
                </View>

                <View style={styles.buttonStyle2}>
                  <View>
                    <Text style={styles.emailInput}>Họ</Text>

                    <Input
                      isDisabled={loading}
                      onBlur={handleBlur('lastName')}
                      value={values.lastName}
                      onChangeText={handleChange('lastName')}
                      variant="outline"
                      placeholder="Nhập tên họ"
                      borderRadius={10}
                      _light={{
                        placeholderTextColor: 'blueGray.400',
                      }}
                      _dark={{
                        placeholderTextColor: 'blueGray.50',
                      }}
                    />
                    {errors.lastName && (
                      <Text style={{ fontSize: 10, color: 'red' }}>
                        {errors.lastName}
                      </Text>
                    )}
                  </View>
                </View>

                <View style={styles.buttonStyle2}>
                  <View>
                    <Text style={styles.emailInput}>Số điện thoại</Text>

                    <Input
                      isDisabled={loading}
                      onBlur={handleBlur('phoneNumber')}
                      value={values.phoneNumber}
                      onChangeText={handleChange('phoneNumber')}
                      keyboardType="number-pad"
                      variant="outline"
                      placeholder="Nhập số điện thoại"
                      borderRadius={10}
                      _light={{
                        placeholderTextColor: 'blueGray.400',
                      }}
                      _dark={{
                        placeholderTextColor: 'blueGray.50',
                      }}
                    />
                    {errors.phoneNumber && (
                      <Text style={{ fontSize: 10, color: 'red' }}>
                        {errors.phoneNumber}
                      </Text>
                    )}
                  </View>
                </View>
                <View style={styles.buttonStyle2}>
                  <View>
                    <Text style={styles.emailInput}>Email</Text>

                    <Input
                      isDisabled={loading}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      onChangeText={handleChange('email')}
                      keyboardType="email-address"
                      variant="outline"
                      placeholder="Nhập Email"
                      borderRadius={10}
                      _light={{
                        placeholderTextColor: 'blueGray.400',
                      }}
                      _dark={{
                        placeholderTextColor: 'blueGray.50',
                      }}
                    />
                    {errors.email && (
                      <Text style={{ fontSize: 10, color: 'red' }}>
                        {errors.email}
                      </Text>
                    )}
                  </View>
                </View>
                {/* Password Input Field */}
                <View style={styles.buttonStyle2}>
                  <View>
                    <Text style={styles.emailInput}>Mật khẩu</Text>
                    <Input
                      isDisabled={loading}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      secureTextEntry
                      variant="outline"
                      placeholder="Nhập mật khẩu"
                      borderRadius={10}
                      _light={{
                        placeholderTextColor: 'blueGray.400',
                      }}
                      _dark={{
                        placeholderTextColor: 'blueGray.50',
                      }}
                    />
                    {errors.password && (
                      <Text style={{ fontSize: 10, color: 'red' }}>
                        {errors.password}
                      </Text>
                    )}
                  </View>
                </View>

                {/* Button Create an account */}
                <View style={styles.buttonSigup}>
                  <Button
                    onPress={handleSubmit}
                    onPressOut={handleReset}
                    style={styles.buttonDesgin}
                    borderRadius={10}
                    paddingBottom={3}
                    disabled={!isValid || loading}
                  >
                    {loading ? (
                      <ActivityIndicator size={'large'} color={'#fff'} />
                    ) : (
                      <Text style={styles.text3}>Đăng Ký</Text>
                    )}
                  </Button>
                </View>
              </>
            )}
          </Formik>

          <View style={styles.buttonGoogle}>
            <View style={styles.text4}>
              <Text style={styles.loginText}>Bạn đã có tài khoản? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('login')}>
                <Text style={styles.loginText1}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default Signup;

const styles = StyleSheet.create({
  imgWallpaper: {
    height: 400,
    width: '100%',
  },
  backIcon: {
    marginTop: 24,
    marginBottom: 24,
    marginLeft: 20,
  },
  iconContainer: {
    width: 150,
    padding: 8,
    backgroundColor: '#ffffffbc',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 99,
  },
  icon: {
    width: 140,
    height: 140,
  },
  container: {
    backgroundColor: '#ffffff',
    width: '90%',
    alignSelf: 'center',
    marginTop: -100,
    padding: 20,
    borderRadius: 30,
    elevation: 12,
    borderWidth: 1,
    borderColor: '#00000036',
    alignItems: 'center',
    marginBottom: 40,
  },
  Middle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#0000003b',
    marginBottom: 12,
  },
  SignupText: {
    fontSize: 30,
    fontWeight: '600',
    color: '#000000bc',
  },
  buttonStyle: {
    marginTop: 8,
    marginBottom: 8,
    width: '90%',
  },
  emailInput: {
    fontSize: 16,
  },
  buttonStyle2: {
    marginBottom: 8,
    width: '90%',
  },
  buttonStyle3: {
    marginBottom: 8,
    width: '90%',
  },
  buttonDesgin: {
    backgroundColor: COLORS.MAINPINK,
  },
  text3: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonSigup: {
    marginTop: 12,
    width: '90%',
  },
  lineStyle: {
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonDesgin2: {
    backgroundColor: '#FB641B',
  },
  buttonDesgin3: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text4: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
  },
  loginText1: {
    color: '#0000BB',
    fontSize: 15,
    fontWeight: '500',
  },
  buttonGoogle: {
    marginTop: 12,
  },
  noti: {
    backgroundColor: '#ffbb00',
    paddingLeft: 30,
    paddingRight: 8,
    paddingVertical: 20,
    position: 'absolute',
    top: 220,
    right: 0,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: 'row',
    gap: 12,
  },
  notiText: {
    color: '#fff',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
