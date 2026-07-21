import { classNames } from '@/shared/lib/classNames/classNames';
import React, { memo } from 'react';
import cls from './Icon.module.scss';

interface IconProps {
    className?: string;
    Svg: React.FC<React.SVGProps<SVGSVGElement>>;
    inverted?: boolean;
}

export const Icon = memo((props: IconProps) => {
    const { className = '', Svg, ...otherProps } = props;

    return (
        <Svg
            className={classNames(cls.Icon, {}, [className])}
            {...otherProps}
        />
    );
});
