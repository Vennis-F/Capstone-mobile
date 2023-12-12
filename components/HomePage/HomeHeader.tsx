import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { COLORS } from '../../libs/const/color';
import { useCallback, useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import { getProfileUser } from '../../apis/user/apis';
import { UserFilterResponse } from '../../apis/user/types';
import { useFocusEffect, useNavigation } from 'expo-router';
import { getUserRole } from '../../libs/core/handle-token';
import { UserRole } from '../../apis/auth/types';

export default function HomeHeader() {
  const [isClicked, setIsClicked] = useState(false);
  const [user, setUser] = useState<UserFilterResponse | null>();
  const [userRole, setUserRole] = useState<UserRole | null>();
  const navigation = useNavigation();

  const handleGetUserRole = async () => {
    try {
      const role = await getUserRole();
      setUserRole(role);
    } catch (error) {
      console.log('[HomeHeader - role errorr] ', error);
      setUserRole(null);
    }
  };

  const getUser = async () => {
    try {
      if (userRole === 'Customer') {
        setUser(await getProfileUser());
      } else setUser(null);
    } catch (error) {
      setUser(null);
      console.log('[HomeHeader - get user error] ', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      try {
        handleGetUserRole();
      } catch (error) {
        console.log('[HomeHeader - focus error] ', erro);
      }
    }, [])
  );

  useEffect(() => {
    try {
      getUser();
    } catch (error) {
      console.log('[HomeHeader - effect error] ', error);
    }
  }, [userRole]);

  return (
    <TouchableOpacity
      style={styles.header}
      activeOpacity={1}
      onPress={() => {
        if (isClicked) setIsClicked(false);
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}
      >
        <View style={{ maxWidth: '70%' }}>
          <Text style={styles.greetingText}>
            Xin Chào{user ? ` ${user.middleName} ${user.firstName}` : '!'}
          </Text>
          <Text style={styles.underGreetingText}>Cùng nhau học nào</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('cart');
          }}
        >
          {user ? (
            <Ionicons style={styles.cartHeader} name="cart" size={32} />
          ) : (
            ''
          )}
        </TouchableOpacity>
      </View>
      <SearchBar isClicked={isClicked} setIsClicked={setIsClicked} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.MAINPINK,
    height: 220,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingTop: 28,
    paddingHorizontal: 20,
    zIndex: 100,
  },
  greetingText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '900',
  },
  underGreetingText: {
    color: '#fff',
    fontSize: 20,
  },
  cartHeader: {
    alignSelf: 'center',
    backgroundColor: '#ffffff4f',
    padding: 6,
    color: '#fff',
    borderRadius: 14,
  },
});
