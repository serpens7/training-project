import { StateSchema } from '@/app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';

export const getScrollRestorationScroll = (state: StateSchema) => state.scrollRestoration?.scroll ?? {};

export const getScrollRestorationScrollByPath = createSelector(
    getScrollRestorationScroll,
    (state: StateSchema, path: string) => path,
    (scroll, path) => scroll[path] || 0,
);
