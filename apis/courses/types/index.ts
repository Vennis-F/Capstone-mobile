export type Category = {
  id: string
  name: string
  active: boolean
  totalCourses: number
}
export type Level = {
  id: string
  name: string
  active: boolean
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

export enum CourseStatus {
  CREATED = 'Created',
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  BANNED = 'Banned',
}

export type CourseFullInfor = {
  id: string
  title: string
  description: string | null
  price: number | null
  shortDescription: string | null
  prepareMaterial: string | null
  status: CourseStatus
  totalChapter: number | null
  publishedDate: string
  totalBought: number | null
  thumbnailUrl: string | null
  active: boolean
  category: Category
  level: Level
}

export type CourseFilterResponse = {
  id: string
  title: string
  description: string
  price: number
  shortDescription: string
  prepareMaterial: string
  status: string
  totalChapter: number
  publishedDate: string
  totalBought: number
  thumbnailUrl: string
  active: boolean
}

export type CourseLearnerFilterResponse = {
  completedPercent: number
} & CourseFilterResponse

// Components
export enum SortCourseBy {
  PUBLISHED_DATE_ASC = 'PUBLISHED_DATE_ASC',
  PUBLISHED_DATE_DESC = 'PUBLISHED_DATE_DESC',
  PRICE_ASC = 'PRICE_ASC',
  PRICE_DESC = 'PRICE_DESC',
}
// const SortCourseBy = (enum) => {}

// API
export type GetCoursesBySearchRequest = {
  levels: string[]
  categories: string[]
  search?: string
  sortField?: SortFieldCourse
  pageOptions: PageOptions
}

export type GetCoursesBySearchResponse = {
  data: Course[]
  meta: PageMetaResponse
}

export type Course = {
  id: string
  title: string
  description: string | null
  price: number
  discount: number
  discountPrice: number
  promotionCourseByStaffId: string | null
  ratedStar: number
  author: string
  totalLength: number
  shortDescription: string | null
  prepareMaterial: string | null
  status: CourseStatus
  totalChapter: number
  publishedDate: string
  totalBought: number
  thumbnailUrl: string
  active: boolean
  level: string
}

export type GetCourseDetailResponse = {
  authorId: string
  categoryId: string
  category: string
} & Course

export enum SortFieldCourse {
  PRICE = 'price',
  PUBLISHED_DATE = 'publishedDate',
}
