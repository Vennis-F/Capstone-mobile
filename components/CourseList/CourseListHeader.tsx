import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../libs/const/color';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

const CourseListHeader = ({ searchText, setSearchText }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.icons}
        onPress={() => navigation.navigate('home')}
      >
        <MaterialIcons
          name="arrow-back-ios"
          size={28}
          color={'#000'}
          style={{ marginLeft: 6 }}
        />
      </TouchableOpacity>
      <View style={styles.searchBar}>
        <TouchableOpacity style={styles.searchContainer} onPress={() => {}}>
          <Icon
            name="search"
            size={23}
            color={COLORS.MAINPINK}
            style={{ marginRight: 20, opacity: 0.5 }}
          />
          <TextInput
            onFocus={() => {}}
            placeholder="Tìm kiếm khóa học"
            underlineColorAndroid="transparent"
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text);
            }}
            style={{ width: '75%' }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            padding: 6,
            width: 48,
            height: 48,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            navigation.navigate('filterTable');
          }}
        >
          <Ionicons name="options-outline" size={28} color={COLORS.MAINPINK} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CourseListHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    gap: 20,
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingTop: 30,
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
  searchBar: {
    flexDirection: 'row',
    gap: 12,
    width: '80%',
  },
  searchContainer: {
    height: 50,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#00000033',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
});
