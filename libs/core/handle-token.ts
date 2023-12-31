import AsyncStorage from '@react-native-async-storage/async-storage';
import JWT from 'expo-jwt';
import jwt_decode from 'jwt-decode';


const TOKEN_KEY = '@access_token'; // Key dùng để lưu trữ token trong AsyncStorage
const JWT_SECRET =
  'c25T7Azx9MdX8VBye7yNBFynBBmQEECcvarf22eeng49fBbEbaGqwL6c8efAZA7';

export enum UserRole {
  CUSTOMER = 'Customer',
  ADMIN = 'Admin',
  STAFF = 'Staff',
  LEARNER = 'Learner',
  INSTRUCTOR = 'Instructor',
}

export type UserInfor = {
  id: string;
  email?: string;
  username?: string;
  role: UserRole;
};

// export const decodeToken = (accessToken: string): UserInfor | null => {
//   try {
//     return JWT.decode(accessToken, JWT_SECRET, { timeSkew: 30 }) as UserInfor;

//   } catch (error) {
//     console.log('[handle-token - decodetoken error] ', error);
//   }
//   return null;
// };
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

export const getUserRole = async () => {
  const token = await getAccessToken();
  if (!token) return null;
  try {
    const decoded = decodeToken(token);
    return decoded.role;
  } catch (error) {
    console.log('[handle-token - getuserrole decode error] ', error);
    return null;
  }

};

export const getUserMainInfo = async () => {
  const token = await getAccessToken();
  if (!token) return null;
  try {
    const decoded = decodeToken(token);
    return decoded;
  } catch (error) {
    console.log('[handle-token - getuserrole decode error] ', error);
    return null;
  }

};