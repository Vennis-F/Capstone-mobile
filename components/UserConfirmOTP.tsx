import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import React, { useState } from 'react';

import {
  Input,
  NativeBaseProvider,
  Button,
  Icon,
  Box,
  Image,
  AspectRatio,
} from 'native-base';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

import { useNavigation, useRoute } from '@react-navigation/native';
import { customerConfirm, customerSignUp } from '../apis/auth/api';
import {
  CustomerConfirmRequest,
  CustomerSignupRequest,
} from '../apis/auth/types';

const ConfirmOTP = () => {
  const navigation = useNavigation();
  const [codeOTP, setCodeOTP] = useState('');
  const [loading, setLoading] = useState(false);
  const email = useRoute().params?.email;

  const handelReset = () => {
    setCodeOTP(''), setLoading(false);
  };

  const handleSubmit = async () => {
    const body: CustomerConfirmRequest = {
      email: email,
      otp: codeOTP,
    };
    setLoading(true);
    try {
      console.log('[UserConfirmOTP - api] ', await customerConfirm(body));
      console.log('navigate');
      handelReset();
      navigation.navigate('login');
    } catch (error) {
      setLoading(false);
      console.log('[confirmOTP - error] ', error);
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
      }}
    >
      <ImageBackground
        source={require('../assets/images/wallpaper.png')}
        alt="Poster"
        style={styles.imgWallpaper}
      >
        <View style={styles.Middle}>
          <Text style={styles.SignupText}>Xác thực qua Email</Text>
          <Text style={styles.explain}>Nhập mã 6 số tại đây</Text>
        </View>
      </ImageBackground>
      <View style={styles.container}>
        {/* Name input field */}
        <View style={styles.buttonStyle}>
          <View>
            <Input
              style={styles.input}
              isDisabled={loading}
              value={codeOTP}
              onChangeText={(text) => setCodeOTP(text)}
              variant="underlined"
              placeholder="Nhập mã OTP gồm 6 chữ số"
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

        {/* Button Create an account */}
        <View style={styles.buttonSigup}>
          <Button
            onPress={handleSubmit}
            style={styles.buttonDesgin}
            borderRadius={10}
            paddingBottom={3}
            isDisabled={loading}
          >
            <Text style={styles.text3}>Xác nhận</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default ConfirmOTP;

const styles = StyleSheet.create({
  imgWallpaper: {
    height: 220,
    width: '100%',
    justifyContent: 'flex-end',
  },
  Middle: {
    width: '80%',
    padding: 20,
  },
  SignupText: {
    fontSize: 30,
    fontWeight: '800',
    color: '#fff',
  },
  explain: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    alignItems: 'center',
  },

  buttonStyle: {
    marginTop: 5,
    marginBottom: 7,
    width: '70%',
  },
  input: {
    fontSize: 16,
    textAlign: 'center',
  },
  buttonSigup: {
    marginTop: 20,
    width: '60%',
  },
  buttonDesgin: {
    backgroundColor: '#FB641B',
  },
  text3: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
  },
});
