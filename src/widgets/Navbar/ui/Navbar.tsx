import { useTranslation } from 'react-i18next';
import cls from './Navbar.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { LoginModal } from '@/features/AuthByUserName';
import { getUserAuthData, userActions } from '@/entities/User';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from '@/shared/ui/Text/Text';
import { RoutePath } from '@/shared/const/router';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Dropdown } from '@/shared/ui/Dropdown';
import { HStack } from '@/shared/ui/Stack';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className = '' }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData);
    const dispatch = useDispatch();

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <AppLink to={RoutePath.main} className={cls.appName}>
                <Text title={t('IT-NEWS')} />
            </AppLink>

            {authData ? (
                <>
                    <AppLink
                        to={RoutePath.article_create}
                        theme={AppLinkTheme.SECONDARY}
                        className={cls.createBtn}
                    >
                        {t('article.createArticle')}
                    </AppLink>
                    <div className={cls.rightSide}>
                        <Dropdown
                            direction='bottom'
                            trigger={
                                <HStack gap='8'>
                                    <Avatar size={30} src={authData.avatar} />
                                    <Text text={authData.username} />
                                </HStack>
                            }
                            items={[
                                {
                                    content: t('Профиль'),
                                    href: RoutePath.profile + authData.id,
                                },
                                {
                                    content: t('navbar.exit'),
                                    onClick: onLogout,
                                },
                            ]}
                        />
                    </div>
                </>
            ) : (
                <div className={cls.rightSide}>
                    <Button
                        theme={ButtonTheme.CLEAR_INVERTED}
                        onClick={onShowModal}
                    >
                        {t('navbar.login')}
                    </Button>
                    {isAuthModal && (
                        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
                    )}
                </div>
            )}
        </header>
    );
});
