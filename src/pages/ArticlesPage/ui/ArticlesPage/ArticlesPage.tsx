import { memo } from 'react';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { useSearchParams } from 'react-router-dom';
import { articlesPageReducer } from '../../model/slices/articlePageSlice';
import { initArticlesPage } from '../../model/services/initArticlesPage';
import { ArticlesPageList } from '../ArticlesPageList/ArticlesPageList';

interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams));
    });

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <ArticlesPageList className={className} />
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
