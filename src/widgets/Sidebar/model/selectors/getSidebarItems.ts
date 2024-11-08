import { createSelector } from 'reselect';

import homeIcon from 'shared/assets/icons/home.svg';
import fireIcon from 'shared/assets/icons/fire.svg';
import timeIcon from 'shared/assets/icons/time.svg';
import bookmarkIcon from 'shared/assets/icons/bookmark.svg';
import { RoutePath } from 'shared/config/routeConfig';

import { getUserAuthData } from 'entities/User';

import { TFunction } from 'i18next';
import { SidebarItemType } from '../types/sidebar';

const sidebarItemsList: SidebarItemType[] = [
  {
    path: RoutePath.main,
    text: 'Главная',
    icon: homeIcon,
  },
  {
    path: RoutePath.about,
    text: 'О нас',
    icon: fireIcon,
  },
];

export const getSidebarItems = createSelector(
  getUserAuthData,
  (userData) => {
    if (userData) {
      sidebarItemsList.push(
        {
          path: RoutePath.profile + userData.id,
          text: 'Профиль',
          authOnly: true,
          icon: timeIcon,
        },
        {
          path: RoutePath.articles_page,
          text: 'Статьи',
          icon: bookmarkIcon,
          authOnly: true,
        },
      );
    }
    return sidebarItemsList;
  },
);
