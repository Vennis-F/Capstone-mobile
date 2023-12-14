import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect, useNavigation } from 'expo-router';
import {
  CustomerDrawing,
  CustomerDrawingNotFilter,
  CustomerDrawingSortField,
  mapCustomerStatus,
} from '../apis/customer-drawing/types';
import {
  createVoteCustomerDrawing,
  getCustomerDrawingsByContest,
  getCustomerDrawingsInContestByCustomer,
} from '../apis/customer-drawing/api';
import { OrderType, ResponseError } from '../libs/types';
import { getImage } from '../apis/image/components/apis';
import { useRoute } from '@react-navigation/native';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Button } from 'native-base';
import { COLORS } from '../libs/const/color';
import { ContestStatus } from '../apis/contest/types';
import DrawingModal from '../components/Contest/DrawingModal';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Colors from '../constants/Colors';
import { showMessage } from 'react-native-flash-message';

const ContestDrawings = () => {
  const route = useRoute();
  const id = route.params?.id as string;
  const status: ContestStatus = route.params?.status as ContestStatus;

  const [showDrawingModal, setShowDrawingModal] = useState('');
  const [myDrawBtn, setMyDrawBtn] = useState(false);
  const [page, setPage] = useState(0);
  const [imgCountPress, setImgCountPress] = useState(1);
  const [iconCountPress, setIconCountPress] = useState(1);
  const [loadingVote, setLoadingVote] = useState(false);

  const [drawings, setDrawings] = useState<CustomerDrawing[]>([]);
  const [myDrawings, setMyDrawings] = useState<CustomerDrawingNotFilter[]>([]);

  const getMyDrawings = async () => {
    try {
      const res = await getCustomerDrawingsInContestByCustomer(id);
      setMyDrawings(res);
    } catch (error) {
      console.log('[Drawings - get my drawings error] ', error);
    }
  };

  const navigation = useNavigation();

  const getDrawings = async () => {
    try {
      const res = await getCustomerDrawingsByContest(id, {
        customerDrawingSortField: CustomerDrawingSortField.VOTE,
        pageOptions: {
          order: OrderType.DESC,
          page: 1,
          take: 1000,
        },
      });
      setDrawings(res.data);
    } catch (error) {
      console.log('[Drawings - get drawings error] ', error);
    }
  };

  const handleVoteDrawing = async (drawingId: string) => {
    if (drawingId)
      try {
        setLoadingVote(true);
        await createVoteCustomerDrawing(drawingId);
        getDrawings();
        setLoadingVote(false);
      } catch (error) {
        const errorResponse = error as ResponseError;
        const msgError =
          errorResponse?.response?.data?.message || 'Bạn đã hết lượt bầu chọn';
        showMessage({
          message: msgError,
          type: 'warning',
          duration: 2000,
        });
        setLoadingVote(false);
        console.log('[ContestDrawings - vote error] ', error);
      }
  };

  useFocusEffect(
    React.useCallback(() => {
      getDrawings();
      getMyDrawings();
      setMyDrawBtn(false);
    }, [id])
  );

  return (
    <ScrollView style={styles.container}>
      <DrawingModal
        getDrawings={getDrawings}
        getMyDrawings={getMyDrawings}
        setShowDrawingModal={setShowDrawingModal}
        showDrawingModal={showDrawingModal}
      />
      <View style={styles.header}>
        <View style={styles.iconHeader}>
          <TouchableOpacity
            style={styles.icons}
            onPress={() => navigation.navigate('contestDetail', { id: id })}
          >
            <MaterialIcons
              name="arrow-back-ios"
              size={28}
              color={'#000'}
              style={{ marginLeft: 6 }}
            />
          </TouchableOpacity>
          {myDrawings.length >= 1 ? (
            <Button
              style={[
                styles.myDraw,
                myDrawBtn ? { backgroundColor: 'grey' } : null,
              ]}
              onPress={() => {
                setMyDrawBtn(!myDrawBtn);
              }}
            >
              <Text style={styles.myDrawText}>Bài vẽ của tôi</Text>
            </Button>
          ) : (
            status === 'ACTIVE' && (
              <Button
                style={styles.myDraw}
                onPress={() => {
                  setShowDrawingModal(id);
                }}
              >
                <Text style={styles.myDrawText}>Tham gia thi</Text>
              </Button>
            )
          )}
        </View>
        <Text style={styles.headerTitle}>
          {myDrawBtn ? 'Bài Vẽ Của Tôi' : 'Bài Dự Thi'}
        </Text>

        {!myDrawBtn && (
          <Text style={styles.headerText}>
            {drawings.length >= 1
              ? 'Hãy cùng chúng mình khám phá những tác phẩm độc đáo và thú vị của những người bạn trong cuộc thi này nào'
              : status === 'ACTIVE'
              ? 'Hiện tại vẫn chưa có bài dự thi. Hãy là người đầu tiên tham gia cuộc thi để dành cho mình những phần thưởng độc đáo nào'
              : 'Hiện tại cuộc thi chưa có bài dự thi nào'}
          </Text>
        )}
      </View>

      {myDrawBtn && myDrawings.length >= 1 && (
        <View style={styles.drawingContainer}>
          <View key={-2} style={styles.drawing}>
            <Image
              style={styles.image}
              source={{ uri: getImage(myDrawings[0].imageUrl) }}
            />
            <View style={styles.drawingInfo}>
              <View style={styles.authorContainer}>
                <Text style={styles.status}>Trạng thái: </Text>
                <Text style={styles.status}>
                  {mapCustomerStatus(myDrawings[0].status)}
                </Text>
              </View>
              <View style={styles.voteContainer}>
                <Ionicons
                  name="heart-circle"
                  size={24}
                  color={COLORS.SELECTYELLOW}
                />
                <Text style={styles.vote}>{myDrawings[0].votes.length}</Text>
              </View>
            </View>
            <View style={styles.titleInfo}>
              <Text style={styles.title}>{myDrawings[0].title}</Text>
              <Text style={styles.description}>
                {myDrawings[0].description}
              </Text>
            </View>
          </View>
        </View>
      )}

      {drawings.length >= 1 && !myDrawBtn && (
        <View style={styles.drawingContainer}>
          <Carousel
            data={drawings}
            renderItem={({ item, index }) => {
              const drawing = item;
              return (
                <View key={index} style={styles.drawing}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    disabled={drawing.isVoted || drawing.isOwned}
                    onPress={() => {
                      setImgCountPress(imgCountPress + 1);
                      if (imgCountPress === 2) {
                        if (myDrawings.length < 1) {
                          showMessage({
                            message:
                              'Bạn phải tham gia cuộc thi để có thể bầu chọn',
                            type: 'info',
                            duration: 2400,
                          });
                        } else {
                          handleVoteDrawing(drawing.id);
                        }
                        setImgCountPress(1);
                      } else {
                        setTimeout(() => {
                          setImgCountPress(1);
                        }, 3000);
                      }
                    }}
                  >
                    <ImageBackground
                      style={styles.image}
                      borderRadius={30}
                      source={{ uri: getImage(drawing.imageUrl) }}
                    >
                      {loadingVote && (
                        <ActivityIndicator
                          size={'small'}
                          color={COLORS.SELECTYELLOW}
                          style={{ alignSelf: 'flex-end', marginTop: 'auto' }}
                        />
                      )}
                    </ImageBackground>
                  </TouchableOpacity>
                  <View style={styles.drawingInfo}>
                    <View style={styles.authorContainer}>
                      <FontAwesome
                        name="user-circle-o"
                        size={24}
                        color="grey"
                      />
                      <Text style={styles.author}>{drawing.customerName}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        setIconCountPress(iconCountPress + 1);
                        if (iconCountPress === 1) {
                          if (myDrawings.length < 1) {
                            showMessage({
                              message:
                                'Bạn phải tham gia cuộc thi để có thể bầu chọn',
                              type: 'info',
                              duration: 2400,
                            });
                          } else {
                            handleVoteDrawing(drawing.id);
                          }
                          setIconCountPress(0);
                        } else {
                          setTimeout(() => {
                            setIconCountPress(0);
                          }, 3000);
                        }
                      }}
                      disabled={drawing.isVoted || drawing.isOwned}
                      style={[styles.voteContainer]}
                    >
                      <Ionicons
                        name="heart-circle"
                        size={24}
                        color={
                          drawing.isVoted
                            ? COLORS.MAINPINK
                            : drawing.isOwned
                            ? COLORS.SELECTYELLOW
                            : 'grey'
                        }
                      />
                      <Text style={styles.vote}>{drawing.totalVotes}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.titleInfo}>
                    <Text style={styles.title}>{drawing.title}</Text>
                    <Text style={styles.description}>
                      {drawing.description}
                    </Text>
                  </View>
                </View>
              );
            }}
            itemWidth={350}
            sliderWidth={500}
            layout="tinder"
            layoutCardOffset={18}
            onSnapToItem={(index) => {
              setPage(index);
            }}
          />
          <Pagination
            dotsLength={drawings.length}
            activeDotIndex={page}
            dotColor="#FF724C"
            inactiveDotColor="#FF724C"
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 4,
            }}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default ContestDrawings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  header: {
    paddingHorizontal: 32,
    marginBottom: 12,
  },
  iconHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  icons: {
    borderWidth: 1,
    borderColor: '#0000004a',
    borderRadius: 99,
    backgroundColor: '#ffffffdf',
    padding: 4,
    width: 40,
    height: 40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  myDraw: {
    backgroundColor: COLORS.MAINPINK,
  },
  myDrawText: {
    color: '#fff',
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: COLORS.MAINPINK,
  },
  headerText: {
    fontSize: 16,
    textAlign: 'center',
  },
  drawingContainer: {
    width: '100%',
    alignItems: 'center',
  },
  drawing: {
    alignSelf: 'center',
    padding: 12,
    paddingBottom: 0,
    borderWidth: 1,
    borderColor: '#0000002f',
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  image: {
    borderRadius: 30,
    height: 340,
    width: 340,
  },
  drawingInfo: {
    paddingHorizontal: 12,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#00000041',
  },
  authorContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  status: {
    fontSize: 14,
    textTransform: 'capitalize',
    marginBottom: 8,
  },
  author: {
    fontSize: 16,
    marginBottom: 16,
  },
  voteContainer: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  vote: {
    fontSize: 14,
  },
  titleInfo: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  title: {
    maxWidth: 320,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    maxWidth: 320,
    fontStyle: 'italic',
  },
});
