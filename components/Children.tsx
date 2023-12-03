import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';

import { Video, ResizeMode } from 'expo-av';
import { Checkbox, HStack, Input, Button } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../libs/const/color';
import DividerCustom from './DividerCustom';
import { getLearnersByUser, updateLearner } from '../apis/learner/api';
import { useCallback, useEffect, useState } from 'react';
import {
  LearnerFilterResponse,
  UpdateLearnerBodyRequest,
} from '../apis/learner/types';
import { useFocusEffect, useNavigation } from 'expo-router';
import Notification from './Notification';

const Item = ({ item, setIsChanged, isChanged }) => {
  const fullname = `${item.lastName} ${item.middleName} ${item.firstName}`;
  return <></>;
};
export default function Children({ path }: { path: string }) {
  const [notification, setNotification] = useState(null);
  const [children, setChildren] = useState<LearnerFilterResponse[]>([]);
  const [pressedChild, setPressedChild] = useState('');
  const [id, setId] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [firstname, setFirstname] = useState<string>('');
  const [middlename, setMiddlename] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');

  const getMyChildren = async () => {
    const myChildren = await getLearnersByUser();
    setChildren(myChildren);
  };

  const closeNotification = () => {
    setNotification(null);
  };

  const handleUpdate = async () => {
    const body: UpdateLearnerBodyRequest = {
      learnerId: id,
      firstName: firstname,
      lastName: lastname,
      middleName: middlename,
    };
    try {
      await updateLearner(body);
      setNotification({
        message: 'Thông tin của bé đã thay đổi',
        type: 'success',
      });
      getMyChildren();
    } catch (error) {
      console.log(error);
      setNotification({
        message: 'Thông tin chưa thể thay đổi',
        type: 'danger',
      });
    }
    setPressedChild('');
  };

  useFocusEffect(
    useCallback(() => {
      getMyChildren();
      setPressedChild('');
    }, [])
  );

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 10,
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
        width: '100%',
      }}
    >
      <View style={styles.container}>
        <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 20 }}>
          Con của tôi
        </Text>
        {children.map((child, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setPressedChild(child.id);
                setId(child.id);
                setFirstname(child.firstName);
                setMiddlename(child.middleName);
                setLastname(child.lastName);
                setUsername(child.userName);
              }}
            >
              <View
                style={{ flexDirection: 'row', justifyContent: 'flex-start' }}
              >
                <View>
                  <Image
                    style={styles.tinyLogo}
                    source={{
                      uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                  />
                </View>
                <View>
                  <Text style={{ fontSize: 20, marginLeft: 10, marginTop: 5 }}>
                    {`${child.lastName} ${child.middleName} ${child.firstName}`}
                  </Text>
                </View>
                <View style={{ marginLeft: 'auto' }}>
                  <Icon
                    name="arrow-forward-ios"
                    size={20}
                    style={{ marginTop: 10 }}
                  />
                </View>
              </View>
              <DividerCustom />
            </TouchableOpacity>
          );
        })}
        <View
          style={[styles.userInfo, pressedChild ? styles.show : styles.hidden]}
        >
          <View style={styles.infoContainer}>
            <Text style={styles.label}>
              <Text style={{ backgroundColor: '#ffffff97' }}>
                Tên đăng nhập
              </Text>
            </Text>
            <Input
              value={username}
              onChangeText={(text) => setUsername(text)}
              variant="filled"
              placeholder="Nhập Tên đăng nhập ở đây"
              borderRadius={10}
              paddingLeft={4}
            />
            {/* {errorText1 && (
                  <Text style={{ color: 'red' }}>{errorText1}</Text>
                )} */}
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              width: '80%',
              justifyContent: 'space-between',
              padding: 4,
            }}
          >
            <View style={styles.nameContainer}>
              <Text style={styles.label}>
                <Text style={{ backgroundColor: '#ffffff97' }}>Tên</Text>
              </Text>
              <Input
                value={firstname}
                onChangeText={(text) => setFirstname(text)}
                variant="filled"
                placeholder="Tên"
                borderRadius={10}
                paddingLeft={4}
              />
              {/* {errorText1 && (
                  <Text style={{ color: 'red' }}>{errorText1}</Text>
                )} */}
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.label}>
                <Text style={{ backgroundColor: '#ffffff97' }}>Tên đệm</Text>
              </Text>
              <Input
                value={middlename}
                onChangeText={(text) => setMiddlename(text)}
                variant="filled"
                placeholder="Tên đệm"
                paddingLeft={4}
                borderRadius={10}
              />
              {/* {errorText1 && (
                  <Text style={{ color: 'red' }}>{errorText1}</Text>
                )} */}
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.label}>
                <Text style={{ backgroundColor: '#ffffff97' }}>Họ</Text>
              </Text>
              <Input
                value={lastname}
                onChangeText={(text) => setLastname(text)}
                variant="filled"
                placeholder="Họ"
                paddingLeft={4}
                borderRadius={10}
              />
              {/* {errorText1 && (
                  <Text style={{ color: 'red' }}>{errorText1}</Text>
                )} */}
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: '80%',
              alignSelf: 'center',
              marginVertical: 8,
            }}
          >
            <Button
              //   onPress={handleSubmit}
              style={styles.buttonReset}
              borderRadius={10}
              paddingBottom={3}
            >
              <Text style={{ color: '#ef4444', fontWeight: 'bold' }}>
                Đặt lại
              </Text>
            </Button>
            <Button
              style={styles.buttonUpdate}
              borderRadius={8}
              paddingBottom={3}
              onPress={handleUpdate}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                Cập nhật
              </Text>
            </Button>
          </View>
        </View>
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={closeNotification}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    padding: 16,
    backgroundColor: COLORS.WHITE, // Màu nền
    borderRadius: 8,
    // Các thuộc tính box shadow cho Android
    elevation: 5,
    // Các thuộc tính box shadow cho iOS
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    paddingBottom: 30,
  },
  tinyLogo: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  infoContainer: {
    width: '80%',
    alignSelf: 'center',
    padding: 4,
  },
  nameContainer: {
    width: '30%',
    alignSelf: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: -8,
    zIndex: 1,
  },
  userInfo: {
    paddingVertical: 16,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderColor: '#00000023',
  },
  show: {
    display: 'flex',
  },
  hidden: {
    display: 'none',
  },
  buttonReset: {
    width: '40%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  buttonUpdate: {
    width: '40%',
    backgroundColor: '#ef4444',
    borderWidth: 1,
    borderColor: '#fff',
  },
});
