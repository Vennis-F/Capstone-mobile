

import makeApi from '../../../libs/core/configureAxios';
import {
  GetCoursesBySearchRequest,
  GetCoursesBySearchResponse,
  GetCourseDetailResponse,
  CourseFilterResponse,
  CourseFullInfor,
} from '../types';

const api = makeApi(`${process.env.EXPO_PUBLIC_API_URL}`);

const COURSE_BASE_URL = `/course`;

export const getCoursesBySearch = (
  body: GetCoursesBySearchRequest,
): Promise<GetCoursesBySearchResponse> => api.post(`${COURSE_BASE_URL}/search`, body);

export const getCourseById = (id: string): Promise<CourseFullInfor> =>
  api.get(`${COURSE_BASE_URL}/${id}`);

export const getCoursesDetailById = (id: string): Promise<GetCourseDetailResponse> =>
  api.get(`${COURSE_BASE_URL}/detail/${id}`);

export const checkCourseIsOwnedByCourseId = (id: string): Promise<{ status: boolean; }> =>
  api.get(`${COURSE_BASE_URL}/order/check-owned/${id}`);

export const getCourseByCustomer = (): Promise<CourseFilterResponse[]> =>
  api.get(`${COURSE_BASE_URL}/order/user`);

export const getCoursesByStaff = (): Promise<CourseFullInfor[]> =>
  api.get(`${COURSE_BASE_URL}/staff/list`);
