import { ReactNode } from 'react';
import {
    Popover as HeadlessPopover,
    PopoverButton,
    PopoverPanel,
} from '@headlessui/react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Popover.module.scss';

type PopoverDirection = 'top' | 'bottom';

interface PopoverProps {
    className?: string;
    trigger: ReactNode;
    children: ReactNode;
    direction?: PopoverDirection;
}

const mapDirectionToAnchor = {
    top: 'top end',
    bottom: 'bottom end',
} as const;

export function Popover(props: PopoverProps) {
    const { className = '', trigger, children, direction = 'bottom' } = props;

    return (
        <HeadlessPopover
            as='div'
            className={classNames(cls.Popover, {}, [className])}
        >
            <PopoverButton className={cls.btn}>{trigger}</PopoverButton>
            <PopoverPanel
                anchor={{ to: mapDirectionToAnchor[direction], gap: 4 }}
                className={cls.panel}
            >
                {children}
            </PopoverPanel>
        </HeadlessPopover>
    );
}
