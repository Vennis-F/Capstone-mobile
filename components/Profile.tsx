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
import Icon from "react-native-vector-icons/FontAwesome";
import { StatusBar } from 'expo-status-bar';
export default function Profile({ path }: { path: String }) {
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
                    <Text style={styles.name} >
                        Sk Mustain
                    </Text>
                    <View style={styles.loginBtn}>
                        <Text style={styles.menuText}>Example@gmail.com</Text>
                    </View>

                </View>
            </View>
            <SafeAreaView
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
            </SafeAreaView>

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
        paddingRight: 20,
        paddingLeft: -20,
        borderWidth: 0.5,
        borderRadius: 30,


    },
    menuText: {
        color: 'gray',
        marginLeft: 28,
        fontWeight: "400",
        fontSize: 14,
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

    }
})

