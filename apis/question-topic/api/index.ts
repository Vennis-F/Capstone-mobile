/* eslint-disable @typescript-eslint/no-explicit-any */
import makeApi from '../../../libs/core/configureAxios';

import {
  CreateQuestionAnswerBodyRequest,
  CreateQuestionTopicBodyRequest,
  QuestionAnswerFilterResponse,
  QuestionTopicFilterResponse,
  SearchFilterQuestionAnswerBodyRequest,
  SearchFilterQuestionAnswerResponse,
  SearchFilterQuestionTopicBodyRequest,
  SearchFilterQuestionTopicResponse,
} from '../types';

const api = makeApi(`${process.env.EXPO_PUBLIC_API_URL}`);

const QUESTION_TOPIC_BASE_URL = `/question-topic`;

export const createQuestionTopic = (
  chapterLectureId: string,
  body: CreateQuestionTopicBodyRequest,
): Promise<void> => api.post(`${QUESTION_TOPIC_BASE_URL}/${chapterLectureId}`, body);

export const ratingQuestionTopic = (questionTopicId: string): Promise<void> =>
  api.patch(`${QUESTION_TOPIC_BASE_URL}/rating/${questionTopicId}`);

export const searchFilterQuestionTopic = (
  body: SearchFilterQuestionTopicBodyRequest,
): Promise<SearchFilterQuestionTopicResponse> => api.post(`${QUESTION_TOPIC_BASE_URL}/search`, body);

export const findQuestionTopicById = (
  questionTopicId: string,
): Promise<QuestionTopicFilterResponse> => api.get(`${QUESTION_TOPIC_BASE_URL}/${questionTopicId}`);

// ----------------------------------------------------------------

const QUESTION_ANSWER_BASE_URL = `/question-answer`;

export const createQuestionAnswer = (body: CreateQuestionAnswerBodyRequest): Promise<void> =>
  api.post(`${QUESTION_ANSWER_BASE_URL}`, body);

export const searchFilterQuestionAnswer = (
  body: SearchFilterQuestionAnswerBodyRequest,
): Promise<SearchFilterQuestionAnswerResponse> =>
  api.post(`${QUESTION_ANSWER_BASE_URL}/search`, body);

export const findQuestionAnswerById = (
  questionAnswerId: string,
): Promise<QuestionAnswerFilterResponse> =>
  api.get(`${QUESTION_ANSWER_BASE_URL}/${questionAnswerId}`);
