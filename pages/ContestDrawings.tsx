import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect, useNavigation } from 'expo-router';
import {
  CustomerDrawing,
  CustomerDrawingNotFilter,
  CustomerDrawingSortField,
  mapCustomerStatus,
} from '../apis/customer-drawing/types';
import {
  getCustomerDrawingsByContest,
  getCustomerDrawingsInContestByCustomer,
} from '../apis/customer-drawing/api';
import { OrderType } from '../libs/types';
import { getImage } from '../apis/image/components/apis';
import { useRoute } from '@react-navigation/native';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Button } from 'native-base';
import { COLORS } from '../libs/const/color';

const ContestDrawings = () => {
  const route = useRoute();
  const id = route.params?.id as string;

  const [pressed, setPressed] = useState(-1);
  const [myDrawBtn, setMyDrawBtn] = useState(false);

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

  useFocusEffect(
    React.useCallback(() => {
      getDrawings();
      getMyDrawings();
    }, [id])
  );

  console.log('my draw: ', myDrawings);

  return (
    <ScrollView style={styles.container}>
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
            <Button style={styles.myDraw}>
              <Text style={styles.myDrawText}>Tham gia thi</Text>
            </Button>
          )}
        </View>
        <Text style={styles.headerTitle}>Bài Dự Thi</Text>
        <Text style={styles.headerText}>
          Hãy cùng chúng mình khám phá những tác phẩm độc đáo và thú vị của
          những người bạn trong cuộc thi này nào
        </Text>
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
                <Ionicons name="heart-circle" size={24} color="grey" />
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
          {drawings.map((drawing, index) => {
            return (
              <View key={index} style={styles.drawing}>
                <TouchableOpacity
                  onPress={() => {
                    if (pressed !== index) setPressed(index);
                    else setPressed(-1);
                  }}
                >
                  <Image
                    style={styles.image}
                    source={{ uri: getImage(drawing.imageUrl) }}
                  />
                </TouchableOpacity>
                <View style={styles.drawingInfo}>
                  <View style={styles.authorContainer}>
                    <FontAwesome name="user-circle-o" size={24} color="grey" />
                    <Text style={styles.author}>{drawing.customerName}</Text>
                  </View>
                  <View style={styles.voteContainer}>
                    <Ionicons name="heart-circle" size={24} color="grey" />
                    <Text style={styles.vote}>{drawing.totalVotes}</Text>
                  </View>
                </View>
                {pressed === index && (
                  <View style={styles.titleInfo}>
                    <Text style={styles.title}>{drawing.title}</Text>
                    <Text style={styles.description}>
                      {drawing.description}
                    </Text>
                  </View>
                )}
              </View>
            );
          })}
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
  },
  headerText: {
    fontSize: 16,
    textAlign: 'center',
  },
  drawingContainer: {
    width: '100%',
  },
  drawing: {
    alignSelf: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#0000002f',
    borderRadius: 30,
    marginBottom: 20,
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
    marginBottom: 12,
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
