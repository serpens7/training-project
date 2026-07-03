import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ArticleDetails, ArticleList } from '@/entities/Article';
import { useNavigate, useParams } from 'react-router-dom';
import cls from './ArticleDetailsPage.module.scss';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { CommentList } from '@/entities/Comment/ui/CommentList/CommentList';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { useDispatch, useSelector } from 'react-redux';
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/app/providers/config/DynamicModuleLoader';
import { addCommentForArticle } from '../../model/services/addCommentForArticle';
import { AddCommentForm } from '@/features/AddCommentForm';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { Page } from '@/widgets/Page/Page';
import { fetchArticleRecommendations } from '../../model/services/fetchArticleRecommendations';
import { getArticleRecommendationsIsLoading } from '../../model/selectors/recommendations';
import { getArticleRecommendations } from '../../model/slices/articleDetailsPageRecommendationsSlice';
import { articleDetailsPageReducer } from '../../model/slices';

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
};
const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className = '' } = props;
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const comments = useSelector(getArticleComments.selectAll);
    const navigate = useNavigate();
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

    const recommendations = useSelector(getArticleRecommendations.selectAll);
    const recommendationsIsLoading = useSelector(
        getArticleRecommendationsIsLoading
    );

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
        dispatch(fetchArticleRecommendations());
    });

    const onSendComment = (text: string) => {
        dispatch(addCommentForArticle(text));
    };

    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles);
    }, [navigate]);

    if (!id) {
        return (
            <Page
                className={classNames(cls.ArticleDetailsPage, {}, [className])}
            >
                {t('error.articleNotFound')}
            </Page>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page
                className={classNames(cls.ArticleDetailsPage, {}, [className])}
            >
                <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
                    {t('article.backToList')}
                </Button>
                <ArticleDetails id={id} />
                <Text
                    className={cls.commentTitle}
                    title={t('article.comments')}
                />
                <Text
                    size={TextSize.L}
                    className={cls.commentTitle}
                    title={t('article.recommendations')}
                />
                <ArticleList
                    articles={recommendations}
                    isLoading={recommendationsIsLoading}
                    className={cls.recommendations}
                />
                <AddCommentForm onSendComment={onSendComment} />
                <CommentList
                    isLoading={commentsIsLoading}
                    comments={comments}
                />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
