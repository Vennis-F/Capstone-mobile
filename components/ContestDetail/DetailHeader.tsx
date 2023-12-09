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

const DetailHeader = ({ contest }) => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      style={styles.thumbnail}
      source={{
        uri: getImage(contest.thumbnailUrl),
      }}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.icons}
          onPress={() => navigation.navigate('contest')}
        >
          <MaterialIcons
            name="arrow-back-ios"
            size={28}
            color={'#000'}
            style={{ marginLeft: 6 }}
          />
        </TouchableOpacity>
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
