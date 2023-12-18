import { PageMetaResponse, PageOptions } from '../../../libs/types';
import { ChapterLectureFilter } from '../../chapter-lecture/types';
import { LearnerFilterResponse } from '../../learner/types';
import { UserWithRole } from '../../user/types';


export type CreateQuestionTopicBodyRequest = {
  title: string;
  description?: string;
};
export type QuestionTopicFilterResponse = {
  id: string;
  title: string;
  description: string;
  insertedDate: string;
  updatedDate: string;
  type: string;
  rating: number;
  active: boolean;
  chapterLecture: ChapterLectureFilter;
  user: UserWithRole | null;
  learner: LearnerFilterResponse | null;
  totalLengthQuestionAnswers: number;
};

export enum SortFieldSearchFilterQuestionTopic {
  RATING = 'rating',
  UPDATED_DATE = 'updatedDate',
}

export type SearchFilterQuestionTopicBodyRequest = {
  courseId: string;
  chapterLectureId?: string;
  search?: string;
  active: boolean;
  sortField?: SortFieldSearchFilterQuestionTopic;
  pageOptions: PageOptions;
};

export type SearchFilterQuestionTopicResponse = {
  data: QuestionTopicFilterResponse[];
  meta: PageMetaResponse;
};

//----------------------------------------------------------------

export type CreateQuestionAnswerBodyRequest = {
  questionTopicId: string;
  description?: string;
};

export type SearchFilterQuestionAnswerBodyRequest = {
  questionTopicId?: string;
  active: boolean;
  sortField?: SortFieldSearchFilterQuestionTopic;
  pageOptions: PageOptions;
};

export type QuestionAnswerFilterResponse = {
  id: string;
  description: string;
  insertedDate: string;
  updatedDate: string;
  active: boolean;
  questionTopic: QuestionTopicFilterResponse;
  user: UserWithRole | null;
  learner: LearnerFilterResponse | null;
};

export type SearchFilterQuestionAnswerResponse = {
  data: QuestionAnswerFilterResponse[];
  meta: PageMetaResponse;
};
