import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import Children from '../../components/Children';
import CoursesForChild from '../../components/CoursesForChild';


export default function TabOneScreen() {
    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>Tab One</Text> */}
            {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
            <CoursesForChild path="app/(tabs)/courses.tsx" />
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
    // separator: {
    //   marginVertical: 30,
    //   height: 1,
    //   width: '80%',
    // },
});