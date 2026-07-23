import { rtkApi } from '@/shared/api/rtkApi';
import { Notification } from '../model/types/notification';

const notificationApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getNotifications: build.query<Notification[], string>({
            query: (userId) => ({
                url: '/notifications',
                params: {
                    userId,
                },
            }),
        }),
    }),
});

export const useNotifications = notificationApi.useGetNotificationsQuery;
