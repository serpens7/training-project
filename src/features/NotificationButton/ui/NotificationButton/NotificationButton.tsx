import { useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '@/shared/ui/Icon/Icon';
import { Popover } from '@/shared/ui/Popover';
import { Drawer } from '@/shared/ui/Drawer/Drawer';
import { getUserAuthData } from '@/entities/User';
import { NotificationList, useNotifications } from '@/entities/Notification';
import NotificationIcon from '@/shared/assets/icons/notification-20-20.svg';
import cls from './NotificationButton.module.scss';

const POLLING_INTERVAL = 5000;

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = (props: NotificationButtonProps) => {
    const { className = '' } = props;
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const authData = useSelector(getUserAuthData);
    const { data: items, isLoading } = useNotifications(authData?.id ?? '', {
        pollingInterval: POLLING_INTERVAL,
        skip: !authData?.id,
    });

    const unviewedCount = items?.filter((item) => !item.isViewed).length ?? 0;

    const onOpenDrawer = () => setIsDrawerOpen(true);
    const onCloseDrawer = () => setIsDrawerOpen(false);

    const trigger = (
        <span className={cls.iconWrapper}>
            <Icon Svg={NotificationIcon} className={cls.icon} />
            {unviewedCount > 0 && (
                <span className={cls.badge}>{unviewedCount}</span>
            )}
        </span>
    );

    return (
        <div className={classNames(cls.NotificationButton, {}, [className])}>
            <BrowserView>
                <Popover trigger={trigger}>
                    <NotificationList
                        className={cls.list}
                        items={items}
                        isLoading={isLoading}
                    />
                </Popover>
            </BrowserView>
            <MobileView>
                <button
                    type='button'
                    className={cls.mobileTrigger}
                    onClick={onOpenDrawer}
                >
                    {trigger}
                </button>
                <Drawer isOpen={isDrawerOpen} onClose={onCloseDrawer} lazy>
                    <NotificationList
                        className={cls.list}
                        items={items}
                        isLoading={isLoading}
                    />
                </Drawer>
            </MobileView>
        </div>
    );
};
