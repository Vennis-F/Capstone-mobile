/* eslint-disable @typescript-eslint/no-explicit-any */

import makeApi from '../../../libs/core/configureAxios';
import { Course } from '../../courses/types';
import {
  CreateCourseByInstructorBodyRequest,
  GetCoursesByInstructorBodyRequest,
  GetCoursesByInstructorResponse,
  UpdateCourseByInstructorBodyRequest,
  UpdatePriceCourseByInstructorBodyRequest,
} from '../types';

const api = makeApi(`${process.env.EXPO_PUBLIC_API_URL}`);

const INSTRUCTOR_BASE_URL = `/instructor`;

export const getCoursesByInstructorId = (
  body: GetCoursesByInstructorBodyRequest,
): Promise<GetCoursesByInstructorResponse> => api.post(`${INSTRUCTOR_BASE_URL}/course/own`, body);

export const createCourseByInstructor = (
  body: CreateCourseByInstructorBodyRequest,
): Promise<Course> => api.post(`${INSTRUCTOR_BASE_URL}/course`, body);

export const updateCourseByInstructor = (
  body: UpdateCourseByInstructorBodyRequest,
): Promise<Course> => api.patch(`${INSTRUCTOR_BASE_URL}/course`, body);

export const updatePriceCourseByInstructor = (
  body: UpdatePriceCourseByInstructorBodyRequest,
): Promise<Course> => api.patch(`${INSTRUCTOR_BASE_URL}/course/price`, body);

export const uploadCourseThumbnailByInstructor = (courseId: string, body: any): Promise<void> =>
  api.post(`${INSTRUCTOR_BASE_URL}/course/thumbnail/upload?courseId=${courseId}`, body);

export const getAllInstructors = (status: boolean) => api.get(`${INSTRUCTOR_BASE_URL}?status=${status}`);