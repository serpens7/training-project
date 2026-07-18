import { AxiosError, AxiosRequestConfig, Method } from 'axios';
import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { $api } from './api';

export interface AxiosBaseQueryArgs {
    url: string;
    method?: Method;
    body?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
}

interface AxiosBaseQueryError {
    status?: number;
    data: unknown;
}

// RTK Query base query backed by the shared axios instance ($api), instead of
// fetchBaseQuery. Reuses $api's existing auth interceptor (shared/api/api.ts),
// so the Authorization header no longer needs to be duplicated here.
export const axiosBaseQuery =
    (): BaseQueryFn<AxiosBaseQueryArgs, unknown, AxiosBaseQueryError> =>
        async ({ url, method = 'GET', body, params }) => {
            try {
                const result = await $api.request({ url, method, data: body, params });
                return { data: result.data };
            } catch (e) {
                const axiosError = e as AxiosError;
                return {
                    error: {
                        status: axiosError.response?.status,
                        data: axiosError.response?.data ?? axiosError.message,
                    },
                };
            }
        };
