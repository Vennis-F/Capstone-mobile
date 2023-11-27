import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';
import { UserRole, getUserRole } from '../../libs/core/handle-token';
import { useEffect, useState } from 'react';
import {
  background,
  color,
} from 'native-base/lib/typescript/theme/styled-system';

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
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: '#fff',
        headerStyle: { backgroundColor: '#ef4444' },
        headerTitleStyle: { color: '#fff', fontWeight: 'bold', fontSize: 20 },
        tabBarStyle: { backgroundColor: '#ef4444', paddingBottom: 4 },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
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
        }}
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
          userRole
            ? {
              title: 'Tài khoản của con',
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="child" color={color} />
              ),
            }
            : { title: 'Tài khoản của con', href: null }
        }
      />
      <Tabs.Screen
        name="five"
        options={
          userRole
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
        options={{
          title: 'Tình trạng đơn hàng',
          // tabBarIcon: ({ color }) => (
          //   <TabBarIcon name="certificate" color={color} />
          // ),
          href: null,
        }}
      />
      {/* <Tabs.Screen
        name="info"
        options={{
          title: 'Information',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      /> */}
      <Tabs.Screen
        name="eleven"
        options={
          userRole
            ? {
              title: 'Bài giảng',
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="youtube" color={color} />
              ),
            }
            : { title: 'Bài giảng', href: null }
        }
      />
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
      {/* <Tabs.Screen
        name="orderHistory"
        options={{
          title: 'Lịch sử đơn hàng',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="certificate" color={color} />
          ),
        }}
      /> */}
      {/* <Tabs.Screen
        name="changePassword"
        options={{
          title: 'Đổi mật khẩu',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      /> */}
      {/* <Tabs.Screen
        name="children"
        options={{
          title: 'Con của tôi',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      /> */}
      <Tabs.Screen
        name="courses"
        options={
          userRole
            ? {
              title: 'Khóa học của tôi',
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="user" color={color} />
              ),
            }
            : { title: 'Khóa học của tôi', href: null }
        }
      />
      <Tabs.Screen
        name="orderDetail"
        options={{
          title: 'Đơn hàng chi tiết',
          // tabBarIcon: ({ color }) => (
          //   <TabBarIcon name="certificate" color={color} />
          // ),
          href: null,
        }}
      />
    </Tabs>
  );
}
