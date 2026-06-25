import { Article, ArticleView } from '@/entities/Article';
import { ArticlesPageSchema } from '../types/ArticlesPageSchema';
import { fetchArticlesList } from '../services/fetchArticlesList';
import { articlesPageActions, articlesPageReducer } from './articlePageSlice';

const article1 = {
    id: '1',
    title: 'First article',
    subtitle: 'subtitle',
    img: '',
    views: 100,
    createdAt: '26.02.2022',
    user: { id: '1', username: 'admin' },
    type: [],
    blocks: [],
} as Article;

const article2 = {
    id: '2',
    title: 'Second article',
    subtitle: 'subtitle',
    img: '',
    views: 200,
    createdAt: '26.02.2022',
    user: { id: '2', username: 'user' },
    type: [],
    blocks: [],
} as Article;

describe('articlesPageSlice.test', () => {
    test('setView', () => {
        const state: DeepPartial<ArticlesPageSchema> = { view: ArticleView.SMALL };
        expect(
            articlesPageReducer(
                state as ArticlesPageSchema,
                articlesPageActions.setView(ArticleView.BIG),
            ),
        ).toEqual({ view: ArticleView.BIG });
    });

    test('fetchArticlesList pending', () => {
        const state: DeepPartial<ArticlesPageSchema> = {
            isLoading: false,
            error: 'error',
        };
        expect(
            articlesPageReducer(
                state as ArticlesPageSchema,
                fetchArticlesList.pending('', { page: 1 }),
            ),
        ).toEqual({ isLoading: true, error: undefined });
    });

    test('fetchArticlesList fulfilled', () => {
        const state: DeepPartial<ArticlesPageSchema> = {
            isLoading: true,
            ids: [],
            entities: {},
        };
        expect(
            articlesPageReducer(
                state as ArticlesPageSchema,
                fetchArticlesList.fulfilled([article1, article2], '', { page: 1 }),
            ),
        ).toEqual({
            isLoading: false,
            hasMore: true,
            ids: ['1', '2'],
            entities: {
                1: article1,
                2: article2,
            },
        });
    });

    test('fetchArticlesList rejected', () => {
        const state: DeepPartial<ArticlesPageSchema> = { isLoading: true };
        expect(
            articlesPageReducer(
                state as ArticlesPageSchema,
                fetchArticlesList.rejected(null, '', { page: 1 }, 'error'),
            ),
        ).toEqual({ isLoading: false, error: 'error' });
    });
});
