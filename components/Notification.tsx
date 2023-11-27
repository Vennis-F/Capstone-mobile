import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
} from 'react-native';

const Notification = ({ message, type, onClose }) => {
    const [animation] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
        const timer = setTimeout(() => {
            onClose();
        }, 30000); // Thời gian hiển thị thông báo (3 giây)
        return () => clearTimeout(timer);
    }, []);

    const handlePress = () => {
        Animated.timing(animation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => onClose());
    };

    const translateY = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [-100, 0],
    });

    const backgroundColor =
        type === 'success' ? '#4CAF50' : type === 'danger' ? '#F44336' : '#2196F3';

    return (
        <Animated.View
            style={[
                styles.notification,
                { transform: [{ translateY }], backgroundColor },
            ]}
        >
            <Text style={styles.notificationText}>{message}</Text>
            <TouchableOpacity onPress={handlePress} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    notification: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    notificationText: {
        color: '#fff',
        fontSize: 16,
    },
    closeButton: {
        marginLeft: 10,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Notification;
