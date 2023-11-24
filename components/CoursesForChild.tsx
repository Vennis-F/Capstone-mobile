import * as React from 'react';
import { Text, StyleSheet, View, SafeAreaView, FlatList, TouchableOpacity, Image, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { Video, ResizeMode } from 'expo-av';
import { Checkbox, HStack } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../libs/const/color';
import DividerCustom from './DividerCustom';

const DATA = [
    {
        id: 1,
        name: "Courses 1"
    },
    {
        id: 2,
        name: "Courses 2"
    },
    {
        id: 3,
        name: "Courses 3"
    },
    {
        id: 4,
        name: "Courses 4"
    },
    {
        id: 5,
        name: "Courses 5"
    },
    {
        id: 6,
        name: "Courses 6"
    }
]

const Item = ({ item, onPress, backgroundColor, textColor }) => (

    <TouchableOpacity style={{ marginLeft: "auto", marginBottom: 20 }}>
        <View>
            <Image
                style={styles.tinyLogo}
                source={{
                    uri: "https://reactnative.dev/img/tiny_logo.png",
                }} />
        </View>
        <View>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.name}</Text>
        </View>
        <View style={{ marginRight: 10 }}>
            <Picker
                // selectedValue={selectedValue} // Đặt giá trị được chọn
                // onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                style={{ width: 140, color: textColor }}
            >
                <Picker.Item label="Option 1" value="option1" />
                <Picker.Item label="Option 2" value="option2" />
                <Picker.Item label="Option 3" value="option3" />
            </Picker>
        </View>
    </TouchableOpacity>
)
export default function CoursesForChild({ path }: { path: string }) {
    const [selectedId, setSelectedId] = React.useState();
    const [selectedValue, setSelectedValue] = React.useState();
    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#CECADA" : "#fff";
        const color = item.id === selectedId ? "white" : "black";

        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
                backgroundColor={backgroundColor}
                textColor={color}
            />
        );
    }
    return (
        <SafeAreaView style={{ paddingHorizontal: 10, flex: 1, backgroundColor: COLORS.BACKGROUND, width: "100%" }}>
            <View style={styles.container}>
                <Text style={{ fontSize: 25, fontWeight: "bold", marginBottom: 20 }}>Con của tôi</Text>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    numColumns={2}
                    keyExtractor={(item) => item.id.toString()}
                    extraData={selectedValue}
                />

            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        marginVertical: 10,
        justifyContent: 'center',
        padding: 16,
        height: "96%",
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
        paddingBottom: 30
    },
    tinyLogo: {
        width: 120,
        height: 120,

    }

});