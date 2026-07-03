import { getUserAuthData } from '@/entities/User';
import MainIcon from '@/shared/assets/icons/main-20-20.svg';
import AboutIcon from '@/shared/assets/icons/about-20-20.svg';
import ProfileIcon from '@/shared/assets/icons/profile-20-20.svg';
import ArticleIcon from '@/shared/assets/icons/article-20-20.svg';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { createSelector } from '@reduxjs/toolkit';
import { SidebarItemType } from './types/sidebar';


export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const sidebarItemsList: SidebarItemType[] = [
            {
                path: RoutePath.main,
                Icon: MainIcon,
                text: 'sidebar.main',
            },
            {
                path: RoutePath.about,
                Icon: AboutIcon,
                text: 'sidebar.about',
            },
        ];

        if (userData) {
            sidebarItemsList.push(
                {
                    path: RoutePath.profile + userData.id,
                    Icon: ProfileIcon,
                    text: 'sidebar.profile',
                    authOnly: true,
                },
                {
                    path: RoutePath.articles,
                    Icon: ArticleIcon,
                    text: 'sidebar.articles',
                    authOnly: true,
                },
            );
        }

        return sidebarItemsList;
    },
);
