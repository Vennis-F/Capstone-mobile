import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { COLORS } from '../libs/const/color';
import { getContestById } from '../apis/contest/api';
import { Contest, mapStatusToVietnamese } from '../apis/contest/types';
import DetailHeader from '../components/ContestDetail/DetailHeader';
import Description from '../components/ContestDetail/Description';
import { formatStringtoDate } from '../libs/core/handle-time';
import { useFocusEffect } from 'expo-router';

const ContestDetail = ({}) => {
  const [contest, setContest] = useState<Contest>();
  const [pressedTab, setPressedTab] = useState('description');
  const [timeLeft, setTimeLeft] = useState<string>(`0`);

  const route = useRoute();
  const id = route.params?.id as string;

  const handelGetContest = async () => {
    try {
      setContest(await getContestById(id));
    } catch (error) {}
  };

  useEffect(() => {
    if (contest) {
      const endDate = new Date(contest.expiredDate).getTime();

      const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = endDate - now;

        if (distance <= 0) {
          clearInterval(timer);
          setTimeLeft(`0`);
        } else {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          // Hiển thị thời gian còn lại dưới dạng chuỗi
          setTimeLeft(`${days} ngày ${hours} giờ`);
        }
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [contest]);

  useEffect(() => {
    handelGetContest();
  }, [id]);

  useFocusEffect(
    React.useCallback(() => {
      setPressedTab('description');
    }, [])
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
        width: '100%',
        paddingTop: 12,
      }}
    >
      <StatusBar translucent={true} />
      {contest && (
        <ScrollView>
          <DetailHeader contest={contest} />

          <View style={styles.mainInfo}>
            <Text style={styles.title}>{contest.title}</Text>
            <View style={styles.reviewDetailContainer}>
              <View style={styles.reviewDetail}>
                <Text style={styles.reviewTitle}>Thí sinh tham gia</Text>
                <Text style={{ fontWeight: '600' }}>
                  {contest.totalCustomerDrawing}
                </Text>
              </View>
              <View style={styles.reviewDetail}>
                <Text style={styles.reviewTitle}>Trạng thái</Text>
                <Text
                  style={{ fontWeight: '600', textTransform: 'capitalize' }}
                >
                  {mapStatusToVietnamese(contest.status)}
                </Text>
              </View>
            </View>
            <View style={styles.reviewDetailContainer}>
              <View style={styles.reviewDetail}>
                <Text style={styles.reviewTitle}>Ngày kết thúc</Text>
                <Text style={{ fontWeight: '600' }}>
                  {formatStringtoDate(contest.expiredDate)}
                </Text>
              </View>
              <View style={styles.reviewDetail}>
                <Text style={styles.reviewTitle}>Thời gian còn lại</Text>
                <Text style={{ fontWeight: '600' }}>{timeLeft}</Text>
              </View>
            </View>
          </View>

          <View style={styles.details}>
            <View style={styles.tabBarContainer}>
              <TouchableOpacity
                onPress={() => {
                  setPressedTab('description');
                }}
                style={[
                  styles.tabBar,
                  pressedTab === 'description' ? styles.tabBarColor : null,
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    pressedTab === 'description' ? styles.tabTextColor : null,
                  ]}
                >
                  Tổng Quan
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={() => {
                //   setPressedTab('leaderBoard');
                // }}
                style={[
                  styles.tabBar,
                  pressedTab === 'leaderBoard' ? styles.tabBarColor : null,
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    pressedTab === 'leaderBoard' ? styles.tabTextColor : null,
                  ]}
                >
                  Bảng Xếp Hạng
                </Text>
              </TouchableOpacity>
            </View>

            {pressedTab === 'description' ? (
              <Description contest={contest} />
            ) : (
              ''
            )}
            {pressedTab === 'leaderBoard' ? <Text>BXH</Text> : ''}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  details: {
    backgroundColor: '#fff',
    marginBottom: 7,
    paddingTop: 20,
    paddingHorizontal: 24,
  },
  rating: {
    marginTop: 12,
    alignSelf: 'flex-end',
    color: '#ffd147',
    fontWeight: '600',
    fontSize: 18,
  },
  mainInfo: {
    marginTop: -150,
    flexDirection: 'column',
    maxWidth: '94%',
    backgroundColor: '#ffffffe5',
    zIndex: 100,
    alignSelf: 'center',
    padding: 20,
    borderWidth: 1,
    borderColor: '#0000003f',
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginBottom: 16,
    color: COLORS.MAINPINK,
  },
  reviewDetailContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  reviewDetail: {
    flexDirection: 'column',
    gap: 6,
    width: '45%',
  },
  reviewTitle: {
    textTransform: 'capitalize',
    color: 'grey',
  },
  tabBarContainer: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#00000044',
    marginBottom: 12,
  },
  tabBar: {
    width: '42%',
    alignItems: 'center',
    height: 48,
  },
  tabBarColor: {
    borderBottomWidth: 4,
    borderBottomColor: COLORS.MAINPINK,
  },
  tabText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tabTextColor: {
    color: COLORS.MAINPINK,
  },
  priceTag: {
    backgroundColor: 'rgb(234, 179, 8)',
    height: 40,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    justifyContent: 'center',
    paddingRight: 8,
  },
  buyTab: {
    height: 110,
    borderWidth: 2,
    borderColor: '#00000023',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {},
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'grey',
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.MAINPINK,
  },
  buyButton: {
    height: 50,
    width: 180,
    backgroundColor: COLORS.MAINPINK,
    borderRadius: 60,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  toCourseButton: {
    height: 50,
    width: 220,
    backgroundColor: COLORS.MAINPINK,
    borderRadius: 60,
  },
  toCourseButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
export default ContestDetail;
