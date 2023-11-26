import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { StatusBar } from 'expo-status-bar';
import { COLORS } from '../libs/const/color';
import {
  getAccessToken,
  getUserRole,
  removeAccessToken,
} from '../libs/core/handle-token';
import { guestSignOut } from '../apis/auth/api';
import { useFocusEffect } from 'expo-router';

import { getProfileUser } from '../apis/user/apis';
import { UserFilterResponse } from '../apis/user/types';
import { showErrorAlert } from '../libs/core/handle-show.-mesage';
import { getImage } from '../apis/image/components/apis';
import { Button, Input } from 'native-base';

export default function Profile({ path }: { path: String }) {
  const [userData, setuserData] = useState<UserFilterResponse>();
  const navigation = useNavigation();
  const [userLogin, setuserLogin] = useState(false);
  const [pressDetail, setPressDetail] = useState(false);

  const [email, setEmail] = useState(userData?.email);
  const [username, setUsername] = useState(userData?.userName);
  const [firstname, setFirstname] = useState(userData?.firstName);
  const [middlename, setMiddlename] = useState(userData?.middleName);
  const [lastname, setLastname] = useState(userData?.lastName);
  const [phone, setPhone] = useState(userData?.phoneNumber);

  const handleCheckIsLogin = async () => {
    const token = await getAccessToken();
    if (token) setuserLogin(true);
    else setuserLogin(false);
  };

  const handleLogout = async () => {
    const token = await getAccessToken();

    if (token) {
      await guestSignOut(token);
      removeAccessToken();
      setuserLogin(false);
    } else console.log('[error]', 'You are not allowed to log out');
  };

  console.log('[Profile login]', userLogin);

  // useEffect(() => {
  //     handleCheckIsLogin()
  // }, [])

  const getUserProfile = async () => {
    setuserData(await getProfileUser());
  };

  useEffect(() => {
    if (userLogin) {
      getUserProfile();
    }
  }, [userLogin]);

  useFocusEffect(
    React.useCallback(() => {
      handleCheckIsLogin();
    }, [])
  );

  const fullname =
    userData?.lastName + ' ' + userData?.middleName + ' ' + userData?.firstName;
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/360_F_562024161_tGM4lFlnO0OczLYHFFuNNdMUTG9ekHxb.jpg')}
        style={styles.cover}
      >
        {userLogin ? (
          <Image
            source={{ uri: getImage(userData?.avatar) }}
            style={styles.profile}
          />
        ) : (
          ''
        )}
      </ImageBackground>
      <ScrollView>
        <View style={styles.profileContainer}>
          <Text style={styles.name}>
            {userLogin === true ? fullname : 'Xin hãy đăng nhập trước'}
          </Text>
          {userLogin === false ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('seven');
              }}
            >
              <View style={styles.loginBtn}>
                <Text style={styles.menuText}>ĐĂNG NHẬP</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.loginBtn}>
              <Text style={styles.menuText}>{userData?.email}</Text>
            </View>
          )}

          {userLogin === false ? (
            <View></View>
          ) : (
            <View style={styles.menuWrapper}>
              <TouchableOpacity
                onPress={() => {
                  setPressDetail(!pressDetail);
                }}
              >
                <View style={styles.menuItem}>
                  <Icon
                    name="library-books"
                    size={24}
                    style={{ marginRight: 30 }}
                    color={'#eab308'}
                  />
                  <Text style={styles.menuTextSub}>Hồ sơ</Text>
                </View>
              </TouchableOpacity>
              <View
                style={[
                  styles.userInfo,
                  pressDetail ? styles.show : styles.hidden,
                ]}
              >
                <View style={styles.infoContainer}>
                  <Text style={styles.label}>
                    <Text style={{ backgroundColor: '#ffffff97' }}>Email</Text>
                  </Text>
                  <Input
                    value={email || userData?.email}
                    onChangeText={(text) => setEmail(text)}
                    variant="filled"
                    placeholder="Nhập Email ở đây"
                    borderRadius={10}
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
                    value={username || userData?.userName}
                    onChangeText={(text) => setUsername(text)}
                    variant="filled"
                    placeholder="Nhập Tên đăng nhập ở đây"
                    borderRadius={10}
                  />
                  {/* {errorText1 && (
                  <Text style={{ color: 'red' }}>{errorText1}</Text>
                )} */}
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
                      value={firstname || userData?.firstName}
                      onChangeText={(text) => setFirstname(text)}
                      variant="filled"
                      placeholder="Tên"
                      borderRadius={10}
                    />
                    {/* {errorText1 && (
                  <Text style={{ color: 'red' }}>{errorText1}</Text>
                )} */}
                  </View>
                  <View style={styles.nameContainer}>
                    <Text style={styles.label}>
                      <Text style={{ backgroundColor: '#ffffff97' }}>
                        Tên đệm
                      </Text>
                    </Text>
                    <Input
                      value={middlename || userData?.middleName}
                      onChangeText={(text) => setMiddlename(text)}
                      variant="filled"
                      placeholder="Tên đệm"
                      borderRadius={10}
                    />
                    {/* {errorText1 && (
                  <Text style={{ color: 'red' }}>{errorText1}</Text>
                )} */}
                  </View>
                  <View style={styles.nameContainer}>
                    <Text style={styles.label}>
                      <Text style={{ backgroundColor: '#ffffff97' }}>Họ</Text>
                    </Text>
                    <Input
                      value={lastname || userData?.lastName}
                      onChangeText={(text) => setLastname(text)}
                      variant="filled"
                      placeholder="Họ"
                      borderRadius={10}
                    />
                    {/* {errorText1 && (
                  <Text style={{ color: 'red' }}>{errorText1}</Text>
                )} */}
                  </View>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.label}>
                    <Text style={{ backgroundColor: '#ffffff97' }}>
                      Số điện thoại
                    </Text>
                  </Text>
                  <Input
                    value={phone || userData?.phoneNumber}
                    onChangeText={(text) => setPhone(text)}
                    variant="filled"
                    placeholder="Nhập Số điện thoại ở đây"
                    borderRadius={10}
                  />
                  {/* {errorText1 && (
                  <Text style={{ color: 'red' }}>{errorText1}</Text>
                )} */}
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
                    //   onPress={handleSubmit}
                    style={styles.buttonReset}
                    borderRadius={10}
                    paddingBottom={3}
                  >
                    <Text style={{ color: '#ef4444', fontWeight: 'bold' }}>
                      Đặt lại
                    </Text>
                  </Button>
                  <Button
                    //   onPress={handleSubmit}
                    style={styles.buttonUpdate}
                    borderRadius={8}
                    paddingBottom={3}
                  >
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                      Cập nhật
                    </Text>
                  </Button>
                </View>
              </View>
              <TouchableOpacity onPress={() => {}}>
                <View style={styles.menuItem}>
                  <Icon
                    name="security"
                    size={24}
                    style={{ marginRight: 30 }}
                    color={'#eab308'}
                  />
                  <Text style={styles.menuTextSub}>Bảo mật tài khoản</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <View style={styles.menuItem}>
                  <Icon
                    name="tag-faces"
                    size={24}
                    style={{ marginRight: 30 }}
                    color={'#eab308'}
                  />
                  <Text style={styles.menuTextSub}>Ảnh đại diện</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('three');
                }}
              >
                <View style={styles.menuItem}>
                  <Icon
                    name="tv"
                    size={24}
                    style={{ marginRight: 30 }}
                    color={'#eab308'}
                  />
                  <Text style={styles.menuTextSub}>Khóa học đã sở hữu</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <View style={styles.menuItem}>
                  <Icon
                    name="transfer-within-a-station"
                    size={24}
                    style={{ marginRight: 30 }}
                    color={'#eab308'}
                  />
                  <Text style={styles.menuTextSub}>
                    Quản lý tài khoản trẻ em
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogout}>
                <View style={styles.menuItem}>
                  <Icon
                    name="logout"
                    size={24}
                    style={{ marginRight: 30 }}
                    color={'#eab308'}
                  />
                  <Text style={styles.menuTextSub}>Đăng xuất</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f8f6f0',
  },
  cover: {
    height: 200,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 12,
    paddingTop: 4,
  },
  profile: {
    height: 140,
    width: 140,
    borderRadius: 999,
    resizeMode: 'cover',
    borderWidth: 4,
    borderColor: '#fffffffd',
    marginBottom: 2,
  },
  name: {
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 3,
    fontSize: 24,
  },
  loginBtn: {
    backgroundColor: '#ef4444a3',
    paddingBottom: 2,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 0.5,
    borderColor: '#fff',
    borderRadius: 30,
  },
  menuText: {
    // fontFamily: "regular",
    color: '#fff',
    // marginLeft: 28,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 26,
  },
  menuTextSub: {
    color: '#5c5b5b',
    // marginLeft: 28,
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 26,
  },
  setting: {
    fontSize: 13,
    marginTop: 0,
    color: '#6E7B8B',
    fontWeight: '400',
  },
  support: {
    fontSize: 13,
    marginTop: 20,
    color: '#6E7B8B',
    fontWeight: '400',
  },
  account: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  security: {
    fontSize: 18,
  },
  menuWrapper: {
    marginTop: 10,
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    width: '85%',
  },
  menuItem: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderColor: COLORS.GRAY_300,
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
    paddingVertical: 16,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderColor: '#00000023',
  },
  show: {
    display: 'flex',
  },
  hidden: {
    display: 'none',
  },
  buttonReset: {
    width: '40%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  buttonUpdate: {
    width: '40%',
    backgroundColor: '#ef4444',
    borderWidth: 1,
    borderColor: '#fff',
  },
});
