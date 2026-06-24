import { StateSchema } from '@/app/providers/StoreProvider';
import { ArticleView } from '@/entities/Article';
import {
    getArticlesPageError,
    getArticlesPageIsLoading,
    getArticlesPageView,
} from './articlesPageSelectors';

describe('articlesPageSelectors', () => {
    test('should return isLoading', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: { isLoading: true },
        };
        expect(getArticlesPageIsLoading(state as StateSchema)).toBe(true);
    });

    test('should return false isLoading with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticlesPageIsLoading(state as StateSchema)).toBe(false);
    });

    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: { error: 'error' },
        };
        expect(getArticlesPageError(state as StateSchema)).toBe('error');
    });

    test('should return undefined error with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticlesPageError(state as StateSchema)).toBeUndefined();
    });

    test('should return view', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: { view: ArticleView.BIG },
        };
        expect(getArticlesPageView(state as StateSchema)).toBe(ArticleView.BIG);
    });

    test('should return SMALL view with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticlesPageView(state as StateSchema)).toBe(ArticleView.SMALL);
    });
});
