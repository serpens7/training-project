import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ArticleDetails } from '@/entities/Article';
import { useParams } from 'react-router-dom';
import cls from './ArticleDetailsPage.module.scss';
import { Text } from '@/shared/ui/Text/Text';
import { CommentList } from '@/entities/Comment/ui/CommentList/CommentList';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { useDispatch, useSelector } from 'react-redux';
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className = '' } = props;
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    });

    if (!id) {
        return (
            <div
                className={classNames(cls.ArticleDetailsPage, {}, [className])}
            >
                {t('error.articleNotFound')}
            </div>
        );
    }

    return (
        <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            <ArticleDetails id={id} />
            <Text className={cls.commentTittle} title={t('article.comments')} />
            <CommentList isLoading={commentsIsLoading} comments={comments} />
        </div>
    );
};

export default memo(ArticleDetailsPage);
