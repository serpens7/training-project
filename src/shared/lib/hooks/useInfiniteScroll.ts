import { MutableRefObject, useEffect, useRef } from 'react';

export interface UseInfiniteScrollOptions {
    callback?: () => void;
    triggerRef: MutableRefObject<HTMLElement>;
    wrapperRef: MutableRefObject<HTMLElement>;
    rootMargin?: string;
}

export function useInfiniteScroll({
    callback,
    wrapperRef,
    triggerRef,
    rootMargin = '0px 0px 300px 0px',
}: UseInfiniteScrollOptions) {

    const callbackRef = useRef(callback);
    useEffect(() => {
        callbackRef.current = callback;
    });

    useEffect(() => {
        const wrapperElement = wrapperRef.current;
        const triggerElement = triggerRef.current;

        if (!triggerElement) {
            return undefined;
        }

        const options: IntersectionObserverInit = {
            root: wrapperElement,
            rootMargin,
            threshold: 0,
        };

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                callbackRef.current?.();
            }
        }, options);

        observer.observe(triggerElement);

        return () => {
            observer.disconnect();
        };
    }, [triggerRef, wrapperRef, rootMargin]);
}
