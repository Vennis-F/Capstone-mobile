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

import {
  changePasswordUser,
  getProfileUser,
  updateProfile,
  uploadAvatarUser,
} from '../apis/user/apis';
import {
  ChangePasswordUserBodyRequest,
  UpdateProfileBodyRequest,
  UserFilterResponse,
} from '../apis/user/types';
import { showErrorAlert } from '../libs/core/handle-show.-mesage';
import { getImage } from '../apis/image/components/apis';
import { Button, Input } from 'native-base';
import { showMessage } from 'react-native-flash-message';
import * as ImagePicker from 'expo-image-picker';
import { UserRole } from '../apis/auth/types';
import ProfileHeader from '../components/Profile/ProfileHeader';
import NameContainer from '../components/Profile/NameContainer';
import UserDetail from '../components/Profile/UserDetail';
import UserPassword from '../components/Profile/UserPassword';

export default function Profile() {
  const [userRole, setUserRole] = useState<UserRole | null>();
  const [userData, setuserData] = useState<UserFilterResponse>();
  const navigation = useNavigation();
  const [userLogin, setuserLogin] = useState(false);
  const [pressDetail, setPressDetail] = useState(false);
  const [pressPassword, setPressPassword] = useState(false);
  // const [pressAvatar, setPressAvatar] = useState(false);

  const [image, setImage] = useState(null);

  const showSuccessMessage = () => {
    // Hiển thị thông báo khi đăng nhập thành công
    showMessage({
      message: 'Đã đăng xuất khỏi tài khoản',
      type: 'warning',
      duration: 2000, // Thời gian hiển thị (2 giây)
    });
  };

  const handleGetUserRole = async () => {
    try {
      setUserRole(await getUserRole());
    } catch (error) {
      console.log('[Profile - get role error] ', error);
    }
  };

  const handleCheckIsLogin = async () => {
    try {
      const token = await getAccessToken();
      if (token) setuserLogin(true);
      else setuserLogin(false);
    } catch (error) {
      console.log('[Profile - check login error] ', error);
    }
  };

  const handleLogout = async () => {
    try {
      const token = await getAccessToken();

      if (token) {
        await guestSignOut(token);
        removeAccessToken();
        setuserLogin(false);
        showSuccessMessage();
        setUserRole(null);
        navigation.navigate('home');
      } else console.log('[error]', 'You are not allowed to log out');
    } catch (error) {
      console.log('[Profile - log out error] ', error);
    }
  };

  const getUserProfile = async () => {
    try {
      setuserData(await getProfileUser());
    } catch (error) {
      console.log('[Profile - get profile error] ', error);
    }
  };

  useEffect(() => {
    if (userLogin && userRole === 'Customer') {
      getUserProfile();
    } else {
      setuserData(null);
    }
  }, [userLogin, userRole]);

  useFocusEffect(
    React.useCallback(() => {
      handleCheckIsLogin();
      handleGetUserRole();
    }, [])
  );

  const handleUpdateAvatar = async (uri: any) => {
    // const formData = new FormData();
    // formData.append('file', body);
    // try {
    //   await uploadAvatarUser(formData);
    //   setNotification({
    //     message: 'đã thay đổi ảnh đại diện',
    //     type: 'success',
    //   });
    // } catch (error) {
    //   setNotification({
    //     message: 'Xảy ra sự cố khi thay đổi ảnh đại diện',
    //     type: 'danger',
    //   });
    // }
    // await getUserProfile();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <ProfileHeader userData={userData} userLogin={userLogin} />

      <ScrollView>
        {userRole === 'Customer' ? (
          <View style={styles.profileContainer}>
            <NameContainer userData={userData} userLogin={userLogin} />

            {userLogin === false ? (
              <View></View>
            ) : (
              <View style={styles.menuWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    setPressDetail(!pressDetail);
                    setPressPassword(false);
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
                {pressDetail && (
                  <UserDetail
                    getUserProfile={getUserProfile}
                    userData={userData}
                  />
                )}

                <TouchableOpacity
                  onPress={() => {
                    setPressPassword(!pressPassword);
                    setPressDetail(false);
                  }}
                >
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
                {pressPassword && <UserPassword />}
                {/* <TouchableOpacity
                  onPress={() => {
                    setPressAvatar(!pressAvatar);
                  }}
                >
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
                <View
                  style={[
                    styles.userInfo,
                    pressAvatar ? styles.show : styles.hidden,
                  ]}
                >
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
                      style={styles.buttonAvatar}
                      borderRadius={8}
                      paddingBottom={3}
                      onPress={pickImage}
                    >
                      <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                        Tải lên ảnh đại diện mới
                      </Text>
                    </Button>
                  </View>
                  {image && (
                    <>
                      <Image
                        source={{ uri: image }}
                        style={{
                          width: 140,
                          height: 140,
                          alignSelf: 'center',
                          borderRadius: 999,
                          borderWidth: 4,
                          borderColor: '#00568184',
                          resizeMode: 'center',
                        }}
                      />
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
                          style={styles.buttonAvatarConfirm}
                          borderRadius={8}
                          paddingBottom={3}
                          onPress={() => {
                            handleUpdateAvatar(image);
                          }}
                        >
                          <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                            Xác nhận
                          </Text>
                        </Button>
                      </View>
                    </>
                  )}
                </View> */}
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('myChildCourses');
                  }}
                >
                  <View style={styles.menuItem}>
                    <Icon
                      name="tv"
                      size={24}
                      style={{ marginRight: 30 }}
                      color={'#eab308'}
                    />
                    <Text style={styles.menuTextSub}>Khóa học của bé</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('children');
                  }}
                >
                  <View style={styles.menuItem}>
                    <Icon
                      name="transfer-within-a-station"
                      size={24}
                      style={{ marginRight: 30 }}
                      color={'#eab308'}
                    />
                    <Text style={styles.menuTextSub}>
                      Quản lý tài khoản của bé
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
        ) : (
          <View style={styles.profileContainer}>
            <View style={[styles.menuWrapper]}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('myChildCourses');
                }}
              >
                <View style={styles.menuItem}>
                  <Icon
                    name="tv"
                    size={24}
                    style={{ marginRight: 30 }}
                    color={'#eab308'}
                  />
                  <Text style={styles.menuTextSub}>Khóa học của bé</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogout}>
                <View style={[styles.menuItem]}>
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
          </View>
        )}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ffffff',
  },

  profileContainer: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 12,
    paddingTop: 4,
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

  nameContainer: {
    width: '30%',
    alignSelf: 'center',
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

  buttonAvatar: {
    width: '70%',
    backgroundColor: '#1976d2',
    borderWidth: 1,
    borderColor: '#fff',
  },
  buttonAvatarConfirm: {
    width: '35%',
    backgroundColor: '#25b92d',
    borderWidth: 1,
    borderColor: '#fff',
  },
});
