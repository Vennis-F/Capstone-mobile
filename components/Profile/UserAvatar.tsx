import { useState } from 'react';
import { Button, Input } from 'native-base';
import { StyleSheet, View, Text, ActivityIndicator, Image } from 'react-native';
import { ChangePasswordUserBodyRequest } from '../../apis/user/types';
import { changePasswordUser, uploadAvatarUser } from '../../apis/user/apis';
import { showMessage } from 'react-native-flash-message';
import * as ImagePicker from 'expo-image-picker';
import { ResponseError } from '../../libs/types';
import { COLORS } from '../../libs/const/color';

const UserAvatar = ({ getUserProfile, setImageChanged }) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [body, setBody] = useState(null);

  const handleUploadAvatar = async () => {
    try {
      setLoading(true);
      await uploadAvatarUser(body);
      showMessage({
        message: 'Cập nhật ảnh đại diện thành công',
        type: 'success',
        duration: 2500,
      });
      setLoading(false);
      setImageChanged(true);
      setImage(null);
    } catch (error) {
      const errorResponse = error as ResponseError;
      const msgError =
        errorResponse?.response?.data?.message || 'Không thể Update';
      showMessage({
        message: 'Cập nhật ảnh đại diện không thành công',
        type: 'warning',
        duration: 2500,
      });
      setLoading(false);
      console.log('[UserAvatar - error avatar] ', msgError, error);
    }
    await getUserProfile();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      allowsEditing: true,
    });
    if (!result.canceled) {
      var photo = {
        uri: result.assets[0].uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      };
      var imageData = new FormData();
      imageData.append('file', photo);

      setBody(imageData);
      setImage(result.assets[0].uri);
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
          disabled={loading}
          style={styles.buttonAvatar}
          borderRadius={8}
          paddingBottom={3}
          onPress={(file) => {
            pickImage(file);
          }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', maxWidth: 100 }}>
            Tải ảnh lên
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
              disabled={loading}
              style={styles.buttonAvatarConfirm}
              borderRadius={8}
              paddingBottom={3}
              onPress={() => {
                handleUploadAvatar();
              }}
            >
              {loading ? (
                <ActivityIndicator size={'small'} color={'#fff'} />
              ) : (
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                  Xác nhận
                </Text>
              )}
            </Button>
          </View>
        </>
      )}
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
    backgroundColor: COLORS.MAINPINK,
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
