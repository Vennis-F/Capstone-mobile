import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Image,
} from 'react-native';
import React, { useState } from 'react';

import {
  Input,
  NativeBaseProvider,
  Button,
  Icon,
  Box,
  AspectRatio,
  ScrollView,
} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import { customerSignUp } from '../apis/auth/api';
import { CustomerSignupRequest } from '../apis/auth/types';
import { COLORS } from '../libs/const/color';

const Signup = () => {
  const navigation = useNavigation();
  const [firstname, setFirstname] = useState('');
  const [middlename, setMiddlename] = useState('');
  const [lastname, setLastname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = () => {
    setFirstname(''),
      setMiddlename(''),
      setLastname(''),
      setPhoneNumber(''),
      setEmail(''),
      setPassword(''),
      setLoading(false);
  };

  const handleSubmit = async () => {
    const body: CustomerSignupRequest = {
      email: email.trim(),
      firstName: firstname.trim(),
      lastName: lastname.trim(),
      middleName: middlename.trim(),
      password: password.trim(),
      phoneNumber: phoneNumber.trim(),
      role: 'Customer',
    };
    setLoading(true);
    try {
      console.log('[Signup - api] ', await customerSignUp(body));
      console.log('navigate');
      handleReset();
      navigation.navigate('confirmOTP', { email: email });
    } catch (error) {
      setLoading(false);
      console.log('[Signup - error] ', error);
    }
    // if (inputValue1.trim() === '') {
    //   // Nếu Input trống, hiển thị thông báo
    //   setErrorText1('Vui lòng nhập dữ liệu');
    // } else {
    //   // Xử lý khi có giá trị nhập vào Input
    //   setErrorText1('');
    //   // ... Thực hiện các xử lý khác ở đây
    // }
    // if (inputValue2.trim() === '') {
    //   setErrorText2('Vui lòng nhập dữ liệu');
    // } else {
    //   setErrorText2('');
    // }
    // if (inputValue3.trim() === '') {
    //   setErrorText3('Vui lòng nhập dữ liệu');
    // } else {
    //   setErrorText3('');
    // }
    // if (inputValue4.trim() === '') {
    //   setErrorText4('Vui lòng nhập dữ liệu');
    // } else {
    //   setErrorText4('');
    // }
    // if (
    //   inputValue1.trim() !== '' &&
    //   inputValue2.trim() !== '' &&
    //   inputValue4.trim() !== '' &&
    //   inputValue4.trim() !== ''
    // ) {
    //   // Xử lý khi cả hai trường đều có giá trị
    //   // ... Thực hiện các xử lý khác ở đây
    // }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#f8f6f0',
        width: '100%',
        paddingTop: 30,
      }}
    >
      <ScrollView>
        <ImageBackground
          source={require('../assets/images/wallpaper.png')}
          alt="Poster"
          style={styles.imgWallpaper}
        >
          <View style={styles.iconContainer}>
            <Image
              source={require('../assets/images/favicon.png')}
              alt="Icon"
              style={styles.icon}
            />
          </View>
        </ImageBackground>
        <View style={styles.container}>
          <View style={styles.Middle}>
            <Text style={styles.SignupText}>Đăng ký</Text>
          </View>

          {/* Name input field */}
          <View style={styles.buttonStyle}>
            <View>
              <Text style={styles.emailInput}>Tên</Text>
              <Input
                isDisabled={loading}
                value={firstname}
                onChangeText={(text) => setFirstname(text)}
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
              {/* {errorText1 && (
              <Text style={{ color: 'red', fontSize: 10 }}>{errorText1}</Text>
            )} */}
            </View>
          </View>

          {/* Username or email input field */}
          <View style={styles.buttonStyle2}>
            <View>
              <Text style={styles.emailInput}>Tên đệm</Text>
              <Input
                isDisabled={loading}
                value={middlename}
                onChangeText={(text) => setMiddlename(text)}
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

              {/* {errorText2 && (
              <Text style={{ color: 'red', fontSize: 10 }}>{errorText2}</Text>
            )} */}
            </View>
          </View>

          <View style={styles.buttonStyle2}>
            <View>
              <Text style={styles.emailInput}>Họ</Text>

              <Input
                isDisabled={loading}
                value={lastname}
                onChangeText={(text) => setLastname(text)}
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

              {/* {errorText2 && (
              <Text style={{ color: 'red', fontSize: 10 }}>{errorText2}</Text>
            )} */}
            </View>
          </View>

          <View style={styles.buttonStyle2}>
            <View>
              <Text style={styles.emailInput}>Số điện thoại</Text>

              <Input
                isDisabled={loading}
                value={phoneNumber}
                onChangeText={(text) => setPhoneNumber(text)}
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

              {/* {errorText2 && (
              <Text style={{ color: 'red', fontSize: 10 }}>{errorText2}</Text>
            )} */}
            </View>
          </View>
          <View style={styles.buttonStyle2}>
            <View>
              <Text style={styles.emailInput}>Email</Text>

              <Input
                isDisabled={loading}
                value={email}
                onChangeText={(text) => setEmail(text)}
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

              {/* {errorText2 && (
              <Text style={{ color: 'red', fontSize: 10 }}>{errorText2}</Text>
            )} */}
            </View>
          </View>
          {/* Password Input Field */}
          <View style={styles.buttonStyle2}>
            <View>
              <Text style={styles.emailInput}>Mật khẩu</Text>
              <Input
                isDisabled={loading}
                value={password}
                onChangeText={(text) => setPassword(text)}
                variant="outline"
                placeholder="Nhập mật khẩu"
                borderRadius={10}
                secureTextEntry={true}
                _light={{
                  placeholderTextColor: 'blueGray.400',
                }}
                _dark={{
                  placeholderTextColor: 'blueGray.50',
                }}
              />
              {/* {errorText3 && (
              <Text style={{ color: 'red', fontSize: 10 }}>{errorText3}</Text>
            )} */}
            </View>
          </View>

          {/* Button Create an account */}
          <View style={styles.buttonSigup}>
            <Button
              onPress={handleSubmit}
              style={styles.buttonDesgin}
              borderRadius={10}
              paddingBottom={3}
              isDisabled={loading}
            >
              <Text style={styles.text3}>Đăng Ký</Text>
            </Button>
          </View>
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
    </SafeAreaView>
  );
};
export default Signup;

const styles = StyleSheet.create({
  imgWallpaper: {
    height: 400,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    padding: 4,
    backgroundColor: '#ffffffbc',
    alignItems: 'center',
    borderRadius: 32,
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
});
