import { ButtonHTMLAttributes, FC } from 'react';
import { classNames } from '../lib/classNames';
import cls from './Button.module.scss';

export enum ThemeButton {
    CLEAR = 'clear',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ThemeButton;
}

export const Button: FC<ButtonProps> = (props) => {
    const { className = '', children, theme, ...otherProps } = props;

    return (
        <button
            type='submit'
            className={classNames(
                cls.Button,
                { [cls[theme as ThemeButton]]: true },
                [className]
            )}
            {...otherProps}
        >
            {children}
        </button>
    );
};
