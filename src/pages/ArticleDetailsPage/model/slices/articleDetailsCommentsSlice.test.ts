import { Comment } from '@/entities/Comment';
import { ArticleDetailsCommentsSchema } from '../../types/ArticleDetailsCommentsSchema';
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId';
import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice';

const comment1: Comment = {
    id: '1',
    text: 'hello',
    user: { id: '1', username: 'user1' },
};

const comment2: Comment = {
    id: '2',
    text: 'world',
    user: { id: '2', username: 'user2' },
};

describe('articleDetailsCommentsSlice.test', () => {
    test('fetchCommentsByArticleId pending', () => {
        const state: DeepPartial<ArticleDetailsCommentsSchema> = {
            isLoading: false,
            error: 'error',
        };
        expect(
            articleDetailsCommentsReducer(
                state as ArticleDetailsCommentsSchema,
                fetchCommentsByArticleId.pending('', undefined),
            ),
        ).toEqual({ isLoading: true, error: undefined });
    });

    test('fetchCommentsByArticleId fulfilled', () => {
        const state: DeepPartial<ArticleDetailsCommentsSchema> = {
            isLoading: true,
            ids: [],
            entities: {},
        };
        expect(
            articleDetailsCommentsReducer(
                state as ArticleDetailsCommentsSchema,
                fetchCommentsByArticleId.fulfilled([comment1, comment2], '', undefined),
            ),
        ).toEqual({
            isLoading: false,
            ids: ['1', '2'],
            entities: {
                1: comment1,
                2: comment2,
            },
        });
    });

    test('fetchCommentsByArticleId rejected', () => {
        const state: DeepPartial<ArticleDetailsCommentsSchema> = { isLoading: true };
        expect(
            articleDetailsCommentsReducer(
                state as ArticleDetailsCommentsSchema,
                fetchCommentsByArticleId.rejected(null, '', undefined, 'error'),
            ),
        ).toEqual({ isLoading: false, error: 'error' });
    });
});
