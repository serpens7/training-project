import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text/Text';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Card } from '@/shared/ui/Card/Card';
import { VStack } from '@/shared/ui/Stack';
import cls from './NotificationItem.module.scss';
import { Notification } from '../../model/types/notification';

interface NotificationItemProps {
    className?: string;
    notification?: Notification;
    isLoading?: boolean;
}

export const NotificationItem = (props: NotificationItemProps) => {
    const { className = '', notification, isLoading } = props;

    if (isLoading) {
        return (
            <div
                className={classNames(cls.NotificationItem, {}, [
                    className,
                    cls.loading,
                ])}
            >
                <Skeleton height={16} width='60%' className={cls.title} />
                <Skeleton width='100%' height={30} />
            </div>
        );
    }

    if (!notification) return null;

    const content = (
        <VStack gap='4' max>
            <Text className={cls.title} title={notification.title} />
            {notification.description && (
                <Text text={notification.description} />
            )}
        </VStack>
    );

    if (notification.href) {
        return (
            <AppLink
                to={notification.href}
                className={classNames(cls.NotificationItem, {}, [className])}
            >
                {content}
            </AppLink>
        );
    }

    return (
        <Card className={classNames(cls.NotificationItem, {}, [className])}>
            {content}
        </Card>
    );
};
