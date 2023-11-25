import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';

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

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      {/* <Tabs.Screen
        name="ten"
        options={{
          title: 'List Courses',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      /> */}
      <Tabs.Screen
        name="eight"
        options={{
          title: 'Detail',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          title: 'My Courses',
          tabBarIcon: ({ color }) => <TabBarIcon name="tv" color={color} />,
        }}
      />
      <Tabs.Screen
        name="four"
        options={{
          title: 'My Child',
          tabBarIcon: ({ color }) => <TabBarIcon name="child" color={color} />,
        }}
      />
      <Tabs.Screen
        name="six"
        options={{
          title: 'Contest',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="certificate" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="five"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="shopping-cart" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
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
        options={{
          title: 'Youtube',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="youtube" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="seven"
        options={{
          title: 'Login',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
      <Tabs.Screen
        name="orderNotification"
        options={{
          title: 'Order Notification',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="certificate" color={color} />
          ),
        }}
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
        options={{
          title: 'Khóa học của tôi',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
      <Tabs.Screen
        name="orderDetail"
        options={{
          title: 'Đơn hàng chi tiết',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="certificate" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
