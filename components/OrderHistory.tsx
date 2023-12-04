import { Ionicons } from '@expo/vector-icons';
import { Button } from 'native-base';
import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { findOrdersByUser } from '../apis/order/api';
import { Order, convertOrderStatus } from '../apis/order/types';
import { formatCurrency } from '../libs/core/handle-price';
import { formatStringtoDate } from '../libs/core/handle-time';
import { useFocusEffect, useNavigation } from 'expo-router';

const OrderHistory = ({ path }: { path: string }) => {
  const [dropdownPress, setdropdownPress] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>();

  const getOrder = async () => {
    setOrders(await findOrdersByUser());
  };

  useFocusEffect(
    React.useCallback(() => {
      getOrder();
    }, [])
  );

  const navigation = useNavigation();
  const backToHome = () => {
    navigation.navigate('index');
  };

  const dropdownHandle = (id: string) => {
    if (dropdownPress.includes(id)) {
      setdropdownPress(
        dropdownPress.filter((pressedId: string) => pressedId !== id)
      );
    } else {
      setdropdownPress([...dropdownPress, id]);
    }
  };
  console.log('[orders] ', orders);
  return (
    <View style={styles.container}>
      {orders?.length >= 1 ? (
        <FlatList
          data={orders}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View style={styles.headerContainer}>
                <View style={styles.header}>
                  <Ionicons name="md-cart-outline" size={28} color={'#000'} />
                  <Text style={styles.title}>
                    {item.orderDetails.length > 1
                      ? `${item.orderDetails.length} Khóa học đã mua`
                      : item.orderDetails[0]?.course?.title}
                  </Text>
                </View>
                {item.orderDetails.length > 1 ? (
                  <Ionicons
                    style={[
                      dropdownPress.includes(item.id)
                        ? styles.unpressedButton
                        : styles.pressedButton,
                    ]}
                    name="caret-down-circle-outline"
                    size={28}
                    onPress={() => {
                      dropdownHandle(item.id);
                    }}
                  />
                ) : (
                  ''
                )}
              </View>
              {item.orderDetails.length > 1 ? (
                <FlatList
                  style={dropdownPress.includes(item.id) ? null : styles.hidden}
                  data={item.orderDetails}
                  renderItem={({ item }) => (
                    <View style={styles.subjectDetail}>
                      <Text style={styles.subjectTitle}>
                        {item?.course?.title} :
                      </Text>
                      <Text style={styles.subjectPrice}>
                        {formatCurrency(item.priceAfterPromotion)} vnđ
                      </Text>
                    </View>
                  )}
                ></FlatList>
              ) : (
                ''
              )}
              <View style={styles.detailContainer}>
                <Text style={styles.detail}>Ngày:</Text>
                <Text style={styles.info}>
                  {formatStringtoDate(item.updatedDate)}
                </Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.detail}>Tổng Tiền:</Text>
                <Text style={[styles.info, { fontWeight: 'bold' }]}>
                  {formatCurrency(item.totalPriceAfterPromotion)} VNĐ
                </Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.detail}>Trạng thái:</Text>
                <Text
                  style={[
                    styles.info,
                    { color: `${convertOrderStatus(item.orderStatus).color}` },
                  ]}
                >
                  {convertOrderStatus(item.orderStatus).vietnamse}
                  {/* {item.orderStatus ? 'Thành công' : 'Không thành công'} */}
                </Text>
              </View>

              <Button
                style={styles.detailButton}
                onPress={() => {
                  navigation.navigate('orderDetail', { id: item.id });
                }}
              >
                <Text style={styles.buttonText}>Chi Tiết</Text>
              </Button>
            </View>
          )}
        />
      ) : (
        <View style={[styles.item, { alignItems: 'center', marginTop: 60 }]}>
          <Ionicons name="md-cart" size={92} color="grey" />
          <Text style={{ fontSize: 24, textAlign: 'center' }}>
            Bạn chưa có đơn hàng nào, hãy mua sắm nào!
          </Text>
          <Button
            style={{
              backgroundColor: '#ff4444',
              marginVertical: 12,
              borderRadius: 12,
            }}
            onPress={backToHome}
          >
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
              Mua Sắm Ngay
            </Text>
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    width: '100%',
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
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    gap: 24,
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    color: 'rgba(9, 42, 250, 0.7)',
    fontWeight: '700',
    maxWidth: '70%',
  },
  pressedButton: {
    color: 'rgba(0,0,0,0.6)',
  },
  unpressedButton: {
    color: 'rgba(9, 42, 250, 0.7)',
  },
  detailContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 20,
    paddingVertical: 6,
  },
  detail: {
    fontSize: 16,
    fontWeight: '600',
    minWidth: 100,
  },
  info: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.6)',
  },
  statusSuccess: { color: '#1bab33' },
  statusFail: { color: '#f7572bf2' },
  detailButton: {
    marginTop: 12,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.7)',
    borderWidth: 1,
    borderRadius: 4,
  },
  hidden: {
    display: 'none',
  },
  subjectDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
  },
  subjectTitle: {
    fontSize: 16,
    color: '#ef4444',
    fontWeight: '600',
    width: '55%',
  },
  subjectPrice: {
    fontSize: 15,
    fontWeight: '500',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '900',
  },
});

export default OrderHistory;
