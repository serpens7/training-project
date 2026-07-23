import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { ArticleDetails } from '@/entities/Article';
import { useParams } from 'react-router-dom';
import cls from './ArticleDetailsPage.module.scss';
import { Page } from '@/widgets/Page';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { VStack } from '@/shared/ui/Stack';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { ArticleComments } from '@/features/ArticleComments';
import ArticleRating from '@/features/articleRating/ui/ArticleRating/ArticleRating';

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className = '' } = props;
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return null;
    }

    return (
        <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            <VStack gap='16' max>
                <ArticleDetailsPageHeader />
                <ArticleDetails id={id} />
                <ArticleRating articleId={id} />
                <ArticleRecommendationsList />
                <ArticleComments id={id} />
            </VStack>
        </Page>
    );
};

export default memo(ArticleDetailsPage);
