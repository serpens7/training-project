import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk';
import { Comment } from '@/entities/Comment';
import { addCommentForArticle } from './addCommentForArticle';

const comment: Comment = {
    id: '1',
    text: 'some comment',
    user: { id: '1', username: 'admin' },
};

const validState = {
    user: {
        authData: { id: '1', username: 'admin' },
    },
    articleDetails: {
        data: { id: '1' },
    },
};

describe('addCommentForArticle.test', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(addCommentForArticle, validState);
        thunk.api.post.mockReturnValue(Promise.resolve({ data: comment }));

        const result = await thunk.callThunk('some comment');

        expect(thunk.api.post).toHaveBeenCalled();
        expect(thunk.dispatch).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(comment);
    });

    test('no data', async () => {
        const thunk = new TestAsyncThunk(addCommentForArticle, {
            user: {},
            articleDetails: {},
        });

        const result = await thunk.callThunk('some comment');

        expect(thunk.api.post).not.toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('no data');
    });

    test('empty text', async () => {
        const thunk = new TestAsyncThunk(addCommentForArticle, validState);

        const result = await thunk.callThunk('');

        expect(thunk.api.post).not.toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('no data');
    });

    test('server error', async () => {
        const thunk = new TestAsyncThunk(addCommentForArticle, validState);
        thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));

        const result = await thunk.callThunk('some comment');

        expect(thunk.api.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('error');
    });
});
