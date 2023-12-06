import { SxProps, Theme } from '@mui/material'

export type StyleSxProps = Record<string, SxProps<Theme>>
export type FormInputOptions = [string, any][] // eslint-disable-line
export enum UserRole {
  CUSTOMER = 'Customer',
  ADMIN = 'Admin',
  STAFF = 'Staff',
  LEARNER = 'Learner',
  INSTRUCTOR = 'Instructor',
}
export enum OrderType {
  ASC = 'ASC',
  DESC = 'DESC',
}
export type PageOptions = {
  take: number
  page: number
  order: OrderType
}
export type PageResponse<T> = { data: T[]; meta: PageMetaResponse }
export type PageMetaResponse = {
  page: number
  take: number
  itemCount: number
  pageCount: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export type SortCriteria<T> = {
  field: T
  order: OrderType
}

export type UploadStatus = { status: boolean }
