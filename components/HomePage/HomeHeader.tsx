import { Ionicons } from '@expo/vector-icons';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import { COLORS } from '../../libs/const/color';
import { useState } from 'react';
import SearchBar from './SearchBar';

export default function HomeHeader({}) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <TouchableOpacity
      style={styles.header}
      activeOpacity={1}
      onPress={() => {
        if (isClicked) setIsClicked(false);
      }}
    >
      {/* <View>
          <FlashMessage style={{ paddingHorizontal: 20 }} />
        </View> */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}
      >
        <View style={{ maxWidth: '70%' }}>
          <Text style={styles.greetingText}>Xin Chào Thiện Nguyên</Text>
          <Text style={styles.underGreetingText}>Cùng nhau học nào</Text>
        </View>
        <View>
          <Ionicons style={styles.cartHeader} name="cart" size={32} />
        </View>
      </View>
      <SearchBar isClicked={isClicked} setIsClicked={setIsClicked} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.MAINPINK,
    height: 240,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingTop: 58,
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
