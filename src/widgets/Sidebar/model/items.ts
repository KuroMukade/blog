import homeIcon from 'shared/assets/icons/home.svg';
import fireIcon from 'shared/assets/icons/fire.svg';
import timeIcon from 'shared/assets/icons/time.svg';
import bookmarkIcon from 'shared/assets/icons/bookmark.svg';

import { RoutePath } from 'shared/config/routeConfig';

export interface SidebarItemType {
    path: string;
    text: string;
    icon?: string;
    authOnly?: boolean;
}

export const SidebarItemsList: SidebarItemType[] = [
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
  {
    path: RoutePath.profile,
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
];
