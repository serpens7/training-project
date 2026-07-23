import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { VStack } from '@/shared/ui/Stack';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { Notification } from '../../model/types/notification';

interface NotificationListProps {
    className?: string;
    items?: Notification[];
    isLoading?: boolean;
}

export const NotificationList = (props: NotificationListProps) => {
    const { className = '', isLoading, items } = props;
    const { t } = useTranslation();

    if (isLoading) {
        return (
            <VStack gap='8' max className={classNames('', {}, [className])}>
                <NotificationItem isLoading />
                <NotificationItem isLoading />
                <NotificationItem isLoading />
            </VStack>
        );
    }

    return (
        <VStack gap='8' max className={classNames('', {}, [className])}>
            {items?.length ? (
                items.map((notification) => (
                    <NotificationItem
                        notification={notification}
                        key={notification.id}
                    />
                ))
            ) : (
                <Text text={t('notification.empty')} />
            )}
        </VStack>
    );
};
