import { Link, LinkProps } from 'react-router-dom';
import { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    RED = 'red',
}

interface AppLinkProps extends LinkProps {
    className?: string;
    theme: AppLinkTheme;
}

export const AppLink: FC<AppLinkProps> = ({
    to,
    className = '',
    children,
    theme = AppLinkTheme.PRIMARY,
    ...otherProps
}) => (
    <Link
        className={classNames(cls.AppLink, {}, [className, cls[theme]])}
        to={to}
        {...otherProps}
    >
        {children}
    </Link>
);
