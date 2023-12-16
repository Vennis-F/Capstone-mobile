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
import {
  Input,
  NativeBaseProvider,
  Button,
  KeyboardAvoidingView,
} from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { guestSignIn } from '../apis/auth/api';
import { setAccessToken } from '../libs/core/handle-token';
import { showMessage } from 'react-native-flash-message';
import { COLORS } from '../libs/const/color';
import { ResponseError } from '../libs/types';

function Login() {
  const navigation = useNavigation();

  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [errorText1, setErrorText1] = useState('');
  const [errorText2, setErrorText2] = useState('');
  const [loading, setLoading] = useState(false);

  const showSuccessMessage = () => {
    // Hiển thị thông báo khi đăng nhập thành công
    showMessage({
      message: 'Đăng nhập thành công',
      type: 'success',
      duration: 3000, // Thời gian hiển thị (3 giây)
    });
  };

  const showFailMessage = (errorMsg: string) => {
    showMessage({
      message: errorMsg || 'Đăng nhập thất bại',
      type: 'warning',
      duration: 3000, // Thời gian hiển thị (3 giây)
    });
  };

  const handleSubmit = async () => {
    if (inputValue1.trim() === '') {
      setErrorText1('Vui lòng nhập Email hoặc tên đăng nhập');
    } else {
      setErrorText1('');
    }

    if (inputValue2.trim() === '') {
      setErrorText2('Vui lòng nhập mật khẩu');
    } else {
      setErrorText2('');
    }

    if (inputValue1.trim() !== '' && inputValue2.trim() !== '') {
      try {
        setLoading(true);
        const token = await guestSignIn({
          emailOrUsername: inputValue1,
          password: inputValue2,
        });
        try {
          await setAccessToken(token.accessToken);

          setLoading(false);
          showSuccessMessage();
          navigation.navigate('home');
        } catch (error) {
          console.log('[Login - set token error] ', error);
        }
      } catch (error) {
        setLoading(false);
        const errorResponse = error as ResponseError;
        const msgError =
          errorResponse?.response?.data?.message || 'Không thể đăng nhập';
        showFailMessage(msgError);
      }
    }
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require('../assets/images/wallpaper.png')}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('home');
        }}
        style={styles.backIcon}
      >
        <AntDesign name="leftcircle" size={36} color="#ffffffd9" />
      </TouchableOpacity>
      <KeyboardAvoidingView style={styles.content} behavior="height">
        <View style={styles.iconContainer}>
          <Image
            source={require('../assets/images/signinLogo.png')}
            alt="Icon"
            style={styles.icon}
          />
        </View>
        <View style={styles.logBox}>
          <View style={styles.Middle}>
            <Text style={styles.LoginText}>Đăng nhập</Text>
          </View>
          {/* Username or email input field */}
          <View style={styles.buttonStyle}>
            <View>
              <Text style={styles.emailInput}>Email hoặc Tên đăng nhập</Text>
              <Input
                isDisabled={loading}
                keyboardType="email-address"
                value={inputValue1}
                onChangeText={(text) => setInputValue1(text)}
                variant="outline"
                placeholder="Nhập email hoặc Tên đăng nhập"
                borderRadius={10}
              />
              {errorText1 && <Text style={{ color: 'red' }}>{errorText1}</Text>}
            </View>
          </View>
          {/* Password Input Field */}
          <View style={styles.buttonStyle}>
            <View>
              <Text style={styles.emailInput}>Mật khẩu</Text>
              <Input
                isDisabled={loading}
                value={inputValue2}
                onChangeText={(text) => setInputValue2(text)}
                variant="outline"
                placeholder="Nhập mật khẩu"
                borderRadius={10}
                secureTextEntry={true}
              />
              {errorText2 && <Text style={{ color: 'red' }}>{errorText2}</Text>}
            </View>
          </View>
          <View style={styles.buttonLogin}>
            <Button
              onPress={handleSubmit}
              style={styles.buttonDesgin}
              borderRadius={10}
              paddingBottom={3}
              isDisabled={loading}
            >
              {loading ? (
                <ActivityIndicator size={'large'} color={'#fff'} />
              ) : (
                <Text style={styles.text3}>Đăng nhập</Text>
              )}
            </Button>
          </View>
          <View style={styles.text4}>
            <Text style={styles.singupText}>Bạn chưa có tài khoản? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('signUp')}>
              <Text style={styles.singupText1}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
      <Login />
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  backIcon: {
    marginTop: 32,
    marginBottom: 40,
    marginLeft: 20,
  },
  content: {
    justifyContent: 'center',
    gap: 40,
  },
  iconContainer: {
    width: 150,
    backgroundColor: '#ffffffbc',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 32,
  },
  icon: {
    width: 140,
    height: 140,
  },
  logBox: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    width: '90%',
    paddingHorizontal: 30,
    paddingVertical: 24,
    borderRadius: 30,
  },
  Middle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#0000003b',
    marginBottom: 12,
  },
  LoginText: {
    fontSize: 30,
    fontWeight: '900',
  },

  buttonStyle: {
    marginTop: 8,
    marginBottom: 8,
  },
  emailInput: {
    fontSize: 16,
  },
  text2: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  forgot: {
    fontSize: 17,
    fontWeight: '500',
    marginBottom: 2,
  },
  buttonDesgin: {
    backgroundColor: '#FB641B',
  },
  lineStyle: {
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 30,
    alignItems: 'center',
  },
  text3: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    flexDirection: 'row',
    justifyContent: 'center',
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
    marginTop: 20,
  },
  singupText: {
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
  },
  singupText1: {
    color: '#0000BB',
    fontSize: 15,
    fontWeight: '500',
  },
  buttonLogin: {
    marginTop: 12,
    borderRadius: 30,
  },
});
