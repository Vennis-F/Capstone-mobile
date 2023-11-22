import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
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

import  Icon  from 'react-native-vector-icons/MaterialIcons';
import { getAccessToken } from '../libs/core/handle-token';
import { addCartItem, deleteCartItem, getCart, getCartTotalPrice } from '../apis/cart/apis';
import { Cart, CartTotalPrice} from '../apis/cart/types';


const Courses = [
    {
      id: "1",
      title: "Google UX Design ",
      provider: "Google",
      price: "5",
      image:"https://reactnative.dev/img/tiny_logo.png"
    },
    {
      id: "2",
      title: "Font-end Development ",
      provider: "Google",
      price: "7",
      image:"https://reactnative.dev/img/tiny_logo.png"
    },
    {
      id: "3",
      title: "Introduction To UI Design",
      provider: "Google",
      price: "8",
      image:"https://reactnative.dev/img/tiny_logo.png"
    },
  ];

export default function CartScreen({ path }: { path: string }) {
    const [cart, setCart] = useState<Cart>()
    const [cartTotalPrice, setCartTotalPrice] = useState<CartTotalPrice| null>(null)
    // const route = useRoute();
    console.log("[Detail cart]",cart)

    const handleGetCart = async () => {
        const dataResponse = await getCart()
        const priceRes = await getCartTotalPrice()
        setCartTotalPrice(priceRes)
        setCart(dataResponse)
    }
    
    useEffect(()=>{
     handleGetCart()
    },[])
    
    const PrimaryButton = ({title, onPress = () => {}}) => {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
                <View style={styles.btnContainer}>
                    <Text style={styles.title}>Xác Nhận</Text>
                </View>
            </TouchableOpacity>
        )
    }
    const CartCard = ({item}) =>{
        return (
            <View style={styles.CartCard}>
                <Image  
                source={{uri: "https://reactnative.dev/img/tiny_logo.png",}} style={{height:80,width:80}}/>
                <View style={{height:100 , marginLeft:10, paddingVertical:10,flex:1}}>
                    <Text style={{fontWeight:"bold", fontSize:16}}>{item.course.title}</Text>
                    <Text style={{fontSize:16, color:'#908e8c'}}>{item.course.totalChapter} bài giảng</Text>
                    <Text style={{fontSize:17, fontWeight:"bold"}}>{item.course.price}đ</Text>
                </View>
                <View style={{marginRight:10, alignItems:'center'}}>
                    <Icon name='delete' size={30} onPress={async ()=>{
                        await deleteCartItem(item.id)
                        await handleGetCart()
                    }}/>
                </View>
            </View>
        )
    }
 return (
   <SafeAreaView style={{backgroundColor:'#fff', flex:1}}>
       {cart && cartTotalPrice &&<FlatList
       showsHorizontalScrollIndicator ={false}
       contentContainerStyle={{paddingBottom:80}}
       data={cart.cartItems}
       renderItem={({item})=> <CartCard item={item} />}
       ListFooterComponentStyle={{paddingHorizontal:20}}
       ListFooterComponent={()=>(
        <View>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:15}}>
                <Text style={{fontSize:18,fontWeight:"bold"}}>Tổng tiền</Text>
                <Text style={{fontSize:18,fontWeight:"bold"}}>{cartTotalPrice.totalPrice}đ</Text>
            </View>
            <View style={{marginHorizontal:30}}>
                <PrimaryButton title="Xác Nhận"/>
            </View>
        </View>
       )}
      />}
   </SafeAreaView>
 );

}

const styles = StyleSheet.create({
    CartCard:{
        height:100,
        width:"89%",
        elevation:15,
        borderRadius:10,
        backgroundColor:"white",
        marginVertical:10,
        marginHorizontal:20,
        paddingHorizontal:10,
        marginRight:250,
        flexDirection:'row',
        alignItems: 'center',
    },
    actionBtn:{
        width:80,
        height:30,
        backgroundColor:"#F9813A",
        borderRadius:30,
        paddingHorizontal:5,
        flexDirection:'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    btnContainer:{
        backgroundColor:"#F9813A",
        height:60,
        borderRadius:30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title:{
        color:"#FFF",
        fontWeight:"bold",
        fontSize:18,
    }
})