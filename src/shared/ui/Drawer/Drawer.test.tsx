import { act, fireEvent, screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender';
import { Drawer } from './Drawer';

const ANIMATION_DELAY = 300;

// jsdom doesn't implement the Pointer Events API used by the swipe-to-dismiss handle:
// there's no global PointerEvent (fireEvent.pointer* silently falls back to a plain
// Event, dropping clientY) and no Pointer Capture API. MouseEvent carries the same
// clientX/clientY our drag handler reads, and DOM dispatch only checks the `type`
// string, so aliasing PointerEvent to MouseEvent is a safe, standard jsdom shim.
beforeAll(() => {
    if (typeof window.PointerEvent === 'undefined') {
        window.PointerEvent = MouseEvent as unknown as typeof PointerEvent;
    }
    Element.prototype.setPointerCapture = jest.fn();
    Element.prototype.releasePointerCapture = jest.fn();
});

beforeEach(() => {
    jest.useFakeTimers();
});

afterEach(() => {
    jest.useRealTimers();
});

describe('Drawer', () => {
    test('renders children and is marked opened when isOpen', () => {
        componentRender(
            <Drawer isOpen>
                <span>Drawer content</span>
            </Drawer>
        );

        expect(screen.getByText('Drawer content')).toBeInTheDocument();
        expect(document.querySelector('.opened')).toBeInTheDocument();
    });

    test('renders nothing when lazy and not yet opened', () => {
        componentRender(
            <Drawer lazy isOpen={false}>
                <span>Drawer content</span>
            </Drawer>
        );

        expect(screen.queryByText('Drawer content')).not.toBeInTheDocument();
    });

    test('clicking the overlay calls onClose after the animation delay', () => {
        const onClose = jest.fn();
        componentRender(
            <Drawer isOpen onClose={onClose}>
                <span>Drawer content</span>
            </Drawer>
        );

        fireEvent.click(document.querySelector('.overlay') as Element);
        expect(onClose).not.toHaveBeenCalled();

        act(() => {
            jest.advanceTimersByTime(ANIMATION_DELAY);
        });
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    test('clicking the content does not close the drawer', () => {
        const onClose = jest.fn();
        componentRender(
            <Drawer isOpen onClose={onClose}>
                <span>Drawer content</span>
            </Drawer>
        );

        fireEvent.click(screen.getByText('Drawer content'));
        act(() => {
            jest.advanceTimersByTime(ANIMATION_DELAY);
        });

        expect(onClose).not.toHaveBeenCalled();
    });

    test('Escape key calls onClose after the animation delay', () => {
        const onClose = jest.fn();
        componentRender(
            <Drawer isOpen onClose={onClose}>
                <span>Drawer content</span>
            </Drawer>
        );

        fireEvent.keyDown(window, { key: 'Escape' });
        act(() => {
            jest.advanceTimersByTime(ANIMATION_DELAY);
        });

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    test('dragging the handle past the threshold calls onClose', () => {
        const onClose = jest.fn();
        componentRender(
            <Drawer isOpen onClose={onClose}>
                <span>Drawer content</span>
            </Drawer>
        );

        const handle = document.querySelector('.handle') as Element;
        fireEvent.pointerDown(handle, { clientY: 0, pointerId: 1 });
        fireEvent.pointerMove(handle, { clientY: 150, pointerId: 1 });
        fireEvent.pointerUp(handle, { clientY: 150, pointerId: 1 });

        act(() => {
            jest.advanceTimersByTime(ANIMATION_DELAY);
        });
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    test('dragging the handle below the threshold does not close the drawer', () => {
        const onClose = jest.fn();
        componentRender(
            <Drawer isOpen onClose={onClose}>
                <span>Drawer content</span>
            </Drawer>
        );

        const handle = document.querySelector('.handle') as Element;
        fireEvent.pointerDown(handle, { clientY: 0, pointerId: 1 });
        fireEvent.pointerMove(handle, { clientY: 40, pointerId: 1 });
        fireEvent.pointerUp(handle, { clientY: 40, pointerId: 1 });

        act(() => {
            jest.advanceTimersByTime(ANIMATION_DELAY);
        });
        expect(onClose).not.toHaveBeenCalled();
    });
});
