import { useState } from 'react';
import { Button, Input } from 'native-base';
import { StyleSheet, View, Text, ActivityIndicator, Image } from 'react-native';
import { ChangePasswordUserBodyRequest } from '../../apis/user/types';
import { changePasswordUser, uploadAvatarUser } from '../../apis/user/apis';
import { showMessage } from 'react-native-flash-message';
import * as ImagePicker from 'expo-image-picker';
import { ResponseError } from '../../libs/types';

const UserAvatar = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

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

  const pickImage = async (file) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });
    if (!result.canceled) {
      var photo = {
        uri: result.assets[0].uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      };
      var body = new FormData();
      body.append('file', photo, 'avatar');
      console.log(body._parts[0]);
      // try {
      //   await uploadAvatarUser(body);
      // } catch (error) {
      //   const errorResponse = error as ResponseError;
      //   const msgError =
      //     errorResponse?.response?.data?.message || 'Không thể đăng nhập';
      //   console.log('[UserAvatar - error avatar] ', msgError);
      // }

      setImage(result.assets[0].uri);
    }
  };

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

  return (
    <View style={[styles.userInfo]}>
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
          onPress={(file) => {
            pickImage(file);
          }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>
            Tải lên ảnh đại diện mới
          </Text>
        </Button>
      </View>
      {/* {image && (
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
      )} */}
    </View>
  );
};

export default UserAvatar;

const styles = StyleSheet.create({
  userInfo: {
    paddingVertical: 16,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderColor: '#00000023',
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
