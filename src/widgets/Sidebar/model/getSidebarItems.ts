import { getUserAuthData } from '@/entities/User';
import MainIcon from '@/shared/assets/icons/main-20-20.svg';
import AboutIcon from '@/shared/assets/icons/about-20-20.svg';
import ProfileIcon from '@/shared/assets/icons/profile-20-20.svg';
import ArticleIcon from '@/shared/assets/icons/article-20-20.svg';
import { getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile } from '@/shared/const/router';
import { createSelector } from '@reduxjs/toolkit';
import { SidebarItemType } from './types/sidebar';


export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const sidebarItemsList: SidebarItemType[] = [
            {
                path: getRouteMain(),
                Icon: MainIcon,
                text: 'sidebar.main',
            },
            {
                path: getRouteAbout(),
                Icon: AboutIcon,
                text: 'sidebar.about',
            },
        ];

        if (userData) {
            sidebarItemsList.push(
                {
                    path: getRouteProfile(userData.id),
                    Icon: ProfileIcon,
                    text: 'sidebar.profile',
                    authOnly: true,
                },
                {
                    path: getRouteArticles(),
                    Icon: ArticleIcon,
                    text: 'sidebar.articles',
                    authOnly: true,
                },
            );
        }

        return sidebarItemsList;
    },
);
