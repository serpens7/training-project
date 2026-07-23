import { act, renderHook } from '@testing-library/react';
import { useModal } from './useModal';

const ANIMATION_DELAY = 300;

describe('useModal', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('close() sets isClosing then calls onClose after animationDelay', () => {
        const onClose = jest.fn();
        const { result } = renderHook(() =>
            useModal({ onClose, isOpen: true, animationDelay: ANIMATION_DELAY })
        );

        act(() => {
            result.current.close();
        });

        expect(result.current.isClosing).toBe(true);
        expect(onClose).not.toHaveBeenCalled();

        act(() => {
            jest.advanceTimersByTime(ANIMATION_DELAY);
        });

        expect(onClose).toHaveBeenCalledTimes(1);
        expect(result.current.isClosing).toBe(false);
    });

    test('close() does nothing when onClose is not provided', () => {
        const { result } = renderHook(() =>
            useModal({ isOpen: true, animationDelay: ANIMATION_DELAY })
        );

        act(() => {
            result.current.close();
        });

        expect(result.current.isClosing).toBe(false);
    });

    test('isMounted becomes true once isOpen turns true, and stays true after', () => {
        const { result, rerender } = renderHook(
            ({ isOpen }) => useModal({ isOpen, animationDelay: ANIMATION_DELAY }),
            { initialProps: { isOpen: false } }
        );

        expect(result.current.isMounted).toBe(false);

        rerender({ isOpen: true });
        expect(result.current.isMounted).toBe(true);

        rerender({ isOpen: false });
        expect(result.current.isMounted).toBe(true);
    });

    test('Escape key triggers close() while open', () => {
        const onClose = jest.fn();
        renderHook(() =>
            useModal({ onClose, isOpen: true, animationDelay: ANIMATION_DELAY })
        );

        act(() => {
            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        });

        act(() => {
            jest.advanceTimersByTime(ANIMATION_DELAY);
        });

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    test('Escape key does nothing while closed', () => {
        const onClose = jest.fn();
        renderHook(() =>
            useModal({ onClose, isOpen: false, animationDelay: ANIMATION_DELAY })
        );

        act(() => {
            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
            jest.advanceTimersByTime(ANIMATION_DELAY);
        });

        expect(onClose).not.toHaveBeenCalled();
    });

    test('removes the keydown listener on unmount', () => {
        const onClose = jest.fn();
        const { unmount } = renderHook(() =>
            useModal({ onClose, isOpen: true, animationDelay: ANIMATION_DELAY })
        );

        unmount();

        act(() => {
            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
            jest.advanceTimersByTime(ANIMATION_DELAY);
        });

        expect(onClose).not.toHaveBeenCalled();
    });
});
