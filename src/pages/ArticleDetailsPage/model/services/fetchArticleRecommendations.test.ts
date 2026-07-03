import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk';
import { Article } from '@/entities/Article';
import { fetchArticleRecommendations } from './fetchArticleRecommendations';

const articles: Article[] = [
    {
        id: '1',
        title: 'First article',
        subtitle: 'subtitle',
        img: '',
        views: 100,
        createdAt: '26.02.2022',
        user: { id: '1', username: 'admin' },
        type: [],
        blocks: [],
    },
    {
        id: '2',
        title: 'Second article',
        subtitle: 'subtitle',
        img: '',
        views: 200,
        createdAt: '26.02.2022',
        user: { id: '2', username: 'user' },
        type: [],
        blocks: [],
    },
] as Article[];

describe('fetchArticleRecommendations.test', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(fetchArticleRecommendations);
        thunk.api.get.mockReturnValue(Promise.resolve({ data: articles }));

        const result = await thunk.callThunk();

        expect(thunk.api.get).toHaveBeenCalledWith('/articles', {
            params: { _limit: 4 },
        });
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(articles);
    });

    test('server error', async () => {
        const thunk = new TestAsyncThunk(fetchArticleRecommendations);
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));

        const result = await thunk.callThunk();

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('error');
    });
});
