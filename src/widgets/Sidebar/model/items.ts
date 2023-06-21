import { RoutePath } from 'shared/config/routeConfig';

export interface SidebarItemType {
    path: string;
    text: string;
    icon?: string;
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
  },
];
