

import makeApi from '../../../libs/core/configureAxios'
import { CreatePaymentURLBody, Order, UpdateOrderBodyRequest } from '../types'

const api = makeApi(`${process.env.EXPO_PUBLIC_API_URL}`)

const ORDER_BASE_URL = `/order`

const PAYMENT_BASE_URL = `/payment`

export const createOrder = (): Promise<Order> => api.post(`${ORDER_BASE_URL}/create`)

export const updateOrder = (body: UpdateOrderBodyRequest): Promise<Order> =>
  api.patch(`${ORDER_BASE_URL}/update`, body)

export const findOrdersByUser = (): Promise<Order[]> => api.get(`${ORDER_BASE_URL}/user`)

export const createPaymentURL = (body: CreatePaymentURLBody): Promise<string> =>
  api.post(`${PAYMENT_BASE_URL}/create`, body)
