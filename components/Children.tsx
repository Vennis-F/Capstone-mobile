import * as React from 'react';
import { Text, StyleSheet, View, SafeAreaView, FlatList, TouchableOpacity, Image, TextInput, Button } from 'react-native';

import { Video, ResizeMode } from 'expo-av';
import { Checkbox, HStack } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../libs/const/color';
import DividerCustom from './DividerCustom';

const DATA = [
    {
        id: 1,
        username: "Nguyễn Lê Bé"
    },
    {
        id: 2,
        username: "Nguyễn Thiên An"
    },
    {
        id: 3,
        username: "Nguyễn An Nhiên"
    }
]

const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity>
        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>

            <View>
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: "https://reactnative.dev/img/tiny_logo.png",
                    }} />
            </View>
            <View>
                <Text style={{ fontSize: 20, marginLeft: 10, marginTop: 5 }}>{item.username}</Text>
            </View>
            <View style={{ marginLeft: "auto" }}>
                <Icon name='arrow-forward-ios' size={20} style={{ marginTop: 10 }} />
            </View>
        </View>
        <DividerCustom />
    </TouchableOpacity>
)
export default function Children({ path }: { path: string }) {
    const [selectedId, setSelectedId] = React.useState();

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
                    keyExtractor={(item) => item.id}
                    extraData={selectedId}
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
        width: 40,
        height: 40,
        borderRadius: 40
    }

});