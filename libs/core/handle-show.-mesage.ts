import { Alert } from 'react-native';
export const showErrorAlert = (errorMessage: string) => {
    Alert.alert(
        'Error',
        errorMessage,
        [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
    );
};