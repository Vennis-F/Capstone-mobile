// Middleware.js
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { getAccessToken } from '../libs/core/handle-token';


export const useAuthMiddleware = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const checkToken = async () => {
            const token = await getAccessToken();
            if (!token) {
                // Nếu không có token, chuyển hướng đến màn hình đăng nhập
                navigation.navigate('seven');
                console.log(token)
            }
        };

        checkToken();
    }, [navigation]);
};
