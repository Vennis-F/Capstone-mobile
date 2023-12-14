import {
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { getImage } from '../../apis/image/components/apis';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { COLORS } from '../../libs/const/color';

const DetailHeader = ({ isOwned, userRole, course, id, prevPage }) => {
  const navigation = useNavigation();
  console.log('prevpage', prevPage);
  return (
    <ImageBackground
      style={styles.thumbnail}
      source={{
        uri: getImage(course.thumbnailUrl),
      }}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.icons}
          onPress={() => navigation.navigate(prevPage || 'courseList')}
        >
          <MaterialIcons
            name="arrow-back-ios"
            size={28}
            color={'#000'}
            style={{ marginLeft: 6 }}
          />
        </TouchableOpacity>
        {userRole === 'Customer' ? (
          <TouchableOpacity
            style={styles.icons}
            onPress={() => navigation.navigate('cart')}
          >
            <Ionicons name="md-cart-outline" size={28} color={'#000'} />
          </TouchableOpacity>
        ) : (
          ''
        )}
      </View>

      <View style={{ alignItems: 'flex-end' }}>
        {isOwned ? (
          <View style={styles.addCartBtn}>
            <Text
              style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}
              onPress={() => {
                navigation.navigate('videoPlayer', { id: id });
              }}
            >
              Chuyển đến khóa học
            </Text>
          </View>
        ) : (
          ''
        )}
      </View>
    </ImageBackground>
  );
};

export default DetailHeader;

const styles = StyleSheet.create({
  thumbnail: {
    height: 380,
    borderRadius: 15,
    resizeMode: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icons: {
    borderWidth: 1,
    borderColor: '#0000004a',
    borderRadius: 99,
    backgroundColor: '#ffffffdf',
    padding: 4,
    width: 40,
    height: 40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addCartBtn: {
    width: 180,
    height: 50,
    backgroundColor: COLORS.MAINPINK,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 50,
    marginRight: 24,
    padding: 4,
  },
});
