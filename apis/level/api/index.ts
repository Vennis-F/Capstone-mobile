import makeApi from '../../../libs/core/configureAxios';


import { CreateLevelBodyRequest, Level, UpdateLevelBodyRequest } from '../types';

const api = makeApi(`${process.env.EXPO_PUBLIC_API_URL}`);


const LEVEL_BASE_URL = `/level`;

export const getLevels = (active: 'true' | 'false'): Promise<Level[]> =>
  api.get(`${LEVEL_BASE_URL}?active=${active}`);

export const getLevelById = (id: string): Promise<Level> => api.get(`${LEVEL_BASE_URL}/${id}`);

export const getLevelsByAdmin = (): Promise<Level[]> => api.get(`${LEVEL_BASE_URL}/admin`);

export const createLevelByAdmin = (body: CreateLevelBodyRequest): Promise<void> =>
  api.post(`${LEVEL_BASE_URL}`, body);

export const updateLevelByAdmin = (id: string, body: UpdateLevelBodyRequest): Promise<void> =>
  api.patch(`${LEVEL_BASE_URL}/${id}`, body);

export const deleteLevelByAdmin = (id: string): Promise<void> =>
  api.delete(`${LEVEL_BASE_URL}/${id}`);
