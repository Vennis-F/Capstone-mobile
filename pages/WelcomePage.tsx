import { AntDesign, Octicons } from '@expo/vector-icons';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../libs/const/color';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useState } from 'react';
import { useNavigation } from 'expo-router';

const Poster1 = () => {
  return (
    <>
      <Image
        source={require('../assets/images/welcomePoster1.png')}
        style={styles.image}
      />
      <Text style={styles.title}>
        Chào Mừng Bạn Đến Với{' '}
        <Text style={styles.colorTitle}>VẼ CÙNG TRẺ EM</Text>
      </Text>
      <Text style={styles.script}>
        Đây là ứng dụng giúp bé phát huy đam mê và năng khiếu về nghệ thuật hội
        họa của bản thân
      </Text>
    </>
  );
};

const Poster2 = () => {
  return (
    <>
      <Image
        source={require('../assets/images/welcomePoster2.png')}
        style={styles.image}
      />
      <Text style={styles.title}>
        Thỏa Sức Đam Mê{' '}
        <Text style={styles.colorTitle}>Khám Phá Nghệ Thuật</Text>
      </Text>
      <Text style={styles.script}>
        Với đa dạng thể loại vẽ khác nhau được cung cấp, bé được thỏa sức sáng
        tạo và lựa chọn phong cách yêu thích của bản thân
      </Text>
    </>
  );
};

const Poster3 = () => {
  return (
    <>
      <Image
        source={require('../assets/images/welcomePoster3.png')}
        style={styles.image}
      />
      <Text style={styles.title}>
        Vừa Học Vừa Chơi Cùng{' '}
        <Text style={styles.colorTitle}>Bạn Bè Ở Khắp Nơi</Text>
      </Text>
      <Text style={styles.script}>
        Kết nối với bạn mới qua những cuộc thi vẽ đầy hấp dẫn và sáng tạo cùng
        với những phần quà hấp dẫn
      </Text>
    </>
  );
};

const posters = [<Poster1 />, <Poster2 />, <Poster3 />];

export default function WelcomePage() {
  const [page, setPage] = useState(0);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('home');
        }}
        style={styles.skipContainer}
      >
        <Text style={styles.skip}>Đến Trang Chính</Text>
      </TouchableOpacity>

      <View style={{ alignItems: 'center' }}>
        <Carousel
          data={posters}
          renderItem={({ item, index }) => {
            return (
              <View key={index} style={styles.mainPoster}>
                {item}
              </View>
            );
          }}
          itemWidth={500}
          sliderWidth={500}
          layout="tinder"
          layoutCardOffset={18}
          onSnapToItem={(index) => {
            setPage(index);
          }}
        />
      </View>
      <View style={styles.footer}>
        {page === 2 && (
          <View style={styles.nextBtn}>
            <AntDesign name="rightcircle" size={32} color="#ffffff" />
          </View>
        )}

        <Pagination
          activeDotIndex={page}
          dotsLength={3}
          dotColor="#FF724C"
          inactiveDotColor="#FF724C"
          dotStyle={{
            width: 14,
            height: 14,
            borderRadius: 50,
          }}
        />
        {page === 2 && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('login');
            }}
            style={styles.nextBtn}
          >
            <AntDesign name="rightcircle" size={32} color="#0084ff" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  skipContainer: {
    marginLeft: 'auto',
  },
  skip: {
    color: '#0084ff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mainPoster: {
    marginTop: -30,
    alignItems: 'center',
    backgroundColor: '#fff',
    minHeight: 600,
  },
  image: {
    width: 320,
    height: 300,
    marginBottom: 68,
  },
  title: {
    width: 320,
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  colorTitle: {
    color: COLORS.MAINPINK,
  },
  script: {
    width: 320,
    textAlign: 'justify',
    fontSize: 16,
    color: '#000000ad',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 50,
  },
  dotContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  nextBtn: {},
});
