import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, StatusBar, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';
import { UserRole, getUserRole } from '../../libs/core/handle-token';
import { useEffect, useState } from 'react';
import {
  background,
  color,
} from 'native-base/lib/typescript/theme/styled-system';
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from '@expo/vector-icons';
import { COLORS } from '../../libs/const/color';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  const handleGetUserRole = async () => {
    setUserRole(await getUserRole());
  };

  useEffect(() => {
    handleGetUserRole();
  });

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tint,
        tabBarInactiveTintColor: '#ffffff',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.MAINPINK,
          height: '8%',
          borderRadius: 20,
          marginTop: -10,
        },
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Trang chính',
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="courseList"
        options={{
          title: 'Danh sách khóa học',
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="filterTable"
        options={{
          title: 'Bộ lọc',
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
      {/* chi tiet khoa hoc */}
      <Tabs.Screen
        name="courseDetail"
        options={{
          title: 'Chi tiết khóa học',
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="six"
        options={{
          title: 'Diễn đàn thi vẽ',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="certificate" color={color} />
          ),
          href: null,
        }}
      />

      <Tabs.Screen
        name="three"
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
            : { title: 'Khóa học của tôi', href: null }
        }
      />
      <Tabs.Screen
        name="four"
        options={{ title: 'Khóa học của con', href: null }}
      />
      <Tabs.Screen
        name="eleven"
        options={
          // userRole
          //   ? {
          //       title: 'Bài giảng',
          //       tabBarIcon: ({ color }) => (
          //         <TabBarIcon name="youtube" color={color} />
          //       ),
          //     }
          //   :
          { title: 'Bài giảng', href: null }
        }
      />
      <Tabs.Screen
        name="two"
        options={
          userRole
            ? {
                title: 'Hồ sơ của tôi',
                tabBarIcon: ({ color }) => (
                  <TabBarIcon name="user" color={color} />
                ),
              }
            : { title: 'Hồ sơ của tôi', href: null }
        }
      />

      <Tabs.Screen
        name="five"
        options={
          userRole === 'Customer'
            ? {
                title: 'Giỏ hàng',
                tabBarIcon: ({ color }) => (
                  <TabBarIcon name="shopping-cart" color={color} />
                ),
              }
            : { title: 'Giỏ hàng', href: null }
        }
      />
      <Tabs.Screen
        name="orderNotification"
        options={{ title: 'Tình trạng đơn hàng', href: null }}
      />
      {/* <Tabs.Screen
        name="info"
        options={{
          title: 'Information',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      /> */}

      <Tabs.Screen
        name="seven"
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
            : { title: 'Đăng nhập', href: null }
        }
      />
      <Tabs.Screen name="signUp" options={{ title: 'Đăng ký', href: null }} />

      <Tabs.Screen
        name="orderDetail"
        options={{ title: 'Chi tiết đơn hàng', href: null }}
      />
      {/* <Tabs.Screen
        name="changePassword"
        options={{
          title: 'Đổi mật khẩu',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      /> */}
      <Tabs.Screen
        name="children"
        options={{ title: 'Tài khoản của con', href: null }}
      />
      <Tabs.Screen
        name="orderHistory"
        options={
          userRole === 'Customer'
            ? {
                title: 'Lịch sử đơn hàng',
                tabBarIcon: ({ color }) => (
                  <TabBarIcon name="certificate" color={color} />
                ),
              }
            : { title: 'Lịch sử đơn hàng', href: null }
        }
      />
      <Tabs.Screen
        name="courses"
        options={
          // userRole
          //   ? {
          //       title: 'Khóa học của tôi',
          //       tabBarIcon: ({ color }) => (
          //         <TabBarIcon name="user" color={color} />
          //       ),
          //     }
          //   :
          { title: 'Khóa học của tôi', href: null }
        }
      />
      <Tabs.Screen
        name="confirmOTP"
        options={{ title: 'Xác thực OTP', href: null }}
      />
    </Tabs>
  );
}
