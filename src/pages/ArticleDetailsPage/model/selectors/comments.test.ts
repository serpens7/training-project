import { StateSchema } from '@/app/providers/StoreProvider';
import { getArticleCommentsError, getArticleCommentsIsLoading } from './comments';

describe('articleDetailsComments selectors', () => {
    test('should return isLoading', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetailsComments: { isLoading: true, ids: [], entities: {} },
        };
        expect(getArticleCommentsIsLoading(state as StateSchema)).toBe(true);
    });

    test('should work with empty state isLoading', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticleCommentsIsLoading(state as StateSchema)).toBeUndefined();
    });

    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetailsComments: { error: 'error', ids: [], entities: {} },
        };
        expect(getArticleCommentsError(state as StateSchema)).toBe('error');
    });

    test('should work with empty state error', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticleCommentsError(state as StateSchema)).toBeUndefined();
    });
});
