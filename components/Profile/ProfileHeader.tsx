import { getImage } from '../../apis/image/components/apis';
import { ImageBackground, Image, StyleSheet } from 'react-native';

const ProfileHeader = ({ userLogin, userData }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/360_F_562024161_tGM4lFlnO0OczLYHFFuNNdMUTG9ekHxb.jpg')}
      style={styles.cover}
    >
      {userLogin && userData?.avatar ? (
        <Image
          source={{ uri: getImage(userData?.avatar) }}
          style={styles.profile}
        />
      ) : (
        <Image
          source={require('../../assets/images/avatar.png')}
          style={styles.profile}
        />
      )}
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
  profile: {
    height: 140,
    width: 140,
    borderRadius: 999,
    resizeMode: 'cover',
    borderWidth: 4,
    borderColor: '#fffffffd',
    marginBottom: 2,
  },
});
