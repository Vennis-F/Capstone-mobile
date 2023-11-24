import * as React from 'react';
import { Text, StyleSheet, View, SafeAreaView, FlatList, TouchableOpacity, Image, TextInput, Button } from 'react-native';

import { Video, ResizeMode } from 'expo-av';
import { Checkbox, HStack } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../libs/const/color';




export default function Information({ path }: { path: string }) {
    const [email, setEmail] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [middleName, setMiddleName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');

    const handleSubmit = () => {
        // Xử lý dữ liệu khi người dùng nhấn nút Submit
        console.log('Email:', email);
        console.log('Username:', username);
        console.log('First Name:', firstName);
        console.log('Middle Name:', middleName);
        console.log('Last Name:', lastName);
        console.log('Phone Number:', phoneNumber);
        // Thêm logic xử lý dữ liệu ở đây
    };
    return (
        <SafeAreaView style={{ paddingHorizontal: 10, flex: 1, backgroundColor: COLORS.BACKGROUND, width: "100%" }}>
            <View style={styles.container}>
                <Text style={{ fontSize: 25, fontWeight: "bold", marginBottom: 20 }}>Thông tin cơ bản</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={(text) => setEmail(text)}
                    editable={false}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Tên đăng nhập"
                    onChangeText={(text) => setUsername(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Tên"
                    onChangeText={(text) => setFirstName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Tên đệm"
                    onChangeText={(text) => setMiddleName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Họ"
                    onChangeText={(text) => setLastName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Số điện thoại"
                    keyboardType="numeric"
                    onChangeText={(text) => setPhoneNumber(text)}
                />
                <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                    <View style={{ marginRight: 10 }}>
                        <Button color={COLORS.RED_500} title="ĐẶT LẠI" onPress={handleSubmit} />
                    </View>
                    <View>
                        <Button color={COLORS.RED_500} title='CẬP NHẬT' onPress={handleSubmit} />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        marginVertical: 100,
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
        marginBottom: 12,
        paddingLeft: 8,
        borderRadius: 8, // Góc bo tròn
        backgroundColor: '#fff', // Màu nền của TextInput
    },
    button: {
        backgroundColor: '#4CAF50',
        color: '#fff',
        borderRadius: 8,
        padding: 10,
        textAlign: 'center',
    },
});