import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk';
import { Comment } from '@/entities/Comment';
import { fetchCommentsByArticleId } from './fetchCommentsByArticleId';

const comments: Comment[] = [
    {
        id: '1',
        text: 'some comment',
        user: { id: '1', username: 'admin' },
    },
    {
        id: '2',
        text: 'another comment',
        user: { id: '2', username: 'user' },
    },
];

describe('fetchCommentsByArticleId.test', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(fetchCommentsByArticleId);
        thunk.api.get.mockReturnValue(Promise.resolve({ data: comments }));

        const result = await thunk.callThunk('1');

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(comments);
    });

    test('no articleId', async () => {
        const thunk = new TestAsyncThunk(fetchCommentsByArticleId);

        const result = await thunk.callThunk(undefined);

        expect(thunk.api.get).not.toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('error');
    });

    test('server error', async () => {
        const thunk = new TestAsyncThunk(fetchCommentsByArticleId);
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));

        const result = await thunk.callThunk('1');

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('error');
    });
});
