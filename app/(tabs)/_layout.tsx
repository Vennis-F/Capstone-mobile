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
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <Pressable>
          //       {({ pressed }) => (
          //         <FontAwesome
          //           name="info-circle"
          //           size={25}
          //           color={Colors[colorScheme ?? 'light'].text}
          //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          //         />
          //       )}
          //     </Pressable>
          //   </Link>
          // ),
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
           tabBarIcon: ({ color }) => <TabBarIcon name="certificate" color={color} />,
         }}
       />
       <Tabs.Screen
         name="five"
         options={{
           title: 'Cart',
           tabBarIcon: ({ color }) => <TabBarIcon name="shopping-cart" color={color} />,
         }}
       />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
