import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getArticlesPageHasMore, getArticlesPageInited, getArticlesPageIsLoading, getArticlesPageNum } from '../selectors/articlesPageSelectors';
import { articlesPageActions } from '../slices/articlePageSlice';
import { fetchArticlesList } from './fetchArticlesList';

export const fetchNextArticlesPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>(
    'articlesPage/fetchNextArticlesPage',
    async (_, thunkApi) => {
        const { getState, dispatch } = thunkApi;
        const hasMore = getArticlesPageHasMore(getState());
        const page = getArticlesPageNum(getState());
        const isLoading = getArticlesPageIsLoading(getState());
        const inited = getArticlesPageInited(getState());

        if (hasMore && !isLoading && inited) {
            dispatch(articlesPageActions.setPage(page + 1));
            dispatch(fetchArticlesList({
                page: page + 1,
            }));
        }
    },
);
