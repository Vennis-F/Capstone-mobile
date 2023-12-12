/* eslint-disable @typescript-eslint/no-explicit-any */
import makeApi from '../../../libs/core/configureAxios';
import { PageResponse } from '../../../libs/types';


import {
  CreateCustomerDrawingBodyRequest,
  CustomerDrawing,
  CustomerDrawingNotFilter,
  CustomerDrawingStatus,
  FilterCustomerDrawingBodyRequest,
} from '../types';

const api = makeApi(`${process.env.EXPO_PUBLIC_API_URL}`);


const CUSTOMER_DRAWING_BASE_URL = `/customer-drawing`;

export const getCustomerDrawingsByContest = (
  contestId: string,
  body: FilterCustomerDrawingBodyRequest,
): Promise<PageResponse<CustomerDrawing>> =>
  api.post(`${CUSTOMER_DRAWING_BASE_URL}/contest?contestId=${contestId}`, body);

export const getCustomerDrawings = (
  body: FilterCustomerDrawingBodyRequest,
): Promise<PageResponse<CustomerDrawing>> => api.post(`${CUSTOMER_DRAWING_BASE_URL}`, body);

export const createCustomerDrawing = (
  contestId: string,
  body: CreateCustomerDrawingBodyRequest,
): Promise<CustomerDrawing> =>
  api.post(`${CUSTOMER_DRAWING_BASE_URL}/create?contestId=${contestId}`, body);

export const updateCustomerDrawingImage = (customerDrawingId: string, body: any): Promise<void> =>
  api.put(`${CUSTOMER_DRAWING_BASE_URL}/image?customerDrawingId=${customerDrawingId}`, body);

export const approveCustomerDrawingByStaff = (
  customerDrawingId: string,
  status: CustomerDrawingStatus,
): Promise<void> =>
  api.patch(`${CUSTOMER_DRAWING_BASE_URL}/approve/${customerDrawingId}?status=${status}`);

export const getCustomerDrawingsByContestByStaff = (
  contestId: string,
): Promise<CustomerDrawingNotFilter[]> =>
  api.get(`${CUSTOMER_DRAWING_BASE_URL}/contest/staff?contestId=${contestId}`);

export const getCustomerDrawingsInContestByCustomer = (
  contestId: string,
): Promise<CustomerDrawingNotFilter[]> =>
  api.get(`${CUSTOMER_DRAWING_BASE_URL}/contest/customer?contestId=${contestId}`);

export const checkCustomerDrawingSubmitted = (contestId: string): Promise<boolean> =>
  api.get(`${CUSTOMER_DRAWING_BASE_URL}/submit/${contestId}`);
