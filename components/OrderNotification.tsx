import React, { startTransition, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import { deleteAllCartItems } from '../apis/cart/apis';
import { updateOrder } from '../apis/order/api';
import { createTrasaction } from '../apis/transaction/api';
import { getDatafromUrl } from '../libs/core/handle-payment-url';
import { showMessage } from 'react-native-flash-message';
import { NameOrderStatus } from '../apis/order/types';
import {
  CreateTransactionBody,
  TransactionStatus,
} from '../apis/transaction/types';
import { UserFilterResponse } from '../apis/user/types';
import { getProfileUser } from '../apis/user/apis';
import { formatCurrency } from '../libs/core/handle-price';
import { useFocusEffect } from 'expo-router';

const OrderNotification = ({ path }: { path: string }) => {
  const [userData, setuserData] = useState<UserFilterResponse>();
  const [status, setStatus] = useState(false);
  const navigate = useNavigation();
  const route = useRoute();
  const url = route.params?.url as string;
  const dataUrl = getDatafromUrl(url);
  console.log('[data url] ', dataUrl);
  console.log(dataUrl);
  const vnpAmount = dataUrl.vnp_Amount[0];
  const vnpBankCode = dataUrl.vnp_BankCode[0];
  const vnpBankTranNo = dataUrl.vnp_BankTranNo[0];
  const vnpCardType = dataUrl.vnp_CardType[0];
  const vnpResponseCode = dataUrl.vnp_ResponseCode[0];
  const vnpTransactionNo = dataUrl.vnp_TransactionNo[0];
  const vnpTxnRef = dataUrl.vnp_TxnRef[0];

  const checkPayment = async () => {
    const isValidToCheckPayment =
      vnpTxnRef && vnpAmount && vnpBankCode && vnpCardType && vnpResponseCode;

    if (!isValidToCheckPayment) {
      navigation.navigate('index');
      showMessage({
        message: 'Thanh toán không thành công',
        type: 'danger',
        duration: 2000, // Thời gian hiển thị (2 giây)
      });
      return;
    }

    // Tao Giao dich mơi
    let orderStatusName = NameOrderStatus.Fail;
    const paymentAmount = Number(vnpAmount) / 100;
    const transactionBody: CreateTransactionBody = {
      orderId: vnpTxnRef,
      paymentAmount,
      bankCode: vnpBankCode,
      bankTranNo: vnpBankTranNo,
      cardType: vnpCardType,
      responseCode: vnpResponseCode,
    };

    console.log('[tran body]: ', transactionBody);
    try {
      const response = await createTrasaction(transactionBody);
      console.log('[res status]', response.status);
      if (response.status !== TransactionStatus.Success) {
        navigation.navigate('five');
        showMessage({
          message:
            'Thanh toán thất bại, vui lòng kiểm tra lại giỏ hàng và thanh toán lại',
          type: 'danger',
          duration: 2000, // Thời gian hiển thị (2 giây)
        });
      } else {
        deleteAllCartItems();
        orderStatusName = NameOrderStatus.Success;
      }
    } catch (error) {
      console.log('error', error);
      navigation.navigate('five');
      showMessage({
        message:
          'Thanh toán thất bại, vui lòng kiểm tra lại giỏ hàng và thanh toán lại',
        type: 'danger',
        duration: 2000, // Thời gian hiển thị (2 giây)
      });
    }

    await updateOrder({
      orderId: vnpTxnRef,
      nameOrderStatus: orderStatusName,
    });
  };

  // const getUserProfile = async () => {
  //   setuserData(await getProfileUser());
  // };

  useEffect(() => {
    console.log('Effect!');
    checkPayment();
    // getUserProfile();
  });

  const navigation = useNavigation();
  const handleReturn = () => {
    navigation.navigate('index');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/green-check.png')}
        style={styles.headerImage}
      />
      <Text style={[styles.header, styles.sucess]}>Thanh Toán Thành Công</Text>
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionType}>Thể loại thanh toán:</Text>
        <Text style={styles.transactionValue}>VNPay</Text>

        <Text style={styles.transactionType}>Ngân hàng:</Text>
        <Text style={styles.transactionValue}>{vnpBankCode}</Text>

        <Text style={styles.transactionType}>Email:</Text>
        <Text style={styles.transactionValue}>{'userData?.email'}</Text>

        <Text style={styles.transactionType}>Số tiền:</Text>
        <Text style={styles.transactionValue}>
          {formatCurrency(Number(vnpAmount) / 100)}
        </Text>

        <Text style={styles.transactionType}>Mã giao dịch:</Text>
        <Text style={styles.transactionValue}>{vnpTransactionNo}</Text>
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
