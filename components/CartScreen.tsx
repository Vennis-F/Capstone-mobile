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
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { getAccessToken } from '../libs/core/handle-token';

import {
  addCartItem,
  checkCartIsValid,
  deleteAllCartItems,
  deleteCartItem,
  getCart,
  getCartTotalPrice,
} from '../apis/cart/apis';

import { Cart, CartTotalPrice } from '../apis/cart/types';
import { createOrder, createPaymentURL } from '../apis/order/api';
import { COLORS } from '../libs/const/color';
import { calcPriceDiscount, formatCurrency } from '../libs/core/handle-price';

import * as Link from 'expo-linking';

import { getImage } from '../apis/image/components/apis';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export default function CartScreen() {
  const navigation = useNavigation();
  const [cart, setCart] = useState<Cart>();
  const [cartTotalPrice, setCartTotalPrice] = useState<CartTotalPrice | null>(
    null
  );

  const handleGetCart = async () => {
    const dataResponse = await getCart();
    const priceRes = await getCartTotalPrice();
    setCartTotalPrice(priceRes);
    setCart(dataResponse);
  };

  useFocusEffect(
    React.useCallback(() => {
      handleGetCart();
    }, [])
  );
  const openPaymentPage = async (paymentURL: string) => {
    try {
      await WebBrowser.openBrowserAsync(paymentURL);
    } catch (error) {
      console.error('An error occurred while opening the web page', error);
    }
  };

  const appUrl = Link.createURL();

  const handleCompleteCheckout = async () => {
    try {
      const order = await createOrder();
      const paymentURL = await createPaymentURL({
        amount: order.totalPriceAfterPromotion,
        language: 'vn',
        message: `Thanh toán cho order ${order.id}`,
        orderId: order.id,
        returnUrl: appUrl,
      });
      console.log('INHERE', paymentURL);
      openPaymentPage(paymentURL);

      Linking.addEventListener('url', async ({ url }) => {
        console.log('Returned URL:', url);
        // Kiểm tra xem URL có chứa định dạng của ứng dụng Expo không
        if (url.includes(appUrl)) {
          navigation.navigate('orderNotification', { url: url });
        }
        Linking.removeAllListeners('url');
      });
    } catch (error) {
      console.log(
        '[handleCompleteCheckout_in_CartCheckoutContainer]',
        error.message
      );
    }
  };

  const handleCheckout = async () => {
    try {
      const errorsResponse = await checkCartIsValid();
      if (errorsResponse.length === 0) {
        // navigate toi trang thanh toan
        handleCompleteCheckout();
      } else {
        getCart();
        console.log(errorsResponse);
      }
    } catch (error) {
      console.log('[error in CartContainer]', error);
    }
  };

  const PrimaryButton = ({ title, onPress = () => {} }) => {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={handleCheckout}>
        <View style={styles.btnContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const handleDeleteAllItems = async () => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc chắn muốn xóa tất cả sản phẩm khỏi giỏ hàng không?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xác nhận',
          onPress: async () => {
            // Call your API or function to delete all items from the cart
            // For example, you might have an API like deleteAllCartItems()
            await deleteAllCartItems();

            // After deleting, refresh the cart data
            await handleGetCart();
          },
        },
      ],
      { cancelable: false }
    );
  };
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
        {item && item.course && (
          <>
            <Image
              source={{
                uri: getImage(item.course.thumbnailUrl),
              }}
              style={{ height: 84, width: 84 }}
            />
            <View
              style={{
                height: 120,
                marginLeft: 10,
                paddingVertical: 10,
                flex: 1,
                justifyContent: 'center',
              }}
            >
              <Text
                style={{ fontWeight: 'bold', fontSize: 16, maxWidth: '90%' }}
              >
                {item.course.title}
              </Text>
              <Text style={{ fontSize: 16, color: '#908e8c' }}>
                {item.course.totalChapter} bài giảng
              </Text>
              {item.course.discount ? (
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                    color: COLORS.BLUESTEEL,
                  }}
                >
                  {formatCurrency(
                    calcPriceDiscount(item.course.price, item.course.discount)
                  )}
                  VND{'  '}
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'grey',
                      textDecorationLine: 'line-through',
                    }}
                  >
                    {formatCurrency(item.course.price)}
                  </Text>
                </Text>
              ) : (
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                  {formatCurrency(item.course.price)}VND
                </Text>
              )}
            </View>
            <View style={{ marginRight: 10, alignItems: 'center' }}>
              <Icon name="delete" size={30} onPress={handleDeleteCartItem} />
            </View>
          </>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 30 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 24,
          paddingVertical: 16,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
          Giỏ hàng của tôi
        </Text>
        {cart && cart.cartItems.length > 1 ? (
          <TouchableOpacity onPress={handleDeleteAllItems}>
            <MaterialIcons
              name="remove-shopping-cart"
              size={26}
              color={COLORS.MAINPINK}
            />
          </TouchableOpacity>
        ) : (
          ''
        )}
      </View>
      {cart && cart.cartItems.length > 0 ? (
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
          data={cart.cartItems}
          renderItem={({ item }) => <CartCard item={item} />}
          ListFooterComponentStyle={{ paddingHorizontal: 20 }}
          ListFooterComponent={() => (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 24,
                  alignItems: 'center',
                  marginTop: 20,
                  marginBottom: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: COLORS.SELECTYELLOW,
                    textTransform: 'uppercase',
                  }}
                >
                  Đã giảm:
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}
                >
                  {formatCurrency(cartTotalPrice?.totalPriceDiscount || 0)}
                  VND
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 24,
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: COLORS.MAINPINK,
                    textTransform: 'uppercase',
                  }}
                >
                  Tổng tiền:
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: COLORS.BLUESTEEL,
                  }}
                >
                  {formatCurrency(
                    cartTotalPrice?.totalPriceAfterPromotion ||
                      cartTotalPrice?.totalPrice ||
                      0
                  )}
                  VND
                </Text>
              </View>

              <View style={{ marginHorizontal: 30, marginTop: 20 }}>
                <PrimaryButton title="Thanh toán" />
              </View>
            </View>
          )}
        />
      ) : (
        <View>
          <View style={{ alignItems: 'center', marginTop: 32 }}>
            <MaterialCommunityIcons
              name="cart-heart"
              size={120}
              color="#6b7280"
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                paddingHorizontal: 20,
                color: '#6b7280',
                textAlign: 'center',
                marginVertical: 12,
              }}
            >
              Giỏ hàng của bạn đang trống, hãy đi mua sắm nào
            </Text>
            <TouchableOpacity
              style={{
                paddingHorizontal: 30,
                backgroundColor: COLORS.MAINPINK,
                borderRadius: 10,
                marginVertical: 20,
                paddingBottom: 10,
                paddingTop: 10,
              }}
              onPress={() => navigation.navigate('home')}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>
                Quay lại trang chủ
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  CartCard: {
    height: 140,
    width: '89%',
    elevation: 15,
    borderRadius: 10,
    backgroundColor: 'white',
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
    backgroundColor: '#F9813A',
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  btnContainer: {
    backgroundColor: COLORS.MAINPINK,
    height: 52,
    width: 140,
    alignSelf: 'center',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer1: {
    backgroundColor: COLORS.RED_450,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  title: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
