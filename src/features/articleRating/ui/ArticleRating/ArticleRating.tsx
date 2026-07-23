import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RatingCard } from '@/entities/Rating';
import {
    useGetArticleRating,
    useRateArticle,
} from '../../api/articleRatingApi';
import { getUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

export interface ArticleRatingProps {
    className?: string;
    articleId: string;
}

const ArticleRating = memo((props: ArticleRatingProps) => {
    const { className, articleId } = props;
    const { t } = useTranslation();
    const userData = useSelector(getUserAuthData);

    const { data, isLoading } = useGetArticleRating({
        articleId,
        userId: userData?.id ?? '',
    });
    const [rateArticleMutation] = useRateArticle();

    const handleRateArticle = useCallback(
        async (starsCount: number, feedback?: string) => {
            try {
                await rateArticleMutation({
                    userId: userData?.id ?? '',
                    articleId,
                    rate: starsCount,
                    feedback,
                }).unwrap();
            } catch (e) {
                console.log(e);
            }
        },
        [articleId, rateArticleMutation, userData?.id]
    );

    if (isLoading) {
        return <Skeleton width='100%' height={120} />;
    }

    const rating = data?.[0];

    return (
        <RatingCard
            onCancel={handleRateArticle}
            onAccept={handleRateArticle}
            rate={rating?.rate}
            className={className}
            title={t('article.valueTheArticle')}
            feedbackTitle={t('article.leaveYourFeedbackAboutTheArticle')}
            hasFeedback
        />
    );
});

export default ArticleRating;
