import { classNames } from '@/shared/lib/classNames';
import cls from './AppLink.module.scss';
import { Link, LinkProps } from 'react-router-dom';
import { FC } from 'react';

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
    className?: string;
    theme: AppLinkTheme;
}

export const AppLink: FC<AppLinkProps> = ({ to, className = '', children, theme = AppLinkTheme.PRIMARY, ...otherProps }) => {
    return (
        <Link className={classNames(cls.AppLink, {}, [className, cls[theme]])} to={to} {...otherProps}>
            {children}
        </Link>
    );
};