import { View, Text, StyleSheet } from 'react-native';
import { ViewAchievementReponse } from '../../apis/achivement/types';
import { getCertificate } from '../../apis/achivement/api';
import { useEffect, useState } from 'react';
import * as Print from 'expo-print';
import { Button } from 'native-base';
import { formatStringtoDate } from '../../libs/core/handle-time';
import { COLORS } from '../../libs/const/color';
import { FontAwesome5 } from '@expo/vector-icons';

const Achieve = ({ achieve }: { achieve: ViewAchievementReponse }) => {
  const [uri, setUri] = useState();

  const handleGetACetificate = async () => {
    try {
      if (achieve) {
        const response = await getCertificate(achieve.path);
        const blob = new Blob([response], { type: 'application/pdf' });
        const filereaderinstance = new FileReader();
        filereaderinstance.readAsDataURL(blob);
        filereaderinstance.onload = () => {
          const base64 = filereaderinstance.result;
          // console.log(base64);
          setUri(base64);
        };
      }
    } catch (error) {
      console.log('[AchieveCourse - Get A Certificate error] ', error);
    }
  };

  const printToFile = async () => {
    try {
      await Print.printAsync({ uri: uri });
    } catch (error) {
      console.log('[AchieveCourse - print error] ', error);
    }
  };

  useEffect(() => {
    handleGetACetificate();
  });

  return (
    <View style={styles.container}>
      <FontAwesome5
        name="medal"
        size={32}
        color={COLORS.SELECTYELLOW}
        style={styles.icon}
      />
      <Text style={styles.title}>
        Khóa học: <Text style={styles.name}>{achieve.courseName}</Text>
      </Text>
      <Text style={styles.date}>
        Ngày hoàn thành: {formatStringtoDate(achieve.insertedDate)}
      </Text>
      <Button
        style={styles.btn}
        onPress={() => {
          if (uri) printToFile();
        }}
      >
        <Text style={styles.btnText}>Chứng chỉ</Text>
      </Button>
    </View>
  );
};

export default Achieve;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginBottom: 24,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: COLORS.MAINPINK,
    padding: 16,
  },
  icon: {
    position: 'absolute',
    top: -1,
    right: 12,
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
    maxWidth: '85%',
  },
  name: {
    fontWeight: '600',
    color: COLORS.BLUESTEEL,
  },
  date: {
    color: 'grey',
    fontStyle: 'italic',
  },
  btn: {
    marginLeft: 'auto',
    marginTop: 12,
    alignSelf: 'center',
    backgroundColor: COLORS.BLUESTEEL,
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
});
