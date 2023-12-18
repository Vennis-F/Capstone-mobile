import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { Checkbox } from 'native-base';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../libs/const/color';

const Chapter = ({ index, item, onPress, backgroundColor, fontWeight }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.chapter, { backgroundColor }]}
  >
    <Text style={[styles.index, { fontWeight }]}>{index + 1}</Text>
    <View style={styles.box}>
      <View>
        <View style={styles.titleContainer}>
          <MaterialCommunityIcons
            name="flower"
            size={20}
            color={item.isCompleted ? COLORS.MAINPINK : 'grey'}
          />
          <Text numberOfLines={1} style={{ fontSize: 18, fontWeight }}>
            {item.title}
          </Text>
        </View>
        <View style={styles.boxSub}>
          <Octicons name="video" size={16} color="grey" />
          <Text style={{ fontSize: 14, color: 'grey' }}>
            Video - {Math.floor(item.totalContentLength / 60)} phút
          </Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

export default Chapter;

const styles = StyleSheet.create({
  chapter: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  index: {
    fontSize: 18,
    marginLeft: 12,
    marginRight: 24,
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginBottom: 4,
  },
  boxSub: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingLeft: 2,
  },
});
