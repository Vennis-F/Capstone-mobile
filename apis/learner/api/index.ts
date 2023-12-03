
import makeApi from '../../../libs/core/configureAxios';
import { CourseLearnerFilterResponse, PageMetaResponse } from '../../courses/types';
import {
    ChangePasswordLearnerBodyRequest,
    CreateLearnerBodyRequest,
    CreateLearnerCourseBodyRequest,
    LearnerFilterResponse,
    UpdateLearnerBodyRequest,
    UpdateLearnerCourseBodyRequest,
} from '../types';

const api = makeApi(`${process.env.EXPO_PUBLIC_API_URL}`);

const LEARNER_BASE_URL = `/learner`;

const LEARNER_COURSE_BASE_URL = `/learner-course`;

export const createLearner = (body: CreateLearnerBodyRequest): Promise<void> =>
    api.post(`${LEARNER_BASE_URL}/create`, body);

export const getLearnersByUser = (): Promise<LearnerFilterResponse[]> =>
    api.get(`${LEARNER_BASE_URL}/user`);

export const getCourseForLearnerSearchByUser = (
    search: string,
): Promise<{ data: CourseLearnerFilterResponse[]; meta: PageMetaResponse; }> =>
    api.post(`${LEARNER_BASE_URL}/course/user?search=${search}`);

export const updateLearner = (body: UpdateLearnerBodyRequest): Promise<void> =>
    api.put(`${LEARNER_BASE_URL}`, body);

export const changePasswordLearner = (body: ChangePasswordLearnerBodyRequest): Promise<void> =>
    api.put(`${LEARNER_BASE_URL}/passowrd/change`, body);
// ----------------------------------------------------------------

export const createLearnerCourse = (body: CreateLearnerCourseBodyRequest): Promise<void> =>
    api.post(`${LEARNER_COURSE_BASE_URL}/create`, body);

export const updateLearnerCourse = (body: UpdateLearnerCourseBodyRequest): Promise<void> =>
    api.patch(`${LEARNER_COURSE_BASE_URL}/update`, body);

export const getLearnerIsLearningCourseByCourseId = (
    courseId: string,
): Promise<{ learnerId: string; isLearning: boolean; }> =>
    api.get(`${LEARNER_COURSE_BASE_URL}/course/learning/learner/${courseId}`);

export const checkCustomerIsLearningCourseByCourseId = (
    courseId: string,
): Promise<{ status: boolean; }> =>
    api.get(`${LEARNER_COURSE_BASE_URL}/course/learning/customer/${courseId}`);
