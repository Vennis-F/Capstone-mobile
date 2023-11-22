
import makeApi from '../../../libs/core/configureAxios'
import { Category } from '../types'

const api = makeApi(`${process.env.EXPO_PUBLIC_API_URL}`)

const CATEGORY_BASE_URL = `/category`

export const getCategories = (active: 'true' | 'false'): Promise<Category[]> =>
  api.get(`${CATEGORY_BASE_URL}?active=${active}`)

export const getCategoryById = (id: string): Promise<Category> =>
  api.get(`${CATEGORY_BASE_URL}/${id}`)

