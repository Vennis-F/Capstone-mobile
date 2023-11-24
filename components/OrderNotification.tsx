import React, { startTransition, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';

const OrderNotification = ({ path }: { path: string }) => {
  const [transactionDetails, setTransactionDetails] = useState({
    paymentType: 'VnPay',
    bank: 'NCB',
    email: 'hoanganhgo28062001@gmail.com',
    amount: 90000,
    transactionId: 14195632,
    status: false,
  });

  const navigation = useNavigation();
  const handleReturn = () => {
    navigation.navigate('index');
  };

  return (
    <View style={styles.container}>
      {transactionDetails.status ? (
        <Image
          source={require('../assets/images/green-check.png')}
          style={styles.headerImage}
        />
      ) : (
        <Image
          source={require('../assets/images/red-fail.png')}
          style={styles.headerImage}
        />
      )}
      <Text
        style={[
          styles.header,
          transactionDetails.status ? styles.sucess : styles.fail,
        ]}
      >
        Thanh Toán
        <Text>
          {transactionDetails.status ? ' Thành Công' : ' Không Thành Công'}
        </Text>
      </Text>
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionType}>Thể loại thanh toán:</Text>
        <Text style={styles.transactionValue}>
          {transactionDetails.paymentType}
        </Text>

        <Text style={styles.transactionType}>Ngân hàng:</Text>
        <Text style={styles.transactionValue}>{transactionDetails.bank}</Text>

        <Text style={styles.transactionType}>Email:</Text>
        <Text style={styles.transactionValue}>{transactionDetails.email}</Text>

        <Text style={styles.transactionType}>Số tiền:</Text>
        <Text style={styles.transactionValue}>{transactionDetails.amount}</Text>

        <Text style={styles.transactionType}>Mã giao dịch:</Text>
        <Text style={styles.transactionValue}>
          {transactionDetails.transactionId}
        </Text>
      </View>
      <Button
        style={styles.buttonDesgin}
        borderRadius={10}
        paddingBottom={3}
        onPress={handleReturn}
      >
        <Text>Quay lại trang chủ</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  headerImage: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    margin: 12,
  },
  header: {
    maxWidth: '70%',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  sucess: {
    color: '#009239',
  },
  fail: {
    color: '#ff491b',
  },
  transactionDetails: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 24,
    marginBottom: 20,
    width: '90%',
    padding: 12,
  },
  transactionType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  transactionValue: {
    fontSize: 16,
    color: '#000',
  },
  buttonDesgin: {
    backgroundColor: '#FB641B',
  },
});

export default OrderNotification;
