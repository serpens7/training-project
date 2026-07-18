import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender';
import { NotificationList } from './NotificationList';
import { Notification } from '../../model/types/notification';

const items: Notification[] = [
    { id: '1', title: 'First notification' },
    { id: '2', title: 'Second notification' },
];

describe('NotificationList', () => {
    test('renders a card for each item', () => {
        componentRender(<NotificationList items={items} />);

        expect(screen.getByText('First notification')).toBeInTheDocument();
        expect(screen.getByText('Second notification')).toBeInTheDocument();
    });

    test('renders an empty state message when items is empty', () => {
        componentRender(<NotificationList items={[]} />);

        expect(screen.getByText('notification.empty')).toBeInTheDocument();
    });

    test('renders an empty state message when items is undefined', () => {
        componentRender(<NotificationList />);

        expect(screen.getByText('notification.empty')).toBeInTheDocument();
    });

    test('renders skeleton placeholders when isLoading', () => {
        const { container } = componentRender(<NotificationList isLoading />);

        expect(container.querySelectorAll('.Skeleton')).toHaveLength(6);
        expect(screen.queryByText('notification.empty')).not.toBeInTheDocument();
    });
});
