import { useCallback, useState } from 'react';
import { getImage } from '../../apis/image/components/apis';
import { ImageBackground, Image, StyleSheet, View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { getRandomInt } from '../../libs/core/handle-price';

const ProfileHeader = ({
  userLogin,
  userAvatar,
  imageChanged,
  setImageChanged,
}) => {
  const [changeAdd, setChangeAdd] = useState(getRandomInt(99999));

  useFocusEffect(
    useCallback(() => {
      if (imageChanged) {
        setChangeAdd(getRandomInt(99999));
        setImageChanged(false);
      }
    }, [imageChanged])
  );

  return (
    <ImageBackground
      source={require('../../assets/images/360_F_562024161_tGM4lFlnO0OczLYHFFuNNdMUTG9ekHxb.jpg')}
      style={styles.cover}
    >
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri:
              userLogin && userAvatar
                ? getImage(`${userAvatar}&change=${changeAdd}`)
                : '../../assets/images/avatar.png',
          }}
          resizeMode="center"
          style={styles.profile}
        />
      </View>
    </ImageBackground>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  cover: {
    height: 200,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  profileContainer: {
    borderRadius: 999,
    borderWidth: 4,
    marginBottom: 2,
    borderColor: '#fffffffd',
    backgroundColor: '#d7d7d7',
  },
  profile: {
    height: 140,
    width: 140,
    resizeMode: 'center',
    borderRadius: 999,
  },
});
