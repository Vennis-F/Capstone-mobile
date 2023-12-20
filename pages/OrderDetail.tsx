import React, { startTransition, useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Button, FlatList, ScrollView } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import { findOrderByOrderId } from '../apis/order/api';
import { Order, convertOrderStatus } from '../apis/order/types';
import { formatStringtoDate } from '../libs/core/handle-time';
import { formatCurrency } from '../libs/core/handle-price';
import { getImage } from '../apis/image/components/apis';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../libs/const/color';

const DetailOrder = () => {
  const navigation = useNavigation();

  const [orderDetail, setOrderDetail] = useState<Order>();
  const route = useRoute();
  const id = route.params?.id;

  const getOrderById = async (id: string) => {
    setOrderDetail(await findOrderByOrderId(id));
  };

  useEffect(() => {
    getOrderById(id);
  }, [id]);

  const fullname = () => {
    if (orderDetail?.user) {
      const userInfo = orderDetail.user;
      const result = `${userInfo.lastName} ${userInfo.middleName} ${userInfo.firstName}`;
      return result;
    } else return '';
  };

  let status = { color: '#000', vietnamse: 'Unknow' };
  if (orderDetail?.orderStatus)
    status = convertOrderStatus(orderDetail?.orderStatus);
  const color = { color: status.color };

  let tranStatus = { color: '#000', vietnamse: 'Unknow' };
  if (orderDetail?.transaction?.status)
    tranStatus = convertOrderStatus(orderDetail.transaction.status);
  const tranColor = { color: tranStatus.color };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('orderHistory')}>
        <Icon
          name="arrow-back"
          size={30}
          color={'white'}
          style={styles.icons}
        />
      </TouchableOpacity>
      {orderDetail ? (
        <>
          <View style={styles.detail}>
            <Text style={styles.title}>Thông tin đơn hàng</Text>
            <View style={styles.detailInfoContainer}>
              <Text style={styles.detailInfo}>Đơn đặt hàng số: &nbsp;</Text>
              <Text style={styles.detailData}>{orderDetail.id}</Text>
            </View>
            <View style={styles.detailInfoContainer}>
              <Text style={styles.detailInfo}>Ngày:</Text>
              <Text style={styles.detailData}>
                {formatStringtoDate(orderDetail.updatedDate)}
              </Text>
            </View>
            <View style={styles.detailInfoContainer}>
              <Text style={styles.detailInfo}>Khách hàng:</Text>
              <Text style={styles.detailData}>{fullname()}</Text>
            </View>
            <View style={styles.detailInfoContainer}>
              <Text style={styles.detailInfo}>Tổng tiền thanh toán:</Text>
              <Text style={[styles.detailData, styles.detailTotal]}>
                {formatCurrency(orderDetail.totalPriceAfterPromotion)} VND
              </Text>
            </View>
            <View style={styles.detailInfoContainer}>
              <Text style={[styles.detailInfo]}>Trạng thái:</Text>
              <Text style={[styles.detailData, color]}>{status.vietnamse}</Text>
            </View>
          </View>

          <Text style={styles.title}>Chi Tiết đơn hàng</Text>

          {orderDetail.orderDetails.length >= 1 &&
            orderDetail.orderDetails.map((item, index) => {
              return (
                <View key={index}>
                  <View style={[styles.detail, styles.courseContainer]}>
                    <View style={styles.courseDetail}>
                      <Text style={[styles.detailInfo, styles.courseTitle]}>
                        {item.course.title}
                      </Text>
                      <Text style={styles.courseAmount}>
                        {formatCurrency(item.priceAfterPromotion)} VND
                      </Text>
                      {item.price !== item.priceAfterPromotion ? (
                        <Text style={styles.coursePrice}>
                          {formatCurrency(item.price)} VND
                        </Text>
                      ) : (
                        ''
                      )}
                    </View>
                    <Image
                      style={styles.courseImg}
                      source={{
                        uri: getImage(item.course.thumbnailUrl),
                      }}
                    />
                  </View>
                </View>
              );
            })}
          {orderDetail.transaction ? (
            <View style={styles.detail}>
              <Text style={styles.title}>Thông tin giao dịch ngân hàng</Text>
              <View style={styles.detailInfoContainer}>
                <Text style={styles.detailInfo}>Mã số giao dịch:</Text>
                <Text style={styles.detailData}>
                  {orderDetail.transaction?.bankTranNo}
                </Text>
              </View>
              <View style={styles.detailInfoContainer}>
                <Text style={styles.detailInfo}>Thanh toán thông quá:</Text>
                <Text style={styles.detailData}>
                  {orderDetail.transaction.cardType}
                </Text>
              </View>
              <View style={styles.detailInfoContainer}>
                <Text style={styles.detailInfo}>Ngày giao dịch:</Text>
                <Text style={styles.detailData}>
                  {formatStringtoDate(orderDetail.transaction.insertedDate)}
                </Text>
              </View>
              <View style={styles.detailInfoContainer}>
                <Text style={styles.detailInfo}>Ngân hàng thanh toán:</Text>
                <Text style={[styles.detailData]}>
                  {orderDetail.transaction.bankCode}
                </Text>
              </View>
              <View style={styles.detailInfoContainer}>
                <Text style={styles.detailInfo}>Trạng thái:</Text>
                <Text style={[styles.detailData, tranColor]}>
                  {tranStatus.vietnamse}
                </Text>
              </View>
            </View>
          ) : (
            ''
          )}
        </>
      ) : (
        <View style={[styles.item, { alignItems: 'center', marginTop: 60 }]}>
          <Ionicons name="md-reload-circle-outline" size={92} color="grey" />
          <Text style={{ fontSize: 24, textAlign: 'justify' }}>
            Đã có lỗi ngoài mong muốn. Xin chờ trong giây lát hoặc trở về trang
            chủ!
          </Text>
          <Button
            style={{
              backgroundColor: '#ff4444',
              marginVertical: 12,
              borderRadius: 12,
            }}
            onPress={() => {
              navigation.navigate('courseList');
            }}
          >
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
              Quay trở lại
            </Text>
          </Button>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 4,
    marginTop: 16,
    backgroundColor: '#ffffff',
  },
  detail: {
    width: '90%',
    alignSelf: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#0000006e',
    borderRadius: 12,
    marginBottom: 32,
    backgroundColor: '#fff',
  },
  title: {
    color: COLORS.MAINPINK,
    fontSize: 20,
    fontWeight: '700',
    maxWidth: '90%',
    paddingBottom: 12,
    textAlign: 'center',
  },
  detailInfoContainer: {
    flexDirection: 'row',
    paddingVertical: 6,
    columnGap: 12,
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  detailInfo: {
    fontSize: 16,
    fontWeight: '700',
  },
  detailData: {
    fontSize: 16,
    color: '#000000a8',
  },
  detailTotal: {
    color: 'rgba(0, 34, 255, 0.688)',
    fontWeight: 'bold',
  },
  success: {
    color: '#1bab33',
  },
  fail: { color: '#f94848' },
  courseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  courseDetail: {
    width: '62%',
  },
  courseTitle: {
    textAlign: 'right',
  },
  courseImg: {
    width: '30%',
    minHeight: 100,
  },
  courseAmount: {
    textAlign: 'right',
    color: '#3e7fdc',
    fontWeight: '600',
  },
  coursePrice: {
    textAlign: 'right',
    textDecorationLine: 'line-through',
    color: '#f94848',
  },
  icons: {
    borderWidth: 1,
    borderColor: '#0000005c',
    borderRadius: 8,
    backgroundColor: '#0000002a',
    padding: 2,
    width: 36,
    margin: 8,
  },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    borderWidth: 1,
    borderColor: '#00000061',
    borderRadius: 16,
    width: '90%',
    alignSelf: 'center',
    marginTop: 24,
  },
});

export default DetailOrder;
