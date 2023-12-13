import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link } from 'expo-router';
import { Pressable, StatusBar, useColorScheme } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../../constants/Colors';
import {
  UserRole,
  getAccessToken,
  getUserRole,
} from '../../libs/core/handle-token';
import { useEffect, useState } from 'react';
import {
  background,
  color,
} from 'native-base/lib/typescript/theme/styled-system';
import {
  AntDesign,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from '@expo/vector-icons';
import { COLORS } from '../../libs/const/color';
import { NavigationContainer } from '@react-navigation/native';
import WelcomePage from '../../pages/WelcomePage';
import HomePage from '../../pages/HomePage';
import CourseList from '../../pages/CourseList';
import FilterTable from '../../pages/FilterTable';
import Detail from '../../pages/Detail';
import MyCourses from '../../pages/MyCourses';
import MyChild from '../../components/Mychild';
import YoutubePlayer from '../../components/YoutubePlayer';
import Profile from '../../pages/Profile';
import CartScreen from '../../components/CartScreen';
import OrderNotification from '../../pages/OrderNotification';
import Login from '../../pages/Login';
import Signup from '../../pages/Signup';
import DetailOrder from '../../pages/OrderDetail';
import Children from '../../components/Children';
import OrderHistory from '../../pages/OrderHistory';
import ConfirmOTP from '../../pages/UserConfirmOTP';
import FlashMessage from 'react-native-flash-message';
import ContestHomePage from '../../pages/ContestHomePage';
import ContestDetail from '../../pages/ContestDetail';
import ContestDrawings from '../../pages/ContestDrawings';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} {...props} />;
}

export default function TabLayout() {
  const Tab = createBottomTabNavigator();
  const colorScheme = useColorScheme();
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  const handleGetUserRole = async () => {
    setUserRole(await getUserRole());
  };

  useEffect(() => {
    handleGetUserRole();
  });

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tint,
        tabBarInactiveTintColor: '#ffffff',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.MAINPINK,
          // height: '8%',
          marginTop: -12,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      {!userRole && (
        <Tab.Screen
          name="welcome"
          options={{
            title: 'Trang bìa',
            tabBarStyle: { display: 'none' },
            tabBarButton: () => null,
          }}
          component={WelcomePage}
        />
      )}

      <Tab.Screen
        name="home"
        options={{
          title: 'Trang chính',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={28} color={color} />
          ),
        }}
        component={HomePage}
      />

      <Tab.Screen
        name="contest"
        options={
          userRole === 'Customer'
            ? {
                title: 'Cuộc Thi',
                tabBarIcon: ({ color }) => (
                  <FontAwesome5 name="award" size={28} color={color} />
                ),
              }
            : {
                title: 'Cuộc Thi',
                tabBarButton: () => null,
              }
        }
        component={ContestHomePage}
      />

      <Tab.Screen
        name="profile"
        options={
          userRole
            ? {
                title: 'Hồ sơ của tôi',
                tabBarIcon: ({ color }) => (
                  <TabBarIcon name="user" color={color} />
                ),
              }
            : { title: 'Hồ sơ của tôi', tabBarButton: () => null }
        }
        component={Profile}
      />

      <Tab.Screen
        name="myCourses"
        options={
          userRole
            ? {
                title: 'Khóa học của tôi',
                tabBarIcon: ({ color }) => (
                  <FontAwesome5
                    name="chalkboard-teacher"
                    size={26}
                    color={color}
                    style={{ marginBottom: -3 }}
                  />
                ),
              }
            : { title: 'Khóa học của tôi', tabBarButton: () => null }
        }
        component={MyCourses}
      />

      <Tab.Screen
        name="cart"
        options={
          userRole === 'Customer'
            ? {
                title: 'Giỏ hàng',
                tabBarIcon: ({ color }) => (
                  <TabBarIcon name="shopping-cart" color={color} />
                ),
              }
            : { title: 'Giỏ hàng', tabBarButton: () => null }
        }
        component={CartScreen}
      />

      <Tab.Screen
        name="login"
        options={
          !userRole
            ? {
                title: 'Đăng nhập',
                tabBarIcon: ({ color }) => (
                  <FontAwesome5
                    name="sign-in-alt"
                    size={26}
                    color={color}
                    style={{ marginBottom: -3 }}
                  />
                ),
              }
            : { title: 'Đăng nhập', tabBarButton: () => null }
        }
        component={Login}
      />
      {/* Do not have tab button*/}
      <Tab.Screen
        name="orderHistory"
        options={{
          title: 'Lịch sử đơn hàng',
          tabBarButton: () => null,
        }}
        component={OrderHistory}
      />

      <Tab.Screen
        name="courseList"
        options={{
          title: 'Danh sách khóa học',
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' },
        }}
        component={CourseList}
      />

      <Tab.Screen
        name="filterTable"
        options={{
          title: 'Bộ lọc',
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' },
        }}
        component={FilterTable}
      />

      <Tab.Screen
        name="courseDetail"
        options={{
          title: 'Chi tiết khóa học',
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' },
        }}
        component={Detail}
      />

      {/* <Tab.Screen
        name="six"
        options={{
          title: 'Diễn đàn thi vẽ',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="certificate" color={color} />
          ),
          tabBarButton: () => null,
        }}
      /> */}

      <Tab.Screen
        name="myChildCourses"
        options={{ title: 'Khóa học của con', tabBarButton: () => null }}
        component={MyChild}
      />

      <Tab.Screen
        name="youtubePlayer"
        options={
          // userRole
          //   ? {
          //       title: 'Bài giảng',
          //       tabBarIcon: ({ color }) => (
          //         <TabBarIcon name="youtube" color={color} />
          //       ),
          //     }
          //   :
          { title: 'Bài giảng', tabBarButton: () => null }
        }
        component={YoutubePlayer}
      />

      <Tab.Screen
        name="orderNotification"
        options={{ title: 'Tình trạng đơn hàng', tabBarButton: () => null }}
        component={OrderNotification}
      />

      <Tab.Screen
        name="signUp"
        options={{
          title: 'Đăng ký',
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' },
        }}
        component={Signup}
      />

      <Tab.Screen
        name="orderDetail"
        options={{ title: 'Chi tiết đơn hàng', tabBarButton: () => null }}
        component={DetailOrder}
      />

      <Tab.Screen
        name="children"
        options={{ title: 'Tài khoản của con', tabBarButton: () => null }}
        component={Children}
      />

      <Tab.Screen
        name="confirmOTP"
        options={{ title: 'Xác thực OTP', tabBarButton: () => null }}
        component={ConfirmOTP}
      />

      <Tab.Screen
        name="contestDetail"
        options={{
          title: 'Cuộc Thi',
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' },
        }}
        component={ContestDetail}
      />

      <Tab.Screen
        name="contestDrawings"
        options={{
          title: 'Bài Dự Thi',
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' },
        }}
        component={ContestDrawings}
      />
    </Tab.Navigator>
  );
}
