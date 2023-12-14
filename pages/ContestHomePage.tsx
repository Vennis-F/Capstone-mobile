import { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import {
  Contest,
  ContestStatus,
  mapStatusToVietnamese,
} from '../apis/contest/types';
import { useFocusEffect, useNavigation } from 'expo-router';
import { findContestsFilter } from '../apis/contest/api';
import { OrderType } from '../libs/types';
import { Button, ScrollView } from 'native-base';
import { getImage } from '../apis/image/components/apis';
import { formatStringtoDate, timeSince } from '../libs/core/handle-time';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { COLORS } from '../libs/const/color';
import { getRandomInt } from '../libs/core/handle-price';

const ContestHomePage = () => {
  const [page, setPage] = useState(0);
  const [contests, setContests] = useState<Contest[]>([]);
  const [change, setChange] = useState(getRandomInt(999999)); // for image reload Url
  const navigation = useNavigation();

  const handleGetContests = async () => {
    try {
      const res = await findContestsFilter({
        // status: ContestStatus.ACTIVE,
        pageOptions: {
          order: OrderType.DESC,
          page: 1,
          take: 1000,
        },
      });
      setContests(res.data);
    } catch (error) {
      console.log('[ContestHomePage - error ', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleGetContests();
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text style={styles.contestTitle}>Thi vẽ cùng bé</Text>
        <View style={styles.contestContainer}>
          <Carousel
            data={contests}
            renderItem={({ item, index }) => (
              <ImageBackground
                key={item.id}
                source={{
                  uri: getImage(`${item.thumbnailUrl}&change=${change}`),
                }}
                alt="Thumbnail"
                style={styles.image}
              >
                <View style={styles.infoContainer}>
                  <ImageBackground
                    source={{
                      uri: getImage(`${item.thumbnailUrl}&change=${change}`),
                    }}
                    alt="Thumbnail"
                    style={styles.imageBlur}
                    blurRadius={8}
                  >
                    <View style={styles.blackBackground}>
                      <View style={styles.statusContainer}>
                        <Text style={styles.status}>
                          {`${mapStatusToVietnamese(item.status)}`}
                        </Text>
                        <Text style={styles.date}>
                          {formatStringtoDate(item.expiredDate)}
                        </Text>
                      </View>
                      <Text numberOfLines={3} style={styles.title}>
                        {item.title}
                      </Text>
                      <View style={styles.iconContainer}>
                        <Button
                          onPress={() => {
                            navigation.navigate('contestDetail', {
                              id: item.id,
                            });
                          }}
                          style={styles.button}
                        >
                          <View style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>xem cuộc thi</Text>
                            <AntDesign
                              name="caretright"
                              size={10}
                              color="white"
                            />
                          </View>
                        </Button>
                        <View style={styles.totalDraw}>
                          <MaterialCommunityIcons
                            name="draw"
                            size={24}
                            color="white"
                          />
                          <Text style={styles.totalText}>
                            {item.totalCustomerDrawing}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </ImageBackground>
                </View>
              </ImageBackground>
            )}
            itemWidth={330}
            sliderWidth={500}
            layout="default"
            layoutCardOffset={18}
            onSnapToItem={(index) => {
              setPage(index);
            }}
          />
          <Pagination
            activeDotIndex={page}
            dotsLength={contests.length}
            dotColor="#FF724C"
            inactiveDotColor="#FF724C"
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 4,
            }}
          />
        </View>
        <View style={styles.generalInfo}>
          <Text style={styles.infoTitle1}>Thể lệ tham gia</Text>
          <Text style={styles.infoText1}>
            Bạn cần có tài khoản trước khi tham gia thi {'\n'}
            Vẽ đúng đề tài mà cuộc thi đã cho{'\n'}
            Hãy sử dụng tác phẩm của chính mình nhé{'\n'}
            Bạn chỉ có thể nộp tác phẩm một lần thôi
          </Text>
          <Image
            style={styles.infoImg}
            source={require('../assets/images/optionalPic.png')}
          />
        </View>
        <View style={styles.generalInfo}>
          <Text style={styles.infoTitle}>Thể lệ bình chọn</Text>
          <Text style={styles.infoText}>
            Bạn phải tham gia cuộc thi, trước khi bình chọn tác phẩm yêu thích
            {'\n'}
            Mỗi người chỉ có một lượt bình chọn thôi{'\n'}
          </Text>
          <Image
            style={styles.infoImg}
            source={require('../assets/images/optionalPic1.png')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContestHomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 32,
  },
  contestTitle: {
    fontSize: 24,
    fontWeight: '900',
    paddingLeft: 30,
    marginTop: 12,
    marginBottom: 16,
  },
  contestContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: 12,
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: 500,
    justifyContent: 'flex-end',
    borderWidth: 4,
    borderColor: COLORS.MAINPINKBLUR,
  },
  infoContainer: {
    width: '100%',
    height: 220,
    overflow: 'hidden',
  },
  imageBlur: {
    height: 500,
    width: '100%',
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'flex-end',
  },
  blackBackground: {
    height: 220,
    backgroundColor: '#00000074',
    justifyContent: 'space-around',
    padding: 20,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  status: {
    maxWidth: '40%',
    color: '#ffffffb4',
    textTransform: 'uppercase',
    fontSize: 12,
  },
  date: {
    color: '#ffffffb4',
    textTransform: 'capitalize',
  },
  title: {
    fontSize: 18,
    maxWidth: '90%',
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: 140,
    height: 42,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#ffffffdb',
    backgroundColor: '#0000008a',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffffdb',
    textTransform: 'uppercase',
    fontSize: 10,
  },
  totalDraw: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    padding: 4,
  },
  totalText: {
    color: '#fff',
  },
  generalInfo: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  infoTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.MAINPINK,
    marginBottom: 12,
  },
  infoText: {
    lineHeight: 22,
    paddingHorizontal: 8,
  },
  infoTitle1: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.MAINPINK,
    marginBottom: 12,
    textAlign: 'right',
  },
  infoText1: {
    lineHeight: 22,
    paddingHorizontal: 8,
    textAlign: 'right',
  },
  infoImg: {
    width: '100%',
    height: 120,
    resizeMode: 'center',
    marginVertical: 12,
  },
});
