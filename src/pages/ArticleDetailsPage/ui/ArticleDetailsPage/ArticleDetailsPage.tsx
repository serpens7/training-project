import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ArticleDetails, ArticleList } from '@/entities/Article';
import { useParams } from 'react-router-dom';
import cls from './ArticleDetailsPage.module.scss';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { CommentList } from '@/entities/Comment';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader';
import { addCommentForArticle } from '../../model/services/addCommentForArticle';
import { AddCommentForm } from '@/features/AddCommentForm';
import { Page } from '@/widgets/Page';
import { fetchArticleRecommendations } from '../../model/services/fetchArticleRecommendations';
import { getArticleRecommendationsIsLoading } from '../../model/selectors/recommendations';
import { getArticleRecommendations } from '../../model/slices/articleDetailsPageRecommendationsSlice';
import { articleDetailsPageReducer } from '../../model/slices';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { VStack } from '@/shared/ui/Stack';

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
    const dispatch = useAppDispatch();
    const comments = useSelector(getArticleComments.selectAll);
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
                <VStack gap='16' max>
                    <ArticleDetailsPageHeader />
                    <ArticleDetails id={id} />
                    <Text
                        size={TextSize.L}
                        className={cls.commentTitle}
                        title={t('article.recommendations')}
                    />
                    <ArticleList
                        articles={recommendations}
                        isLoading={recommendationsIsLoading}
                        className={cls.recommendations}
                        target='_blank'
                    />
                    <Text
                        className={cls.commentTitle}
                        title={t('article.comments')}
                    />
                    <AddCommentForm onSendComment={onSendComment} />
                    <CommentList
                        isLoading={commentsIsLoading}
                        comments={comments}
                    />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
