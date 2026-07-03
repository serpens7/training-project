import { Article } from '@/entities/Article';
import { ArticleDetailsRecommendationsSchema } from '../../types/ArticleDetailsRecommendationsSchema';
import { fetchArticleRecommendations } from '../services/fetchArticleRecommendations';
import { articleDetailsPageRecommendationsReducer } from './articleDetailsPageRecommendationsSlice';

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

describe('articleDetailsPageRecommendationsSlice.test', () => {
    test('fetchArticleRecommendations pending', () => {
        const state: DeepPartial<ArticleDetailsRecommendationsSchema> = {
            isLoading: false,
            error: 'error',
        };
        expect(
            articleDetailsPageRecommendationsReducer(
                state as ArticleDetailsRecommendationsSchema,
                fetchArticleRecommendations.pending('', undefined),
            ),
        ).toEqual({ isLoading: true, error: undefined });
    });

    test('fetchArticleRecommendations fulfilled', () => {
        const state: DeepPartial<ArticleDetailsRecommendationsSchema> = {
            isLoading: true,
            ids: [],
            entities: {},
        };
        expect(
            articleDetailsPageRecommendationsReducer(
                state as ArticleDetailsRecommendationsSchema,
                fetchArticleRecommendations.fulfilled([article1, article2], '', undefined),
            ),
        ).toEqual({
            isLoading: false,
            ids: ['1', '2'],
            entities: {
                1: article1,
                2: article2,
            },
        });
    });

    test('fetchArticleRecommendations rejected', () => {
        const state: DeepPartial<ArticleDetailsRecommendationsSchema> = { isLoading: true };
        expect(
            articleDetailsPageRecommendationsReducer(
                state as ArticleDetailsRecommendationsSchema,
                fetchArticleRecommendations.rejected(null, '', undefined, 'error'),
            ),
        ).toEqual({ isLoading: false, error: 'error' });
    });
});
