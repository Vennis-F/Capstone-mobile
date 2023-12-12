import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme, View } from 'react-native';
import Login from '../pages/Login';
import EditScreenInfo from '../components/EditScreenInfo';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import FlashMessage from 'react-native-flash-message';
import { COLORS } from '../libs/const/color';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  // const isAuthenticated = false;
  // const initialRouteName = isAuthenticated ? '(tabs)' : 'login';

  // return <RootLayoutNav initialRouteName={initialRouteName} />;
  return (
    <View style={{ flex: 1 }}>
      <View>
        <FlashMessage
          style={{ marginTop: 20, paddingHorizontal: 20 }}
          floating={true}
        />
      </View>
      <RootLayoutNav />
    </View>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const MyTheme: Theme = {
    dark: false,
    colors: {
      primary: 'rgb(0, 122, 255)',
      background: 'rgb(255, 255, 255)',
      card: 'rgb(255, 255, 255)',
      text: 'rgb(28, 28, 30)',
      border: 'rgb(216, 216, 216)',
      notification: 'rgb(255, 59, 48)',
    },
  };
  return (
    <ThemeProvider value={MyTheme}>
      <NativeBaseProvider>
        <Stack screenOptions={{}}>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
              navigationBarColor: '#ffffff10',
              navigationBarHidden: true,
              statusBarColor: COLORS.MAINPINK,
            }}
          />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </NativeBaseProvider>
    </ThemeProvider>
  );
}
