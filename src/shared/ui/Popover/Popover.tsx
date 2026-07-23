import { ReactNode, useEffect } from 'react';
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
    onOpenChange?: (open: boolean) => void;
}

const mapDirectionToAnchor = {
    top: 'top end',
    bottom: 'bottom end',
} as const;

// headlessui only exposes `open` via the render-prop scope; a hook needs its
// own component to report it upward (e.g. to pause polling while closed).
const OpenStateReporter = ({
    open,
    onOpenChange,
}: {
    open: boolean;
    onOpenChange?: (open: boolean) => void;
}) => {
    useEffect(() => {
        onOpenChange?.(open);
    }, [open, onOpenChange]);

    return null;
};

export function Popover(props: PopoverProps) {
    const {
        className = '',
        trigger,
        children,
        direction = 'bottom',
        onOpenChange,
    } = props;

    return (
        <HeadlessPopover
            as='div'
            className={classNames(cls.Popover, {}, [className])}
        >
            {({ open }) => (
                <>
                    <PopoverButton className={cls.btn}>
                        {trigger}
                    </PopoverButton>
                    <PopoverPanel
                        anchor={{ to: mapDirectionToAnchor[direction], gap: 4 }}
                        className={cls.panel}
                    >
                        {children}
                    </PopoverPanel>
                    <OpenStateReporter open={open} onOpenChange={onOpenChange} />
                </>
            )}
        </HeadlessPopover>
    );
}
