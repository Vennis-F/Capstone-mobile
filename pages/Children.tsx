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
import {
  createLearner,
  getLearnersByUser,
  updateLearner,
} from '../apis/learner/api';
import { useCallback, useEffect, useState } from 'react';
import {
  CreateLearnerBodyRequest,
  LearnerFilterResponse,
  UpdateLearnerBodyRequest,
} from '../apis/learner/types';
import { useFocusEffect, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import ChildrenModal from '../components/Children/ChildrenModal';
import DividerCustom from '../components/DividerCustom';
import Notification from '../components/Notification';

const Item = ({ item, setIsChanged, isChanged }) => {
  const fullname = `${item.lastName} ${item.middleName} ${item.firstName}`;
  return <></>;
};
export default function Children() {
  const [notification, setNotification] = useState(null);
  const [children, setChildren] = useState<LearnerFilterResponse[]>([]);
  const [pressedChild, setPressedChild] = useState('');
  const [id, setId] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [firstname, setFirstname] = useState<string>('');
  const [middlename, setMiddlename] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showCreateModal, setShowCreateModal] = useState(false);

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
        <ChildrenModal
          firstname={firstname}
          lastname={lastname}
          middlename={middlename}
          password={password}
          setPassword={setPassword}
          setPressedChild={setPressedChild}
          getMyChildren={getMyChildren}
          username={username}
          pressChild={pressedChild}
        />

        <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 20 }}>
          Con của tôi
        </Text>
        {children.map((child, index) => {
          return (
            <TouchableOpacity
              key={index}
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
                    source={require('../assets/images/avatar.png')}
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
        {children.length < 3 ? (
          <TouchableOpacity
            onPress={() => {
              setPressedChild('empty');
              setId('');
              setFirstname('');
              setMiddlename('');
              setLastname('');
              setUsername('');
            }}
          >
            <View
              style={{ flexDirection: 'row', justifyContent: 'flex-start' }}
            >
              <View>
                <Ionicons
                  name="person-circle"
                  size={40}
                  color={COLORS.MAINPINK}
                />
              </View>
              <View>
                <Text style={{ fontSize: 20, marginLeft: 10, marginTop: 5 }}>
                  Thêm tài khoản cho bé
                </Text>
              </View>
              <View style={{ marginLeft: 'auto' }}>
                <Icon name="add" size={32} style={{ marginTop: 10 }} />
              </View>
            </View>
            <DividerCustom />
          </TouchableOpacity>
        ) : (
          ''
        )}
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
