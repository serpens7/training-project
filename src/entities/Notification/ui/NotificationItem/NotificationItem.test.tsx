import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender';
import { NotificationItem } from './NotificationItem';
import { Notification } from '../../model/types/notification';

const baseNotification: Notification = {
    id: '1',
    title: 'New article published',
    description: 'Check out the latest post',
};

describe('NotificationItem', () => {
    test('renders title and description', () => {
        componentRender(<NotificationItem notification={baseNotification} />);

        expect(screen.getByText('New article published')).toBeInTheDocument();
        expect(screen.getByText('Check out the latest post')).toBeInTheDocument();
    });

    test('renders without description when it is absent', () => {
        componentRender(
            <NotificationItem notification={{ id: '1', title: 'Title only' }} />
        );

        expect(screen.getByText('Title only')).toBeInTheDocument();
    });

    test('renders as a link when href is provided', () => {
        componentRender(
            <NotificationItem
                notification={{ ...baseNotification, href: '/articles/1' }}
            />
        );

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/articles/1');
    });

    test('does not render a link when href is absent', () => {
        componentRender(<NotificationItem notification={baseNotification} />);

        expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });

    test('shows an unread indicator when isViewed is false', () => {
        const { container } = componentRender(
            <NotificationItem
                notification={{ ...baseNotification, isViewed: false }}
            />
        );

        expect(container.querySelector('.unread')).toBeInTheDocument();
    });

    test('does not show an unread indicator when isViewed is true', () => {
        const { container } = componentRender(
            <NotificationItem
                notification={{ ...baseNotification, isViewed: true }}
            />
        );

        expect(container.querySelector('.unread')).not.toBeInTheDocument();
    });

    test('renders skeletons when isLoading', () => {
        const { container } = componentRender(<NotificationItem isLoading />);

        expect(container.querySelectorAll('.Skeleton')).toHaveLength(2);
    });

    test('renders nothing when there is no notification and not loading', () => {
        const { container } = componentRender(<NotificationItem />);

        expect(container).toBeEmptyDOMElement();
    });
});
