import * as React from 'react';
import { Text, StyleSheet, View, SafeAreaView, FlatList, TouchableOpacity, Image, TextInput, Button } from 'react-native';

import { Video, ResizeMode } from 'expo-av';
import { Checkbox, HStack } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../libs/const/color';




export default function ChangePassword({ path }: { path: string }) {
    const [oldPassword, setoldPassword] = React.useState('');
    const [newPassword, setnewPassword] = React.useState('');
    const [confirm, setconfirm] = React.useState('');


    const handleSubmit = () => {
        // Xử lý dữ liệu khi người dùng nhấn nút Submit
        console.log('Email:', oldPassword);
        console.log('Username:', newPassword);
        console.log('First Name:', confirm);
    };
    return (
        <SafeAreaView style={{ paddingHorizontal: 10, flex: 1, backgroundColor: COLORS.BACKGROUND, width: "100%" }}>
            <View style={styles.container}>
                <Text style={{ fontSize: 25, fontWeight: "bold", marginBottom: 20 }}>Đổi mật khẩu</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Mật khẩu hiện tại"
                    onChangeText={(text) => setoldPassword(text)}
                    editable={false}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mật khẩu mới"
                    onChangeText={(text) => setnewPassword(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Xác nhận mật khẩu mới"
                    onChangeText={(text) => setconfirm(text)}
                />
                <Button color={COLORS.RED_500} title='ĐỔI MẬT KHẨU' onPress={handleSubmit} />
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        marginVertical: 200,
        justifyContent: 'center',
        padding: 16,
        // height: "80%",
        backgroundColor: COLORS.WHITE, // Màu nền
        borderRadius: 8,
        // Các thuộc tính box shadow cho Android
        elevation: 5,
        // Các thuộc tính box shadow cho iOS
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 18,
        paddingLeft: 8,
        borderRadius: 8, // Góc bo tròn
        backgroundColor: '#fff', // Màu nền của TextInput
    },

});