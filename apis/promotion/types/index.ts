import { Course } from 'features/courses/types'

export type CheckPromotionCourseApplyRequest = {
  courseId: string
  code: string
}

export type PromotionCourse = {
  id: string
  isView: boolean
  isFull: boolean
  used: number
  promotion: Promotion
  course: Course
  active: boolean
}

export type Promotion = {
  id: string
  title: string
  discountPercent: number
  insertedDate: string
  updatedDate: string
  note: string
  effectiveDate: string
  expiredDate: string
  code: string
  amount: number
  active: boolean
  promotionCourse: PromotionCourse[]
}

export type CreatePromotionBodyRequest = {
  title: string
  discountPercent: number
  note: string
  effectiveDate: string
  expiredDate: string
  code: string
  amount: number
}

export type UpdatePromotionBodyRequest = {
  title: string
  discountPercent: number
  note: string
  effectiveDate: string
  expiredDate: string
  code: string
  amount: number
}

export type CreatePromotionCourseBodyRequest = {
  courseId: string
  promotionId: string
  isView: boolean
}
export type UpdateIsViewOfStaffBodyRequest = {
  promotionCourseId: string
  isView: boolean
}
