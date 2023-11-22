

import makeApi from '../../../libs/core/configureAxios'
import { AddCartItemBody, Cart, CartTotalPrice } from '../types'

const api = makeApi(`${process.env.EXPO_PUBLIC_API_URL}`)

const CART_BASE_URL = `/cart`

export const getCart = (): Promise<Cart> => api.get(CART_BASE_URL)

export const getCartTotalPrice = (): Promise<CartTotalPrice> => api.get(`${CART_BASE_URL}/total`)

export const addCartItem = (body: AddCartItemBody): Promise<void> =>
  api.post(`${CART_BASE_URL}/add`, body)

export const deleteCartItem = (id: string): Promise<void> => api.delete(`${CART_BASE_URL}/${id}`)

export const deleteAllCartItems = (): Promise<void> => api.delete(`${CART_BASE_URL}`)

export const checkCartIsValid = (): Promise<string[]> => api.get(`${CART_BASE_URL}/valid`)
