import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { componentRender } from '@/shared/lib/tests/componentRender';
import { NotificationButton } from './NotificationButton';

const notifications = [
    { id: '1', title: 'New article published', userId: '1' },
    { id: '2', title: 'New comment', userId: '1' },
];

// RTK Query's fetchBaseQuery reads global fetch; stub it so getNotifications
// resolves instead of hitting the network.
const mockFetchOk = () =>
    jest.fn(() =>
        Promise.resolve(
            new Response(JSON.stringify(notifications), {
                status: 200,
                headers: { 'content-type': 'application/json' },
            })
        )
    ) as jest.Mock;

describe('NotificationButton', () => {
    beforeEach(() => {
        global.fetch = mockFetchOk();
    });

    test('does not fetch notifications when there is no authenticated user', () => {
        componentRender(<NotificationButton />, {
            initialState: { user: { inited: true } },
        });

        expect(global.fetch).not.toHaveBeenCalled();
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

        await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

        const [request] = (global.fetch as jest.Mock).mock.calls[0];
        expect((request as Request).url).toContain('/notifications');
        expect((request as Request).url).toContain('userId=1');
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
