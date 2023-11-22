import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@access_token'; // Key dùng để lưu trữ token trong AsyncStorage

export enum UserRole {
    CUSTOMER = 'Customer',
    ADMIN = 'Admin',
    STAFF = 'Staff',
    LEARNER = 'Learner',
    INSTRUCTOR = 'Instructor',
}

export type UserInfor = {
    id: string
    email?: string
    username?: string
    role: UserRole
}

export const decodeToken = (accessToken: string): UserInfor => jwt_decode(accessToken);

export const getAccessToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return token;
  } catch (error) {
    // Xử lý lỗi khi lấy token
    console.error('Error getting access token:', error);
    return null;
  }
};

export const setAccessToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    // Xử lý lỗi khi lưu token
    console.error('Error setting access token:', error);
  }
};

export const removeAccessToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    // Xử lý lỗi khi xóa token
    console.error('Error removing access token:', error);
  }
};
