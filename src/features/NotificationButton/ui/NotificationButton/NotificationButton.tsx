import { useCallback, useState } from 'react';
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
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const authData = useSelector(getUserAuthData);
    // Poll only while the panel is actually visible; a plain (non-interval)
    // fetch still runs on mount/skip-change so data isn't stale on first open.
    const isPanelVisible = isDrawerOpen || isPopoverOpen;
    const { data: items, isLoading } = useNotifications(authData?.id ?? '', {
        pollingInterval: isPanelVisible ? POLLING_INTERVAL : 0,
        skip: !authData?.id,
    });

    const onOpenDrawer = () => setIsDrawerOpen(true);
    const onCloseDrawer = () => setIsDrawerOpen(false);
    const onPopoverOpenChange = useCallback((open: boolean) => {
        setIsPopoverOpen(open);
    }, []);

    const trigger = <Icon Svg={NotificationIcon} className={cls.icon} />;

    return (
        <div className={classNames(cls.NotificationButton, {}, [className])}>
            <BrowserView>
                <Popover trigger={trigger} onOpenChange={onPopoverOpenChange}>
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
