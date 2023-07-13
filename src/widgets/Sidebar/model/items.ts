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
  },
  {
    path: RoutePath.about,
    text: 'О нас',
  },
  {
    path: RoutePath.profile,
    text: 'Профиль',
    authOnly: true,
  },
  {
    path: RoutePath.articles_page,
    text: 'Статьи',
    authOnly: true,
  },
];
