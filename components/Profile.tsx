import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import {
    View,
    Text,
    SafeAreaView,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";


import { StatusBar } from 'expo-status-bar';
import { COLORS } from '../libs/const/color';
import { getAccessToken, removeAccessToken } from '../libs/core/handle-token';
import { guestSignOut } from '../apis/auth/api';
import { useFocusEffect } from 'expo-router';
export default function Profile({ path }: { path: String }) {
    const [userData, setuserData] = useState(null);
    const navigation = useNavigation();
    const [userLogin, setuserLogin] = useState(false);

    const handleCheckIsLogin = async () => {
        const token = await getAccessToken()
        if (token) setuserLogin(true)
        else setuserLogin(false)
    }

    const handleLogout = async () => {
        const token = await getAccessToken()

        if (token) {
            await guestSignOut(token)
            removeAccessToken()
            setuserLogin(false)
        }
        else console.log("[error]", "You are not allowed to log out")
    }

    console.log("[Profile login]", userLogin)

    // useEffect(() => {
    //     handleCheckIsLogin()
    // }, [])

    useFocusEffect(
        React.useCallback(() => {
            handleCheckIsLogin();
        }, [])
    );

    return (
        <View >
            <View style={styles.container}>
                <View style={{ width: '100%' }}>
                    <Image source={require('../assets/images/360_F_562024161_tGM4lFlnO0OczLYHFFuNNdMUTG9ekHxb.jpg')}
                        style={styles.cover}
                    />
                </View>
                <View style={styles.profileContainer} >
                    <Image source={require('../assets/images/HD-wallpaper-obito-naruto.jpg')}
                        style={styles.profile}
                    />
                    <Text style={styles.name}>
                        {userLogin === true ? "Sk Mustain" : "Please login into your account"}
                    </Text>
                    {userLogin === false ? (
                        <TouchableOpacity onPress={() => { navigation.navigate('seven') }}>
                            <View style={styles.loginBtn}>
                                <Text style={styles.menuText}>L O G I N</Text>
                            </View>
                        </TouchableOpacity>
                    ) : (

                        <View style={styles.loginBtn}>
                            <Text style={styles.menuText}>Example@gmail.com</Text>
                        </View>
                    )}
                    {userLogin === false ? (
                        <View></View>
                    ) : (
                        <View style={styles.menuWrapper}>
                            <TouchableOpacity onPress={() => { }}>
                                <View style={styles.menuItem}>
                                    <Icon name='library-books' size={24} style={{ marginRight: 30 }} />
                                    <Text style={styles.menuTextSub}>Hồ sơ</Text>
                                </View>

                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { }}>
                                <View style={styles.menuItem}>
                                    <Icon name='security' size={24} style={{ marginRight: 30 }} />
                                    <Text style={styles.menuTextSub}>Bảo mật tài khoản</Text>
                                </View>

                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { }}>
                                <View style={styles.menuItem}>
                                    <Icon name='tag-faces' size={24} style={{ marginRight: 30 }} />
                                    <Text style={styles.menuTextSub}>Ảnh đại diện</Text>
                                </View>

                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate('three') }}>
                                <View style={styles.menuItem}>
                                    <Icon name='tv' size={24} style={{ marginRight: 30 }} />
                                    <Text style={styles.menuTextSub}>Khóa học đã sở hữu</Text>
                                </View>

                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { }}>
                                <View style={styles.menuItem}>
                                    <Icon name='transfer-within-a-station' size={24} style={{ marginRight: 30 }} />
                                    <Text style={styles.menuTextSub}>Quản lý tài khoản trẻ em</Text>
                                </View>

                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleLogout}>
                                <View style={styles.menuItem}>
                                    <Icon name='logout' size={24} style={{ marginRight: 30 }} />
                                    <Text style={styles.menuTextSub}>Đăng xuất</Text>
                                </View>

                            </TouchableOpacity>
                        </View>

                    )}
                </View>
            </View>
            {/* <SafeAreaView
                style={{ flex: 1, paddingHorizontal: 100, backgroundColor: "white" }}>
                <View>
                    <Text style={styles.setting}>Account Settings</Text>
                    <View style={styles.account}>
                        <Text style={styles.security}>Hồ sơ</Text>
                        <Icon name='chevron-right' size={20} />
                    </View>
                    <View style={styles.account}>
                        <Text style={styles.security}>Email notification preferences</Text>
                        <Icon name='chevron-right' size={20} />
                    </View>
                    <View style={styles.account}>
                        <Text style={styles.security}>Learning reminders</Text>
                        <Icon name='chevron-right' size={20} />
                    </View>
                </View>
                <View>
                    <Text style={styles.support}>Support</Text>
                    <View style={styles.account}>
                        <Text style={styles.security}>About</Text>
                        <Icon name='chevron-right' size={20} />
                    </View>
                    <View style={styles.account}>
                        <Text style={styles.security}>Frequently asked questions</Text>
                        <Icon name='chevron-right' size={20} />
                    </View>
                    <View style={styles.account}>
                        <Text style={styles.security}>Share app</Text>
                        <Icon name='chevron-right' size={20} />
                    </View>
                </View>
            </SafeAreaView> */}

        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    cover: {
        height: 220,
        resizeMode: 'cover'
    },
    profileContainer: {
        flex: 1,
        alignItems: 'center',
    },
    profile: {
        height: 135,
        width: 135,
        borderRadius: 999,
        resizeMode: 'cover',
        borderWidth: 2,
        marginTop: -90,
    },
    name: {
        fontWeight: "bold",
        color: 'black',
        marginVertical: 3,
    },
    loginBtn: {
        backgroundColor: '#BFEFFF',
        paddingBottom: 2,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 0.5,
        borderRadius: 30,


    },
    menuText: {
        // fontFamily: "regular",
        color: 'gray',
        // marginLeft: 28,
        fontWeight: "400",
        fontSize: 14,
        lineHeight: 26,
    },
    menuTextSub: {
        color: 'gray',
        // marginLeft: 28,
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 26,
    },
    setting: {
        fontSize: 13,
        marginTop: 0,
        color: '#6E7B8B',
        fontWeight: '400'
    },
    support: {
        fontSize: 13,
        marginTop: 20,
        color: '#6E7B8B',
        fontWeight: '400'
    },
    account: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    security: {

        fontSize: 18,

    },
    menuWrapper: {
        marginTop: 10,
        backgroundColor: COLORS.WHITE,
        borderRadius: 12,
        width: "68%"
    },
    menuItem: {
        borderBottomWidth: 1,
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderColor: COLORS.GRAY_300

    }


})

