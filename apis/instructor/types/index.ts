import { CourseStatus, PageMetaResponse, PageOptions, SortFieldCourse } from "../../courses/types";

export type CourseFilterByInstructorResponse = {
  id: string;
  title: string;
  description: string;
  price: number;
  shortDescription: string;
  prepareMaterial: string;
  status: CourseStatus;
  totalChapter: number;
  publishedDate: string;
  totalBought: number;
  thumbnailUrl: string;
  active: boolean;
};

export type GetCoursesByInstructorResponse = {
  data: CourseFilterByInstructorResponse[];
  meta: PageMetaResponse;
};

// export enum SortFieldSearchFilterQuestionTopic {
//   RATING = 'rating',
//   UPDATED_DATE = 'updatedDate',
// }

export type CreateCourseByInstructorBodyRequest = {
  title: string;
  categoryId: string;
  levelId: string;
};

export type UpdateCourseByInstructorBodyRequest = {
  courseId: string;
  title: string;
  description: string | null;
  prepareMaterial: string | null;
  categoryId: string;
  levelId: string;
};

export type UpdatePriceCourseByInstructorBodyRequest = {
  courseId: string;
  price: number;
};

export type GetCoursesByInstructorBodyRequest = {
  courseStatus?: CourseStatus;
  search?: string;
  sortField?: SortFieldCourse;
  pageOptions: PageOptions;
};

