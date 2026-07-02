import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleView } from '@/entities/Article';
import { ArticleSortField, ArticleType } from '@/entities/Article/model/types/article';
import { SortOrder } from '@/shared/types/types';

export interface ArticlesPageSchema extends EntityState<Article> {
    isLoading?: boolean;
    error?: string;
    page: number;
    limit: number;
    hasMore?: boolean;
    inited: boolean;
    view: ArticleView;

    order: SortOrder;
    sort: ArticleSortField;
    search: string;
    type: ArticleType;
}


