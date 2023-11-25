import { Ionicons } from '@expo/vector-icons';
import { Button } from 'native-base';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const OrderHistory = ({ path }: { path: string }) => {
  const [items, setItems] = useState([
    {
      id: '1',
      title: '2 Khóa học đã mua',
      date: '5/10/2023',
      total: '420000',
      status: true,
      subject: [
        {
          id: '1_1',
          title: 'Học Tô màu cảnh vật',
          total: 220000,
        },
        {
          id: '1_2',
          title: 'Học phác thảo cảnh vật bằng chì khối',
          total: 200000,
        },
      ],
    },
    {
      id: '2',
      title: 'Học vẽ phác thảo tĩnh vật bằng chì màu',
      date: '25/01/2023',
      total: '400000',
      status: true,
    },
    {
      id: '3',
      title: 'Học vẽ chân dung',
      date: '13/08/2023',
      total: '320000',
      status: false,
    },
    {
      id: '4',
      title: '3 Khóa học đã mua',
      date: '31/03/2023',
      total: '1380000',
      status: true,
      subject: [
        { id: '4_1', title: 'Học pha màu nước cơ bản', total: 520000 },
        {
          id: '4_2',
          title: 'Học vẽ tranh nghệ thuật với màu nước',
          total: 620000,
        },
        { id: '4_3', title: 'Học thiết kế bố cục tranh vẽ', total: 240000 },
      ],
    },
  ]);

  const [dropdownPress, setdropdownPress] = useState<string[]>([]);

  const dropdownHandle = (id: string) => {
    if (dropdownPress.includes(id)) {
      setdropdownPress(
        dropdownPress.filter((pressedId: string) => pressedId !== id)
      );
    } else {
      setdropdownPress([...dropdownPress, id]);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.headerContainer}>
              <View style={styles.header}>
                <Ionicons name="md-cart-outline" size={28} color={'#000'} />
                <Text style={styles.title}>{item.title}</Text>
              </View>
              {item.subject ? (
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
            {item.subject ? (
              <FlatList
                style={dropdownPress.includes(item.id) ? null : styles.hidden}
                data={item.subject}
                renderItem={({ item }) => (
                  <View style={styles.subjectDetail}>
                    <Text style={styles.subjectTitle}>{item.title} :</Text>
                    <Text style={styles.subjectPrice}>{item.total} vnd</Text>
                  </View>
                )}
              ></FlatList>
            ) : (
              ''
            )}
            <View style={styles.detailContainer}>
              <Text style={styles.detail}>Ngày:</Text>
              <Text style={styles.info}>{item.date}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.detail}>Tổng Tiền:</Text>
              <Text style={styles.info}>{item.total} vnd</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.detail}>Trạng thái:</Text>
              <Text
                style={[
                  styles.info,
                  item.status ? styles.statusSuccess : styles.statusFail,
                ]}
              >
                {item.status ? 'Thành công' : 'Không thành công'}
              </Text>
            </View>

            <Button style={styles.detailButton}>
              <Text style={styles.buttonText}>Chi Tiết</Text>
            </Button>
          </View>
        )}
      />
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
    padding: 16,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 24,
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
    gap: 40,
    padding: 12,
  },
  subjectTitle: {
    fontSize: 16,
    color: '#ea8a41e2',
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
