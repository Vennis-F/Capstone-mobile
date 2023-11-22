import jwt_decode from 'jwt-decode'

// import { UserInfor } from 'features/auth/types'

const TOKEN = 'access_token'

// export const decodeToken = (accessToken: string): UserInfor => jwt_decode(accessToken)

export const getAccessToken = () => localStorage.getItem(TOKEN)

export const setAccessToken = (token: string) => localStorage.setItem(TOKEN, token)

export const removeAccessToken = () => localStorage.removeItem(TOKEN)