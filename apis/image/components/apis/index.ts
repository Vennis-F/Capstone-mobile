/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Env } from 'config/Env'
// import makeApi from 'libs/core/configureAxios'

// const api = makeApi(`${Env.API_BASE_URL}`)

const IMAGE_BASE_URL = `/image`;

export const getImage = (path: string): string =>
  `${process.env.EXPO_PUBLIC_API_URL
  }${IMAGE_BASE_URL}?path=${path}`;
