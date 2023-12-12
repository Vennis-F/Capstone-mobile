import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { Contest } from '../../apis/contest/types';
import {
  CustomerDrawing,
  CustomerDrawingSortField,
} from '../../apis/customer-drawing/types';
import { getCustomerDrawingsByContest } from '../../apis/customer-drawing/api';
import { OrderType } from '../../libs/types';
import { getImage } from '../../apis/image/components/apis';
import { useRoute } from '@react-navigation/native';

const Drawings = () => {
  const route = useRoute();
  // const id = route.params?.id as string;
  const id = '81ccd1be-f374-47fd-a55c-6cc08fd7cd79';
  const [drawings, setDrawings] = useState<CustomerDrawing[]>([]);

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
    }, [id])
  );

  return (
    <View style={styles.container}>
      {drawings.length >= 1 && (
        <View>
          <Text>Bài Dự Thi</Text>
          {drawings.map((drawing, index) => (
            <View key={index} style={styles.drawing}>
              <Image
                style={styles.image}
                source={{ uri: getImage(drawing.imageUrl) }}
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default Drawings;

const styles = StyleSheet.create({
  container: {},
  drawing: {
    marginVertical: 12,
  },
  image: {
    height: 120,
    width: 120,
  },
});
