import { StyleSheet } from 'react-native';


import { Text, View } from '../../components/Themed';

import Login from '../../components/Login';


export default function TabThreeScreen() {
    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
            <Login path="app/(tabs)/seven.tsx" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
