import { memo, useCallback } from 'react';
import { Virtuoso, VirtuosoGrid, ListRange } from 'react-virtuoso';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    Article,
    ArticleView,
    ArticleListItem,
    ArticleListItemSkeleton,
} from '@/entities/Article';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import {
    getArticlesPageIsLoading,
    getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { getArticles } from '../../model/slices/articlePageSlice';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import cls from './ArticlesPageList.module.scss';

interface ArticlesPageListProps {
    className?: string;
}

interface ListContext {
    isLoading?: boolean;
    view: ArticleView;
}

const savedTopIndexByPath: Record<string, number> = {};

const getSkeletons = (view: ArticleView) =>
    new Array(view === ArticleView.SMALL ? 9 : 3).fill(0).map((_, index) => (
        <ArticleListItemSkeleton
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            view={view}
            className={view === ArticleView.BIG ? cls.bigCard : undefined}
        />
    ));

const Header = () => (
    <div className={cls.header}>
        <ArticlesPageFilters />
    </div>
);

const Footer = ({ context }: { context: ListContext }) => {
    if (!context.isLoading) {
        return null;
    }
    const isSmall = context.view === ArticleView.SMALL;
    return (
        <div className={isSmall ? cls.skeletonsGrid : cls.skeletonsList}>
            {getSkeletons(context.view)}
        </div>
    );
};

export const ArticlesPageList = memo((props: ArticlesPageListProps) => {
    const { className = '' } = props;
    const dispatch = useAppDispatch();
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const view = useSelector(getArticlesPageView);
    const { pathname } = useLocation();

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    const context: ListContext = { isLoading, view };
    const initialTopMostItemIndex = savedTopIndexByPath[pathname] ?? 0;
    const wrapperClassName = classNames(cls.wrapper, {}, [className]);

    const onRangeChanged = (range: ListRange) => {
        savedTopIndexByPath[pathname] = range.startIndex;
    };

    const renderArticle = (index: number, article: Article) => (
        <ArticleListItem
            article={article}
            view={view}
            className={view === ArticleView.BIG ? cls.bigCard : undefined}
        />
    );

    return (
        <div className={wrapperClassName}>
            {view === ArticleView.BIG ? (
                <Virtuoso
                    style={{ height: '100%' }}
                    data={articles}
                    context={context}
                    initialTopMostItemIndex={initialTopMostItemIndex}
                    endReached={onLoadNextPart}
                    rangeChanged={onRangeChanged}
                    computeItemKey={(_, article) => article.id}
                    itemContent={renderArticle}
                    components={{ Header, Footer }}
                />
            ) : (
                <VirtuosoGrid
                    style={{ height: '100%' }}
                    data={articles}
                    context={context}
                    initialTopMostItemIndex={initialTopMostItemIndex}
                    endReached={onLoadNextPart}
                    rangeChanged={onRangeChanged}
                    computeItemKey={(_, article) => article.id}
                    listClassName={cls.itemsWrapper}
                    itemContent={renderArticle}
                    components={{ Header, Footer }}
                />
            )}
        </div>
    );
});
