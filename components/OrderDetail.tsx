import React, { startTransition, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button, FlatList, ScrollView } from 'native-base';
import { useNavigation } from '@react-navigation/native';

const OrderDetail = ({ path }: { path: string }) => {
  const detail = {
    id: 'c2343ba2-8abf-11ee-b9d1-0242ac120002',
    date: '5-10-2023',
    customer: 'Nguyễn Đoàn Thiện Nguyên',
    total: 180000,
    status: true,
  };
  const courses = [
    {
      id: 1,
      title: 'Học vẽ phác họa tĩnh vật cấp tốc',
      amount: 100000,
      price: 80000,
    },
    {
      id: 2,
      title: 'Học lên màu cơ bản',
      price: 100000,
    },
  ];
  const transaction = {
    transactionId: 'VNP14175749',
    payment: 'VNPay',
    date: '5-10-2023',
    bank: 'NCB',
    status: true,
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detail}>
        <Text style={styles.title}>Thông tin đơn hàng</Text>
        <View style={styles.detailInfoContainer}>
          <Text style={styles.detailInfo}>Đơn đặt hàng số: &nbsp;</Text>
          <Text style={styles.detailData}>{detail.id}</Text>
        </View>
        <View style={styles.detailInfoContainer}>
          <Text style={styles.detailInfo}>Ngày:</Text>
          <Text style={styles.detailData}>{detail.date}</Text>
        </View>
        <View style={styles.detailInfoContainer}>
          <Text style={styles.detailInfo}>Khách hàng:</Text>
          <Text style={styles.detailData}>{detail.customer}</Text>
        </View>
        <View style={styles.detailInfoContainer}>
          <Text style={styles.detailInfo}>Tổng tiền thanh toán:</Text>
          <Text style={[styles.detailData, styles.detailTotal]}>
            {detail.total} VND
          </Text>
        </View>
        <View style={styles.detailInfoContainer}>
          <Text style={styles.detailInfo}>Trạng thái:</Text>
          <Text
            style={[
              styles.detailData,
              detail.status ? styles.success : styles.fail,
            ]}
          >
            {detail.status ? 'Thành công' : 'Không thành công'}
          </Text>
        </View>
      </View>

      <Text style={styles.title}>Chi Tiết đơn hàng</Text>
      <FlatList
        style={{ marginBottom: 12 }}
        data={courses}
        renderItem={({ item }) => (
          <>
            <View style={[styles.detail, styles.courseContainer]}>
              <View style={styles.courseDetail}>
                <Text style={[styles.detailInfo, styles.courseTitle]}>
                  {item.title}
                </Text>
                <Text style={styles.courseAmount}>{item.price} VND</Text>
                {item.amount ? (
                  <Text style={styles.coursePrice}>{item.amount} VND</Text>
                ) : (
                  ''
                )}
              </View>
              <Image
                style={styles.courseImg}
                source={{
                  uri: 'https://paintvine.co.nz/cdn/shop/articles/The_Magic_of_Paint_Mixing_and_Blending_46ae6a58-4182-4145-aaec-865d494cd44a.png?crop=center&height=720&v=1693260679&width=1440',
                }}
              />
            </View>
          </>
        )}
      ></FlatList>
      <View style={styles.detail}>
        <Text style={styles.title}>Thông tin giao dịch ngân hàng</Text>
        <View style={styles.detailInfoContainer}>
          <Text style={styles.detailInfo}>Mã số giao dịch:</Text>
          <Text style={styles.detailData}>{transaction.transactionId}</Text>
        </View>
        <View style={styles.detailInfoContainer}>
          <Text style={styles.detailInfo}>Thanh toán thông quá:</Text>
          <Text style={styles.detailData}>{transaction.payment}</Text>
        </View>
        <View style={styles.detailInfoContainer}>
          <Text style={styles.detailInfo}>Ngày giao dịch:</Text>
          <Text style={styles.detailData}>{transaction.date}</Text>
        </View>
        <View style={styles.detailInfoContainer}>
          <Text style={styles.detailInfo}>Ngân hàng thanh toán:</Text>
          <Text style={[styles.detailData]}>{transaction.bank}</Text>
        </View>
        <View style={styles.detailInfoContainer}>
          <Text style={styles.detailInfo}>Trạng thái:</Text>
          <Text
            style={[
              styles.detailData,
              detail.status ? styles.success : styles.fail,
            ]}
          >
            {detail.status ? 'Thành công' : 'Không thành công'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '85%',
    padding: 4,
    marginTop: 16,
  },
  detail: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#0000006e',
    borderRadius: 12,
    marginBottom: 32,
  },
  title: {
    color: 'rgba(9, 42, 250, 1)',
    fontSize: 20,
    fontWeight: '700',
    maxWidth: '90%',
    paddingBottom: 12,
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
});

export default OrderDetail;
