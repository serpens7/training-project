import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AxiosRequestConfig } from 'axios';
import { $api } from '@/shared/api/api';
import { componentRender } from '@/shared/lib/tests/componentRender';
import { NotificationButton } from './NotificationButton';

const notifications = [
    { id: '1', title: 'New article published', userId: '1' },
    { id: '2', title: 'New comment', userId: '1' },
];

describe('NotificationButton', () => {
    beforeEach(() => {
        // RTK Query's axiosBaseQuery calls $api.request(); stub it so
        // getNotifications resolves instead of hitting the network.
        jest.spyOn($api, 'request').mockImplementation(
            async (config: AxiosRequestConfig) => ({
                data: notifications,
                status: 200,
                statusText: 'OK',
                headers: {},
                config: config as never,
            })
        );
    });

    test('does not fetch notifications when there is no authenticated user', () => {
        componentRender(<NotificationButton />, {
            initialState: { user: { inited: true } },
        });

        expect($api.request).not.toHaveBeenCalled();
    });

    test('fetches notifications for the current user when authenticated', async () => {
        componentRender(<NotificationButton />, {
            initialState: {
                user: {
                    authData: { id: '1', username: 'admin' },
                    inited: true,
                },
            },
        });

        await waitFor(() => expect($api.request).toHaveBeenCalledTimes(1));

        const [config] = ($api.request as jest.Mock).mock.calls[0];
        expect(config.url).toBe('/notifications');
        expect(config.params).toEqual({ userId: '1' });
    });

    test('clicking the bell reveals the notification list', async () => {
        const user = userEvent.setup();
        componentRender(<NotificationButton />, {
            initialState: {
                user: {
                    authData: { id: '1', username: 'admin' },
                    inited: true,
                },
            },
        });

        await user.click(screen.getByRole('button'));

        expect(
            await screen.findByText('New article published')
        ).toBeInTheDocument();
        expect(screen.getByText('New comment')).toBeInTheDocument();
    });
});
