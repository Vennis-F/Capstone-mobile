import { Checkbox } from 'native-base';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Chapter = ({ item, onPress, backgroundColor }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[{ backgroundColor, paddingHorizontal: 20 }]}
  >
    <View style={styles.box}>
      <View style={{ marginRight: 20, marginTop: 16 }}>
        <Checkbox
          shadow={2}
          value="test"
          isChecked={item.isCompleted}
          isDisabled={true}
          aria-label="item"
        ></Checkbox>
      </View>
      <View>
        <Text style={{ fontSize: 18 }}>{item.title}</Text>
        <View style={styles.boxSub}>
          <Icon name="ondemand-video" size={20} />
          <Text style={{ fontSize: 15, marginLeft: 10 }}>
            {Math.floor(item.totalContentLength / 60)} phút
          </Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

export default Chapter;

const styles = StyleSheet.create({
  box: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  boxSub: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});
