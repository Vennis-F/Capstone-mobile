import React, { useEffect, useState } from 'react';
import { Linking, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Alert } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { getAccessToken } from '../libs/core/handle-token';
import { addCartItem, checkCartIsValid, deleteCartItem, getCart, getCartTotalPrice } from '../apis/cart/apis';
import { Cart, CartTotalPrice } from '../apis/cart/types';
import { createOrder, createPaymentURL } from '../apis/order/api';
import { COLORS } from '../libs/const/color';
import { formatCurrency } from '../libs/core/handle-price';


export default function CartScreen({ path }: { path: string }) {
  const navigation = useNavigation();
  const [cart, setCart] = useState<Cart>()
  const [cartTotalPrice, setCartTotalPrice] = useState<CartTotalPrice | null>(null)
  // const route = useRoute();
  console.log("[Detail cart]", cart)

  const handleGetCart = async () => {
    const dataResponse = await getCart()
    const priceRes = await getCartTotalPrice()
    setCartTotalPrice(priceRes)
    setCart(dataResponse)
  }

  // useEffect(() => {
  //   handleGetCart()
  // }, [])
  useFocusEffect(
    React.useCallback(() => {
      handleGetCart()
    }, [])
  );
  const openPaymentPage = async (paymentURL: string) => {
    try {
      await WebBrowser.openBrowserAsync(paymentURL);
    } catch (error) {
      console.error('An error occurred while opening the web page', error);
    }
  };

  const handleCompleteCheckout = async () => {
    try {
      const order = await createOrder()
      console.log("[order]", order)
      const paymentURL = await createPaymentURL({
        amount: order.totalPriceAfterPromotion,
        language: 'vn',
        message: `Thanh toán cho order ${order.id}`,
        orderId: order.id,
        // returnUrl: `${
        //   process.env.NODE_ENV === 'development'
        //     ? 'http://localhost:3001'
        //     : process.env.REACT_APP_API_BASE_CLOUD_URL
        // returnUrl: 'myapp://payment-return',
        returnUrl: "exp://192.168.1.4:8081"

      })
      console.log('INHERE', paymentURL)
      openPaymentPage(paymentURL)
      // window.location.href = paymentURL

      Linking.addEventListener('url', async ({ url }) => {
        console.log('Returned URL:', url);

        // Kiểm tra xem URL có chứa định dạng của ứng dụng Expo không
        if (url.includes('exp://192.168.1.4:8081')) {
          navigation.navigate("orderNotification")
        }

        Linking.removeAllListeners("url");
      });
    } catch (error) {
      console.log('[handleCompleteCheckout_in_CartCheckoutContainer]', error.message)
    }
  }

  const handleCheckout = async () => {
    try {
      const errorsResponse = await checkCartIsValid()
      if (errorsResponse.length === 0) {
        // navigate toi trang thanh toan
        handleCompleteCheckout()
      } else {
        getCart()
        console.log(errorsResponse)
      }
    } catch (error) {
      console.log('[error in CartContainer]', error)
    }
  }


  const PrimaryButton = ({ title, onPress = () => { } }) => {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={handleCheckout}>
        <View style={styles.btnContainer}>
          <Text style={styles.title}>Xác Nhận</Text>
        </View>
      </TouchableOpacity>
    )
  }
  const CartCard = ({ item }) => {
    const handleDeleteCartItem = async () => {
      Alert.alert(
        'Xác nhận xóa',
        'Bạn có chắc chắn muốn xóa khóa học này không?',
        [
          {
            text: 'Hủy',
            style: 'cancel',
          },
          {
            text: 'Xác nhận',
            onPress: async () => {
              await deleteCartItem(item.id);
              await handleGetCart();
            },
          },
        ],
        { cancelable: false }
      );
    };
    return (
      <View style={styles.CartCard}>
        <Image
          source={{ uri: "https://reactnative.dev/img/tiny_logo.png", }} style={{ height: 80, width: 80 }} />
        <View style={{ height: 100, marginLeft: 10, paddingVertical: 10, flex: 1 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.course.title}</Text>
          <Text style={{ fontSize: 16, color: '#908e8c' }}>{item.course.totalChapter} bài giảng</Text>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>{formatCurrency(item.course.price)}VND</Text>
        </View>
        <View style={{ marginRight: 10, alignItems: 'center' }}>
          <Icon name='delete' size={30} onPress={handleDeleteCartItem} />
        </View>
      </View>
    )
  }
  return (
    <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
      {cart && cart.cartItems.length > 0 ? (<FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        data={cart.cartItems}
        renderItem={({ item }) => <CartCard item={item} />}
        ListFooterComponentStyle={{ paddingHorizontal: 20 }}
        ListFooterComponent={() => (
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Tổng tiền</Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>{formatCurrency(cartTotalPrice.totalPrice)}VND</Text>
            </View>
            <View style={{ marginHorizontal: 30 }}>
              <PrimaryButton title="Xác Nhận" />
            </View>
          </View>
        )}
      />) : (
        <View>
          <View>
            <Icon name='remove-shopping-cart' size={200} color={"#6b7280"} style={{ marginBottom: 15 }} />
            <Text style={{ fontSize: 20, fontWeight: 'bold', paddingHorizontal: 20, color: "#6b7280", marginLeft: 10 }}>Giỏ hàng trống!</Text>
            <TouchableOpacity style={{ paddingHorizontal: 30, backgroundColor: COLORS.RED_450, borderRadius: 10, marginVertical: 20, paddingBottom: 10, paddingTop: 10 }} onPress={() => navigation.navigate('index')}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Quay lại trang chủ</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  CartCard: {
    height: 100,
    width: "89%",
    elevation: 15,
    borderRadius: 10,
    backgroundColor: "white",
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    marginRight: 250,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: "#F9813A",
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  btnContainer: {
    backgroundColor: "#F9813A",
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18,
  }
})