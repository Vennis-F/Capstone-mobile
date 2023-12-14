import makeApi from '../../../libs/core/configureAxios';
import { PageResponse } from '../../../libs/types';

import { Contest, CreateContestBodyRequest, DefinePromotionForWinnerBodyRequest, FindContestsFilterBodyRequest, ViewWinner } from '../types';

const api = makeApi(`${process.env.EXPO_PUBLIC_API_URL}`);


const CONTEST_BASE_URL = `/contest`;

export const getContestById = (id: string): Promise<Contest> => api.get(`${CONTEST_BASE_URL}/${id}`);

export const getContestsByStaff = (): Promise<Contest[]> => api.get(`${CONTEST_BASE_URL}/staff`);

export const findContestsFilter = (
  body: FindContestsFilterBodyRequest,
): Promise<PageResponse<Contest>> => api.post(`${CONTEST_BASE_URL}`, body);

export const createContestByStaff = (body: CreateContestBodyRequest): Promise<void> =>
  api.post(`${CONTEST_BASE_URL}/create`, body);

export const updateContestThumbnailByStaff = (contestId: string, body: any): Promise<void> =>
  api.put(`${CONTEST_BASE_URL}/thumbnail?contestId=${contestId}`, body);

const WINNER_BASE_URL = `/winner`;

export const definePromotionForWinner = (
  body: DefinePromotionForWinnerBodyRequest,
  contestId: string,
): Promise<void> => api.post(`${WINNER_BASE_URL}/${contestId}`, body);

export const getWinners = (contestId: string): Promise<ViewWinner[]> =>
  api.get(`${WINNER_BASE_URL}/contest/${contestId}`);
