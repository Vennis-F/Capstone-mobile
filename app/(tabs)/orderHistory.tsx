import { StyleSheet } from 'react-native';

import { View } from '../../components/Themed';
import OrderHistory from '../../components/OrderHistory';

export default function TabThreeScreen() {
  return (
    <View style={styles.container}>
      <OrderHistory path="app/(tabs)/orderHistory.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
