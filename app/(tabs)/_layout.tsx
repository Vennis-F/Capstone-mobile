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
        name="home"
        options={{
          title: 'Trang chính',
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          href: null,
        }}
      />
      {/* chi tiet khoa hoc */}
      <Tabs.Screen
        name="eight"
        options={{
          title: 'Chi tiết khóa học',
          href: null,
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
        name="three"
        options={
          userRole
            ? {
                title: 'Khóa học của tôi',
                tabBarIcon: ({ color }) => (
                  <TabBarIcon name="tv" color={color} />
                ),
              }
            : { title: 'Khóa học của tôi', href: null }
        }
      />
      <Tabs.Screen
        name="four"
        options={
          userRole === 'Customer'
            ? {
                title: 'Khóa học của con',
                tabBarIcon: ({ color }) => (
                  <MaterialIcons
                    name="assignment-ind"
                    size={32}
                    color={color}
                    style={{ marginBottom: -3 }}
                  />
                ),
              }
            : { title: 'Khóa học của con', href: null }
        }
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
                  <TabBarIcon name="user" color={color} />
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
        options={
          userRole === 'Customer'
            ? {
                title: 'Tài khoản của con',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="account-child"
                    size={34}
                    style={{ marginBottom: -3 }}
                    color={color}
                  />
                ),
              }
            : { title: 'Tài khoản của con', href: null }
        }
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
