import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import React, { CSSProperties, ReactNode, useRef, useState } from 'react';
import { useModal } from '@/shared/lib/hooks/useModal';
import cls from './Drawer.module.scss';
import { Portal } from '../Portal/Portal';

interface DrawerProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

const ANIMATION_DELAY = 300;
const DISMISS_THRESHOLD = 100;

export const Drawer = (props: DrawerProps) => {
    const { className = '', children, isOpen, onClose, lazy } = props;

    const { isClosing, isMounted, close } = useModal({
        onClose,
        isOpen,
        animationDelay: ANIMATION_DELAY,
    });

    const [isDragging, setIsDragging] = useState(false);
    const [dragY, setDragY] = useState(0);
    const startYRef = useRef(0);

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const onDragStart = (e: React.PointerEvent) => {
        startYRef.current = e.clientY;
        setIsDragging(true);
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const onDragMove = (e: React.PointerEvent) => {
        if (!isDragging) return;
        setDragY(Math.max(0, e.clientY - startYRef.current));
    };

    const onDragEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);
        if (dragY > DISMISS_THRESHOLD) {
            close();
        }
        setDragY(0);
    };

    const contentStyle: CSSProperties | undefined = isDragging
        ? { transform: `translateY(${dragY}px)`, transition: 'none' }
        : undefined;

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal>
            <div className={classNames(cls.Drawer, mods, [className])}>
                <div className={cls.overlay} onClick={close}>
                    <div
                        className={cls.content}
                        style={contentStyle}
                        onClick={onContentClick}
                    >
                        <div
                            className={cls.handle}
                            onPointerDown={onDragStart}
                            onPointerMove={onDragMove}
                            onPointerUp={onDragEnd}
                            onPointerCancel={onDragEnd}
                        />
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
