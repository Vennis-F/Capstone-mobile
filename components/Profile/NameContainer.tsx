import { useNavigation } from 'expo-router';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const NameContainer = ({ userLogin, userData }) => {
  const navigation = useNavigation();
  const fullname =
    userData?.lastName + ' ' + userData?.middleName + ' ' + userData?.firstName;
  return (
    <>
      <Text style={styles.name}>
        {userLogin === true && userData?.firstName
          ? fullname
          : 'Xin hãy đăng nhập trước'}
      </Text>
      {userLogin === false ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('login');
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
    </>
  );
};

export default NameContainer;

const styles = StyleSheet.create({
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
});
