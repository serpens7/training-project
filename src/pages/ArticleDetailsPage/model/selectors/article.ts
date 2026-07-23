import { createSelector } from '@reduxjs/toolkit';
import { isUserAdmin } from '@/entities/User';
import { getArticleDetailsData } from '@/entities/Article';

export const getCanEditArticle = createSelector(
    getArticleDetailsData,
    isUserAdmin,
    (article, isAdmin) => {
        if (!article) {
            return false;
        }

        return isAdmin;
    },
);
