import { EntityState } from '@reduxjs/toolkit';
import { Article } from '@/entities/Article';
import { ArticleDetailsCommentsSchema } from './ArticleDetailsCommentsSchema';

export interface ArticleDetailsRecommendationsSchema extends EntityState<Article> {
    isLoading?: boolean;
    error?: string;
}

export interface ArticleDetailsPageSchema {
    comments: ArticleDetailsCommentsSchema;
    recommendations: ArticleDetailsRecommendationsSchema;
}

