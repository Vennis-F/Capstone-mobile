/* eslint-disable @typescript-eslint/no-explicit-any */
import makeApi from '../../../libs/core/configureAxios';
import { CreateTransactionBody, CreateTransactionResponse } from '../types';

const api = makeApi(`${process.env.EXPO_PUBLIC_API_URL}`);

const TRANSACTION_BASE_URL = `/transaction`;

export const createTrasaction = (body: CreateTransactionBody): Promise<CreateTransactionResponse> =>
  api.post(`${TRANSACTION_BASE_URL}/create`, body);
